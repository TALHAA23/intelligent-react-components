# Library structure

[//]: # "Title: Library Structure"
[//]: # "Author: Talha Sifat"
[//]: # "Type: Documentation"
[//]: # "Date: 2024-09-20"
[//]: # "From Sprint Number: 1"
[//]: # "Task title: Library structure"

## **Introduction**

For developers working with our Intelligent React components library, a thorough understanding of its design and architecture is crucial. This document serves as a comprehensive guide, outlining the library's structure and underlying principles.

## **Understanding the File Structure:**

Let's delve into the library's file structure.

### **Package Diagram:**

A visual representation of the library's package structure is provided below. However, due to limitations with embedded diagrams within Notion, the detailed diagram can be accessed through draw.io. Instructions on accessing the diagram are provided at the end of this document. or simply clicking on the diagram will open a clear image of it. [Package diagram][uml_package_diagram]

### Unpacking the Source `src`:

The `src` directory is the foundation of our library. Here's where the magic happens:

- **`index.ts`:** This file acts as the central hub, exporting the entire library for consumption.
- **`components`:** This directory houses the intelligent components, the core elements developers interact with when using the library. Each component resides in a subdirectory named with the `AI` prefix followed by the corresponding HTML element (e.g., `AIButton`). Inside this subdirectory:
  - **`index.ts`:** This file serves as the entry point for the specific component.
  - **`AIButton.tsx`:** This is where the component's React code comes to life, defining its functionality and appearance.
  - **`\_\_test**\_\_`: This directory contains automated test scripts that ensure the component's proper behavior.

### **The Utility Belt `utils`:**

The `utils` directory is a treasure trove of helper functions. These reusable modules perform specific tasks, streamlining development across the library. There are two types of utilities here:

- Server utilities reside within a dedicated `server` subdirectory.
- General-purpose utilities are located directly within the `utils` root.

### **The Powerhouse `lib`:**

The `lib` directory stores reusable code modules that handle more complex tasks compared to utilities. Two key players within `lib` are:

- **`generativeAi.ts`:** This file leverages Google AI to generate essential code.
- **`vite-plugin-generte-file`:** This custom Vite plugin manages server-related tasks like file system control.

### **Defining the Blueprint `types`:**

The `types` directory houses TypeScript type declarations, providing a blueprint for the library's data structures. The `index.d.ts` file acts as the entry point, exporting these types for seamless integration.

### **Documentation Hub `docs`:**

The `docs` directory is your one-stop shop for understanding the intelligent React components. Here, you'll find comprehensive documentation, UML diagrams, and other resources to guide your development journey.

### **Production-Ready Arsenal `dist`:**

The `dist` directory holds the battle-tested code, ready for deployment. This is what developers actually integrate into their projects. Within `dist`, you'll find two entry point files:

- **`index.cjs.js`:** This caters to CommonJS modules, a widely used JavaScript module system.
- **`index.es.js`:** This caters to ES modules, the modern standard for JavaScript modules.

Vite, the build tool, automatically generates these entry points based on the configuration provided. This configuration allows for customization to fit your specific needs.

```tsx
build: {
    lib: {
      entry: "./src/index.ts", // Specifies the entry point for building the library.
      name: "intelligent-react-components", // Sets the name of the generated library.
      fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
      formats: ["cjs", "es"], // Specifies the output formats (CommonJS and ES modules).
    }
  }
```

The build process transforms the source code into production-ready JavaScript. It focuses on directories like `src`, `lib`, `types`, and `utils`, ensuring only usable code reaches the final `dist` output. This configuration is defined within the TypeScript configuration file.

```json
 "include": [
    "src",
    "lib",
    "utils",
    "types",
    "../../../../nextjs-genkit/dynamic"
  ]
```

Within the `dist` directory, you might encounter files named like `myFn-BQn0pwXO.js`. These are code chunks, created when code is dynamically imported using the `import()` method. The unique naming combines the source filename with a hash (in this example, `BQn0pwXO`) for better organization and efficient code management.

## Understanding the interaction

To comprehend how the library interacts with dynamically created files, let's delve into the dynamic import process. While the library itself is delivered to the user, the interaction doesn't end there. The library relies on dynamically generated files at the user's machine to complete its tasks. However, this isn't straightforward, as statically built files cannot interact with dynamic files unless the library is rebuilt.

**Decoding the Sequence**

Let's explore this dynamic interaction using a [sequence diagram][uml_sequence_diagram]
The diagram depicts three lifelines: dynamic import (initiated by the user's codebase), the server, and Google AI. The interaction commences when a component is rendered.

1. **Component Rendering:** The component attempts to dynamically import a file from the filesystem.
2. **Initial Import Failure:** The file is not found, resulting in an error.
3. **Network Request:** The error triggers a POST request to the server using the fetch API, sending the filename and prompt.
4. **Server Relay:** The server forwards the request to Google AI.
5. **AI Response:** Google AI returns a response to the server.
6. **Server Processing:** Before responding to the client, the server preprocesses the response from Google AI, converting it into a valid JavaScript function and writing it to a new file.
7. **Rebuild Trigger:** The server triggers a rebuild to inform the build files about the newly created file.
8. **Client Re-render:** The changes in the build files lead to a client-side re-render.
9. **Successful Import:** The component again attempts to import the required file, and this time, the build files have the necessary code, allowing the component to render successfully.

A [state machine diagram][uml_state_machine_diagram] can provide a more granular view of this interaction. As a behavioral UML diagram, it clearly illustrates the detailed behavior of the client and server.

## Handling Errors and Exceptions

### How to open [Draw.io][def]

1. Go to draw.io
2. A dialog box will pop up select “Open existing diagram”
3. Download the diagram source file (provided below) and locate it to open.

### [Draw.io][def] source files

[package_diagram.drawio](package_diagram.drawio)

[state-machine.drawio](state-machine.drawio)

[sequence_diagram.drawio](sequence_diagram.drawio)

[uml_package_diagram]: https://viewer.diagrams.net/?border=0&tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=package_diagram.drawio#R%3Cmxfile%3E%3Cdiagram%20name%3D%22Page-1%22%20id%3D%22RovQbOXM-3uTcX77ALUE%22%3E7V1bc6M4Fv41fgyFJMTlsdOXma3qqerarq2dfkphQxy6HePFuOPMr19hBEEXbrEl5IT0QxuQMZzz6dx1tEAfH49%2FZOHu4a80ijcLaEfHBfq0gBC4tk3%2BK848l2d8NyhPrLMkooNeTnxP%2FonpSfq99SGJ4j0zME%2FTTZ7s2JOrdLuNVzlzLsyy9Ikddp9u2F%2FdhetYOPF9FW7Es%2F9NovyBngXVaxQX%2FoyT9QP9aR965YXHsBpM32T%2FEEbpU%2BMU%2BrxAH7M0zctPj8eP8aYgXkWX8ntfWq7WD5bF23zIF9Cf%2Fz7%2BfYw%2B%2F0rvvv04AC88IvsGAFje53e4OdBXpo%2BbP1c0IE%2B%2BKz4WxIuzBbq9T7f5d3odkOM8XFbE8e3yuKYJoie%2BpfskT9ItObWJ78mV24f8cUNvsEwP2yiOvi6rE08PSR5%2F34Wr4ieeCLSKX002m4%2FpJs1OT4Xuw8gLV%2BT8Ps%2FSX3HjytJxse2QK%2FTV4iyPj61UAzUvCIjj9DHOs2cyhH7Bp9yj8PXo4dMLFvzq3EMDBgBVwA8pANf1rV94RD5QNo1iGbpWli3tGMWujGV27Nu%2BfxmWAcDyjPBCYJoLJExDnjKeVW%2FR4FlCyHe08v0CupuCtlHym3xc5ycilKeWGX%2BG%2FDozjmf7rzhfFa9YcDA95JtkS6hcSUab4qBBd%2FLvS%2FEet%2BssjJL45do23cYiA0%2FDPwkMpIOjcP8QRxQOBQsTIke%2Fhst400DSMs3z9LEx4MMmWRcX8rRATEiPVuRZTsBtQO6E4VJDELHFYrp4t3C%2FK1%2F0PjkWz3G7S5PiLp9%2Fk5vt6U2qmfF4XBcaywqf9o61Tw%2FZKr5bEfV1IQwiyGAQQSxgEAYWRCIKHWUgdDwBMHFEtB09TLP8IV2n23Dz%2BeXsbVbO8wpT9ZivacGvE0l%2Fxnn%2BTBkTHvKU5Vp8TPK%2F6deLzz8anz8dmwcFrYCH6eG3OEvIixcgOA0pn7144G6ekPc7cbNzOlLu5GG2jvPOkS18zuJNmCe%2F2WdRwDJfIuvd8LGYKlQgNI%2BSxx3hUH1uzYyQi4yCoKc5ynJNmIf8dH1MoqgESLxP%2FgmX9Sw8TboTIfDtAn%2Fqmk%2FUaKNffjGVmjztgnLr9LMt27fd8maDOUXv9q14%2FsaQ9P5%2BTzDCs7L%2B0XO0wtUaX0sQRfe2TJMD20PBhaQoxJwml5hfjiPT5FCZEK2MCakmN1Md2%2B9eHfNmPAIikLSrYyTahAKC1kT97s6Sn92EqU1eShgoJQwWyQLUzTB4Yf%2FG5aUiVCUVI3sVx1AmFbGLgTcYzF14EVk5Jauca2XVMlz5EZKxCiLHwZEaVtVhMYcVR%2BKkq5nW5KRC%2F9SV2Zknm7JgF8NR93%2BHtLpwsz8pgA9kQLA7ltYmvVw5qXd3ebzP7%2B4aLmx5yxYfllCb4%2B9wW1TGeNaBUclUwOkYgamuLFKEVfEUi5aKQGwN%2Fh8TFVj0O3HdynKAb0ddpgG%2BXSBnqCbfDkvn3OzbYVvOFnr%2FG%2BLcIY%2Bdazf00GRfT%2FTkbw%2FE9t4Sx%2BEoKs3Zc9DlObxO2Fd5EwpAx5WYzZr9CRgICJs90yvFl28cupCIrlJ%2BXb8B1yArlpO1Mo8VkHVACFB3EAA50wcB0BwE6MCLUUEANAcBRrHK2CAAwhJGzkGAcUw1LAjgiGpbIPb1BAGqZ%2B8NAiCqsPuDAKglk6grCCCdc3MQwGmJzTSCAJ7LTLUbCg6DYwBIFvGZPTPDPLMeCQ9YtW2Eb%2BYJuDLd838PJWKvwldgHLocMY9gWdb1m2yc3pgyCuCIpQCrlKj67QmVBlK6p9zCZQMKsrodmRmM1GFYDLPss9X1URY0Zn9XebNe4iKp0WlUXalXHfFlpWM9k%2BF5SEqVAS5IS8JLV43p7IJ0wLrTBbFtzhhcmO6COM48V9ujzebP1blmoAPWXXMV%2BA5rWptfMoBFt05gl6Hl4ZMs9MISMxPJFnopdJawWOaxjrdxVmIM2h%2F%2BdRYLMVjoyo1oqfDn10m5Q7MgrjoOihHz34RaN7vNYZ1sb1ZZHJIjQq1YElx5x6yEXBbZlWSRNbPSndYxsaqlbD8aV0Rzp83aIXTPnv9uHvxoHpxu5OPyR04nnisQnQ4NNJ5K4XiG8XT66ocsC58bA6iBIapoCkwMPFZN8AvlufGwezz5UD7BZZW9i400zItigiGm%2BbWAdbhXPg1YXR8z4KtWLrWBlR9vKLhFS1YWQn7P6hP4QmTPg9NrUNGcLTNLkTS39I6dES%2FgYt6uhHlYwjzgq%2BNe8Nbtn6KPB6NR%2FFrDaFMp7uAFJ6AloqgpeFQZ6G8XDiBgDQyk38AYjgZ8buXRqwwM3x1nMCC7c7wig8GDgt6ZtU1D2zhBf%2BgLBrLQlzpbwR9Qsq26lB1zIUFXYkJBqRZW16%2FLu3Apu6evPvpClm8XXkRWTsmqIRH3ZgFVM0PClxZJC6DqLoC2SG5063%2F60iyMYuueNlyZlJCKaa2j4gua1qsdtBoRzIuyr3I02YkoCQY6wKoSpnoKmSpDu1kEEmfk5QUeG1AH8iqiFxS1G3%2BBQHRZZYi6pSG%2BlhYnryOVzQJUlniQtRZSpz89cR2NdW6UJFCnK85Bcf9CPN20F%2FPqBJZ5%2FDHcbJbh6peRRXjjiFvdR2xEqFkmyMqNJjYTPcnsl9oe6mI13gCyvEsrEffKCt2ckvVknI3EUdwbroS1W4memP9P84c4uyYV0Ed1i%2FjFjb%2FJVYKZjWkBZAKTzjmRSTZM7eqPS1ZlLf1xSW%2FaKLU%2Ft7ztmCRdJY4QB2zfEKqXDC5x9KfNULXNfBgwM78okb%2FqpEQVTjc2KcHZAR71UtqSEvx4I5MYUFL1MEuyetK3SjIiyNyKXwaLrgBI2fGmRJcJ6fXhsuvs9PrrZJc3UnZx4x12vCpZJOsDMssiOos7ZJGDK9KZLIvEFGNRs15S5j5ZH4r1B5JWbe85hc6vHvEDSQwQSZaBK2ylFZi5Oq8gQ0OnYGj1KxXLq1VFXe%2FT4g3rt4eD4VXA5%2FYIfpVOQQ5bCRqgHvuWW3DPjVdUpBPMC4c7ZnGHTrGdKjN7of7F3G10aJwhrYxm7fJSDmzLKiBkxdx1kbAC9XK9C0r11OBjYGGObb7INmkZt7p8UzAk3%2FSOuVa3qzWJZ6K7FaUrI1NIfXLMtVzQyBWBRa9Y09p9BlahwAapD4Sa10dpF1iETC9%2FsB%2FVmiktVnOZmxntkRn8znIGUBderZjXYlFhb4C%2FLuv24CgrG4O2CbVMAWuyBLJKRhmUXVVNh6E9wM5UVPZJWdJdW6iZGgNaMCujRks6b0JqXG1jf6V1bhQlIqeqjOXAOa1O1InVyZtkaaLmH0ffyfQ9EO1W%2FbqD6x4QBENxpkw%2BgOmWDFCWmCQtq22mJqHGgCp9zdSYdUcHSlpnORtrnlyTAFGTGNqLdxy1p9MkJnghPh84lfW%2F0CwuBuQolAlP49wQMKFTVnLCKGpcOKj%2BZlRJd5WxaapEdK0PebIxMiA5jt6TKROoxf4eqUzAYKgpExgVGaYQn23kmpAaWnp9dHHCKGpc7w6ISpUJ7F6Cb5gygaIZnT%2FvJF1%2BjVUmbfSeTploscDHKhNJ4ki3wJjQFofG2eJwgC2ujBrGJUgk27jPyqRGybUok0qmNguAnrfhY3JFga5hFJ9MuUi2Ti97065%2B7q2fxu58aC%2Fe%2Fs6H4yoWAJR2L9S7zSGU7Dhfwime0WQymlzXtpBvIqCk%2FbxWD4etpJ3UDCdD4FQ3XTcLS66AGBMWhjFLjdE5%2FVEQt9IY%2BJ6lfa1xXYNpap8Ehyt1D3r6HvDjPbo9ldq1xsjMdj5jwWphByxMXcI4AqqXWRYvYqulB0d9i%2FLJ6Lc4AXgRmPlvA2YGL5QdgTJ3mr2d8DiByI%2F33e7xAbcKgxuvSIBKdqvuWlgbrlbxfv%2F2F9bSGd9qutmWAyDrCZy7sFb9SlroXLioTd%2B6j%2Fsw8sKVLN63dFxsO5cxyIHNbywo2uOOL4k8qVveB50LJ%2FzEZq1AEc90rX4W1leJ0cJ6PxotSzJhtc25yeYC7jUXgGXbiHGjLNsNjLIZqskxwDKFZ9oMZyJi7s%2FWMVM61KyN%2Bf4V0Hw1e%2BGCP439tacR2TVgJhTZZnYHHR9IeAMOHp1Ab83BAxDhri8o8vCqp5w9PNmM71A9ro%2FZDWyvrXMSxKb2DR270bPBYm34Ns8TiTWX24URBSPFFPcFVWJKtJFmrF4aq2jG6kWwKoujzd4cncMdKhUhnw1ym%2B%2FMYckSUnJXcqaxYY1ZJXa93pfLmjVVv4XJyuuwWA5vcAVjL3kdFuIDt0FTSN65gWY3y4QWXbKufnrjEVgMGHb31zZ%2FYiAX9VJZ88QwM63v11ZmGfZxvCFNsA02O6vWIv1mJ25ZMaIpTF%2FtXDXHSmQTpXVq3xD0IU7tnZsOP7K30WDpuWKg7D97M3ds7ktj%2B6w%2Bk6Sx9QpaV1zp%2FTVZZiG991VRN%2BAbN0uKdjVTFwrUNbRf2rhG5nh6yoqOvrFNH3oWwvAllNPTVnSsmY1kro%2FGPQ2sZV1kNZNc4mcn%2B%2Fz6KI19xzTSij62sSv6u2nLb3gIJrcePDPTWCNz88RILiQCU0%2FlQcckR21EDXa5VZ7u%2FMB1LErxZCWbsxdJ53FHegAGbITohh5OkR4gh1ma5s3hxVLAv9KooPrn%2FwM%3D%3C%2Fdiagram%3E%3C%2Fmxfile%3E#%7B%22pageId%22%3A%22RovQbOXM-3uTcX77ALUE%22%7D
[uml_sequence_diagram]: https://viewer.diagrams.net/?border=0&tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=sequence_diagram.drawio#R%3Cmxfile%3E%3Cdiagram%20name%3D%22Page-1%22%20id%3D%22ywd1deQq6hKpcZsigvLp%22%3E7Vxbk6I4FP41PrYVEsLlsW8zs1UzVbPTU3t5jBKVXSQOYGvvr98EEiRcFBXQtrpf2hySCOfynUsOjtDjcvs5IqvFN%2BbRYASBtx2hpxGEBkCY%2FxOUt4yCLZgR5pHvyUk7wov%2FH1UrJXXtezTWJiaMBYm%2F0olTFoZ0mmg0EkVso0%2BbsUD%2F1hWZ0wrhZUqCKvVP30sWkmpY7u7CF%2BrPF%2FKrHWhnF5ZETZZPEi%2BIxzYFEnoeoceIsST7tNw%2B0kAwT%2FElW%2Fep4Wp%2BYxENkzYLrD%2FJ9nfr02vwsP7jV%2BC%2Fmp8%2FkTsz2%2BWVBGv5wOuYRik%2FPTohMZX3nrwphkRsHXpU7GmM0MNm4Sf0ZUWm4uqGqwCnLZJlIC%2FP%2FCB4ZAGL0rVoRjybTDk9TiL2Ly1cmZgWBia%2FIu%2BHRgndNj6okbOP6x1lS5pEb3yKWqA4LlXOlTtsdvIzgZyyKIjOlDQiVWae77zjKv8gGXsEk3GFySNokaXgVTiJV%2BlTgxqS9xaSpT8V2y9XLErOkwUJ%2FHnIPwd0llyLaAzF84JsEKqRjdOXbJyKbOjWjxM%2FnAu08IOqAXA7XomP62Xw1Z%2FRwA%2F56GFFI5%2FfERVMCyT5%2B452SDgcvhLCl0Ry7EVs9ZNEcyqeH6QTgoCsYn%2BS3oagRHS6jmL%2Flf6gcQabgsrWifjqxxwOBVEoD6dw0fLvEERK4mRDY6EHId08exzy1APaXM7Wr7VApQeaX8hJI3RfuB5MWGH1bhJ8LE1q2EAok8%2FBtmEpf8BXrt7FtUCboAxAn2E%2FnaTfkos2KGycSSNbo%2FDf6MYWoINLtoArtmBYNbZgGbgnY1BOt2AN3Bu8CofwYQQ3YAQTQBG16owAUAc4zl4j6EDlsVmG%2F8urvFFR%2Bc%2BMzYUgwf1vH3p%2FG3pveN4M1Om9AWzk0r713rauT%2B%2Btim7TgiZwnVmwOQtJUNCPAmNSbcvnfGVsJbn1D02SN5nGkXXCdE3n%2FIre%2FpLr08HfYjDGavi0LV58elOjrZ%2Bky8auC%2BU4WwlsR453S8WguLJgiikte3LxuMfKM6IBSbjVaevqZCOXfmfC5Hbhr%2BWOMVeG%2FA9qagFtV98xZutoSuUmxdSutC%2FCun7xLFTfKEnRpLLRfRSRt8K0lZgQ77l%2Fu%2F57doqY7bhTy5x3p2sqrOaoRoojgIXNqZGQ7lcyoUF9EjTlkk6hWYHQvbyw9D0v03UBrGSHuJI3fHP8MMJP%2B4BB1iLk4lFeASgq2B6jbISROzA2TGW4SgTZ6FTFVFPYbBbTZFRGlQ7EZ8CK%2BDhiB2kKytJ72ElNAbm4cJchspCzu9qm7N65CWsu%2Fv%2BgHI2yYgVXglDwVu7M7zTbPJtY0Y53UMQwbF3ONZkyRlWPgUFfmXJexxrWY0jkNzTUx%2FsxX3mZ3OW08zJt%2FQLnQQrM%2B7Re%2Bu1EhXGNE%2B0uPM2xQG7CvUB%2BcD4Cbv%2FAb9TWzVL7jlckbIMchtEAHd%2F8OC6ARbbfuwWLiv%2B3UQUs6qpqhtNXdGn3J7rnKOI8vFnZIVBTEh1SdhBdEucVmB%2BH82MAkI71BnIP5RRiVE4NPBIvSplfN%2F7AbusP4Jn%2B4DzZVyHXGBsq1A6ZcAkzIerbiLczVW80TTCGLtKM0zgv2la37Wib3iF9g%2F5icdgjLH%2FxkyFAuUUJswNQtoBem0d151SDgnL1nKpqgqF3L068hbkFJI79qc5JHaPzwFphZw66%2FNGOLqmcWtjpEmJhS4iFDSF3MbOqka2inWn8ZqkWiOxSwta26JNnemojXLqXhqJPV2CCqpVzmGHEdxYnKaN%2BrUWZ%2BTZchXPAVQDL0iszCtbP1JdS5qU6NgZwFm7nkHMFIAFaggQC9fIeBiQsVPI%2F5f6HtiBhW8b%2BjfoGiWr1D46NepjgkWW0IdGtxJbuXsAQtVxL1fuVbXcUXpr6rnAoxEBmrehuqELYV3qIWsNSQ8YyTHqIqukht%2BaxdPs%2FaLxiYU3L4Lu030yZ9zh8y7R1kFaGdqb5Inswe622%2B7y7dPDwyX6jarRPBx1Ycsf2hdNBhPqT3Au94UTeBNXOi2ElZ31I7jTJoXY2h0FfknOuJ7qBp4U39oCZllL0wyFNQ9NDvyeg5ZYs00RFDTk833JKGtXDCSiqpuBQRVvTiJJEdCnO1uE08UWB%2FibCrv11Fp422UAlledWVgZLjMweA63bBn33wqBvGhUufoD%2BYUU%2FCPpmQ3ltWNDH4DjQx%2FIArVfQN%2BtKZqgM%2BnVvJr1LwDf3IwIHfMdwugH88gt%2BPQL%2BR352GuBjfGnAv6Ia5nsAfNQW8M8tXHYD%2BNaRgO8MAfh1VVUzQ4GfkT%2Bfpz3OEZ2s%2FcC7EdDfX1zloG%2B5oBvQL6%2FoEfTrSjtlaZ12YHolxxStT0%2FNi7ZYYNcd627FQqV6Xtvz0zwBadqo5%2FNTs9r3A1Pxj27tvMXc%2F%2B4LGCOsvxHR0XHLcPDgXjKyOLWv1nB16LGz9%2B2upa%2FWHKyvtkF7nBI%2BqK6ZofChx47OgRKNy7TZW%2FDCR3i4x5rgQIevF5JcyxSxP8lVGx%2B7ivN6a4w7iI%2F4ov1u5ReLLXzim9BmCY9to1Qo6BmPcbXwg270ZWV8sHAHbVNvie2mvw2WfhOhv5AN1xj2lTe0gbFr6SDiXFXAhtumkN0EbEe%2FGAvqgagRb8rzHVBSxB4KRrj6iwhINdXG6%2BmUxvGNQEyDDuQ5oWnqr1J11EA72AtZuFoy6vP3F4fplsNItwkXVuI1sy5gO%2BH3F%2Flw9wOamVB2P0OKnv8H%3C%2Fdiagram%3E%3C%2Fmxfile%3E#%7B%22pageId%22%3A%22ywd1deQq6hKpcZsigvLp%22%7D
[uml_state_machine_diagram]: https://viewer.diagrams.net/#P%7B%22client%22%3A1%2C%22target%22%3A%22blank%22%2C%22edit%22%3A%22_blank%22%2C%22close%22%3A1%2C%22nav%22%3A1%2C%22highlight%22%3A%22000ff%22%7D#%7B%22pageId%22%3A%220%22%7D
[def]: http://draw.io
