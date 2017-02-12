# Decorators



I still don't know how exactly i want to implement this but there are some ideas that i have.

*eg*

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
    user(){
        
    }

}