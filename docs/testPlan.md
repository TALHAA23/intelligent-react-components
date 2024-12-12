## Test Plan

[//]: # "Title: Test Plan"
[//]: # "Author: Talha Sifat"
[//]: # "Type: Documentation"
[//]: # "Date: 2024-09-21"
[//]: # "From Sprint Number: 1"
[//]: # "Task title:Test Plan"

This documentation describes the testing techniques for **intelligent React components**.

We have planned three types of tests:

1. **Functionality testing**
2. **Compatibility testing**
3. **Integration testing**

## Functionality Testing

This test is similar to **unit testing** and will use **Vitest** and **Jest** for automation. It will examine how a component works to identify any errors or unexpected behavior and assess its performance with different inputs.

To automate testing with Vitest, we have configured the following:

First we have to create `vitest.config.ts` file and put the below code in it

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
  },
});
```

the we create the `tests/setupTest.ts` :

```typescript
import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any>
    extends jest.Matchers<void, T>,
      TestingLibraryMatchers<T, void> {}
}
expect.extend(matchers);
```

This snippet creates a test environment so we can test the library anywhere.

For each component, we create a `__test__` directory that holds the `test scripts`.
for instance a `test suite` and `test cases` will look like this:

```typescript
describe("Button component", () => {
  it("Button should render correctly", () => {
    render(<Button filename="name" prompt="prompt" />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });
});
```

In `package.json`, we have the following configuration to run tests:

```json
{
    ...
    "scripts":{
        "test": "vitest run",
    }
    ...
}
```

This will execute all test suites and provide test coverage.

```json
{
    ...
    "scripts":{
        "test-watch": "vitest",
    }
    ...
}
```

This executes tests in watch mode, so any changes will automatically rerun the tests.

## Compatibility Testing

This will be a manual test to ensure the library works correctly in different user environments. We will test it in:

- CommonJS environments
- Ecma environments
- JavaScript codebases
- TypeScript codebases

## Integration Testing

Integration testing will also be manual and conducted in the user's codebase to verify the component's compatibility with user-defined components.

---
