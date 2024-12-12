# Server documentation

## Introduction

Intellegint react component server is in **Express JS** the purpose of the server is to **watch** the dynamically created files and trigger **Rebuild** to include them in the bundle. Let get to know in more details.

## Installation

The server will be provided by the library you have to start it when using the libarry in you project at developemnt mode. To start a server there are some manual configuration that need to be done:

_asuming that the library is alredy installed_

1. Open `package.json` and add this new script:

```json
"script":{
    ...
    "server": "node node_modules/intelligent-react-components/build/server"
    ...
}

```

2. Open `terminal` and the run the the command.

```powershell
npm run server
```

That's all this will start the library server now you can start using all the component which dynamically generate files and trigger rebuild. everything the sever does is logged in the terminal.

## Generic

### API References

Now lets talk about the `end point`, there type, what they expect and what you should expect.

Following are all the possible endpoints

| HTTP Method | End point         | Desciption                                                            |
| ----------- | ----------------- | --------------------------------------------------------------------- |
| POST        | `/prompt-to-code` | This is where prompt is sended, code generated and file creation      |
| GET         | `*`               | This is a catchall route which handle request to a non-existing route |

### Request

...

### Response

...

### Status code

...

### Default configuration

The server default configuration below are as below:

```json
{
  "server": {
    "port": 5173,
    "rebuild-delay": {
      "change": 10000,
      "other": 100 //unlink, add events
    }
  },
  "files": {
    "dirname": "dynamic",
    "path": "." //root
  }
}
```

This configuration can be find in `ric.config.{json|cjs}` file in the root of your project. any changes will be reflected on the server.

### Conventation

Everything that comes and goes out of the server is in `camelCase` like `methods`, `object property` etc.
