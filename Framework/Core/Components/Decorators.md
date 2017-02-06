# Decorators



I still don't know how exactly i want to implement this but there are some ideas that i have.

*eg*


@Settings({})
@Route("/users")
export class UserController extends Controller {
    

    @Settings({
        limit:10
    })
    @Get("/")
    getUsers(){

    }



    @Route("/user")
    @Get("/:id")
    @Settings({
        version:1.1.1
    })
    @Bail(function(){
        const $this = this as any as UserController;
        
    })
    user(){
        
    }

}


I have access to the target so therefore the constructor.
The key and the property definition;


using the constructor i have access to the accessor.

I can places a class called ControllerMethodOptions

class ControllerMethodOptions{
   class=UserController,
   method_name:"user"
   route="/user"
   method_type="GET"
   settings={
       version:"1.1.1"
   }
}


I would need a class for the controller itself

class ControllerOptions {
    class=UserController
    route="/users",
    settings={}
}