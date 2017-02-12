

import * as sinon from "sinon";
import * as chai from "chai";
import { DecoratorBuilder } from '../Framework/Core/Components/Decorators/DecoratorBuilder';
import { Accessor } from '../lib/Accessor/Accessor';

const expect = chai.expect;





describe("DecoratorBuilder",function(){

    const builder = new DecoratorBuilder();

    

    before(async function(){

        builder.Construct = function<T extends Function>(_class:T){
            (_class as any).addition = true;
        }


        builder.Method =  function(proto,key:string,pd:PropertyDescriptor){
            pd.value = function(){
                return "hello world"
            }
            return pd;
        }


    })

    it("should be able to decorate class constructor",async function(){
        let decorator = builder.build();

        @decorator
        class Test{
            getResult(){
                return null;
            }
        }

       expect((Test as any).addition).to.be.true;

    })


    it("should be able to decorate class methods",async function(){
        let decorator = builder.build();
        class Test{
            @decorator
            getResult(){
                return null;
            }
        }

        expect("hello world").to.equal(new Test().getResult())

    })


    after(async function(){
        
    })
})