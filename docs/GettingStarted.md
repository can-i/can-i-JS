# Getting Started



## tsconfig.json {#tsconfig}

The tsconfig.json file is used to allow typescript to compile the project.
The minimum version of typescript required is typescript 2.1.1.

Depending on the time of reading this, the required version might be a release candidate
so typescript@rc might need to be installed.

This can be installed via

```
    npm install typescript@rc
```

Check the version of typescript that is used to compile the project.


if you are using visual studio code you can specify which typescript to use.
This way you can compile with a different compiler version.


```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "Node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false
  }
}

```

This is a basic setup of the tsconfig.json file.


## index.ts {#index}

The main application will require a couple of imports from the ```can-i``` framework in order to start the framework.
There will be three main functions that will be needed to start the application.
The **Configure, BootStrap and Listen** functions. Each function serves a different purpose and highlights a different
stage in the application life.


```js
import { Configure } from 'can-i/Config';
import {BootStrap,Listen} from "can-i/win";

```

##### Bootstrap {#bootstrap}
The BootStrap function allows for the application to create an instance of the listener that will be 
responding to incoming requests. This also has the following configuration in order to allow some defaults when
the application launches.

The Bootstrap function takes the following optional parameter.

```ts
    interface Configuration {
        controllers?: string
        services?: string
        views?: string
        engine?:Engine
    }
```

The BootStrap function has good defaults and can be booted without any configuration.

```ts

    {
        controllers:"./controllers",
        services:"./services"
    }
```

This is the default for the configuration.
These fields represent the following.

|Field|Description|
|------|----------|
|controllers|The directory containing all of the controllers|
|services|The directory containing all of the services|

##### Configure {#configure}
Allows the configuration of the running instanceof of the application. At this point the services and the controllers
are all loaded and the listeners have been configured. These are mostly flags that can be set on or off.




##### Boot {#boot}
Allows the application to be booted and accepts a callback that will run once the application is ready.
This is jusst an alias to the ```http``` listen method.

## Example {#final}
```js
// ./index.ts


//Final File

import { Configure } from 'can-i/Config';
import {BootStrap,Listen} from "can-i/win";

/**
    This creates the listener but doesn't start it.
*/
const app = BootStrap({
    engine:{
        engineConfig:{
            name:"vash"
        }
    }
})


/**
This enables certain features in the framework
*/
Configure({
    features:["documentation"]
});

/**
    Booting the server on port 3000
*/

Listen(3000,function(){
    console.log("Server Booted");
})

```