# Controllers


Controllers are where the main routing and logic of your application starts.
Controllers will rely on extending other controllers to get new features.

Controllers has a couple of ways to perform logical operations and has a couple different ways to handle data.



## Decorators {#decorators}

|Decorator|Import|Description|
|---------|------|-----------|
|Route    |```can-i/Route/index```| Attach Routing configuration to a controller|
|\**Method*|```can-i/Route/Method```|Used for routing different HTTP methods|


#### Methods {#methods}
|Methods|Description|
|-------|-----------|
|Get| Get Request|
|Post| Post Request|
|Put| Put Request|
|Delete| Delete Request|


There are actually alot more request types but these are just some of the more popular request.
The full list is here.

* Get
* Post
* Put
* Use
* Checkout
* Copy
* Delete
* Head
* Lock
* Merge
* MkActivity
* MkCol
* Move
* MSearch
* Notify
* Options
* Patch
* Report
* Search
* Subscribe
* Trace
* Unlock
* unsubscribe



## BaseController {#basecontroller}

The base controller is the controller you are going to inherit to get some of the cool features that ```can-i``` has in store.

```ts
// ./controllers/HelloController.ts

@MiddleWare(Body)
@Route("/hello")
export class HelloController extends BaseController{

    constructor(){
        //Nothing defined yet,
        //Setup
    }

    @Get("/world")
    async hello_world_method(){
        this.send("Hello World")
    }

    @Post("/can-i")
    async hello_can_i_post_method(){
        let body= this.req.body;
        this.send({
            status:"ok",body
        })
    }    
}

```

This is a basic controller with the following routes

```
    Get:    /hello/world
    Post:   /hello/can-i
```

When the constructor is called the controller doesn't have access to the req res and next properties.
This will be made available when the method is reached.





import { Body } from './../middleware/index';
import { ExplorerService } from './../services/ExplorerService';
import { Route } from 'can-i/Route/index';
import {Get,Post} from "can-i/Route/Method";
import { BaseController } from 'can-i/Controller';
import {MiddleWare} from "can-i/Middleware";
import {Job} from "can-i/Work";