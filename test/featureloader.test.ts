import "source-map-support/register";
import * as chai from 'chai';
import * as sinon from 'sinon';
import { ExpressFeatureLoader, IServerProvider, IServer } from '../Win/Application';
const expect= chai.expect;

describe("ExpressFeatureLoader",function(){

    let featureLoader:ExpressFeatureLoader;

    class TestServer implements IServer{

        features:{[key:string]:boolean} = {}
        enable(feature:string){
            this.features[feature]=true;
        }
        disable(feature:string){
            this.features[feature] = false;
        }

        enabled(feature:string){
            return !!this.features[feature]
        }

        disabled(feature:string){
            return !!this.features[feature];
        }

        close(){
            
        }

        Listen(port:number,callback:Function){
            callback();
        }
    }
    class TestServerProvider implements IServerProvider{
        static _app:IServer;
        provide(){
            return TestServerProvider._app || (TestServerProvider._app = new TestServer());
        }
    }


    before(function(){
        featureLoader = new ExpressFeatureLoader(new TestServerProvider())
        let proto = TestServer.prototype;
        sinon.spy(proto,"enable");
        sinon.spy(proto,"disable");
        sinon.spy(proto,"enabled");
        sinon.spy(proto,"disabled");
    })

    it("should be able to enable features",function(){
        featureLoader.enable("test");

        let enableSpy = <sinon.SinonSpy>TestServer.prototype.enable;

        expect(enableSpy.calledOnce,"Enable was not called once").to.be.true;

        expect(enableSpy.firstCall.args).to.eqls(["can-i/feature test"])

        expect(featureLoader.enabled("test"),"Could not verify that the feature was enabled").to.be.true;
    })


    it("should be able to disable features",function(){
         featureLoader.disable("test");

        let disableSpy = <sinon.SinonSpy>TestServer.prototype.disable;

        expect(disableSpy.calledOnce,"Enable was not called once").to.be.true;

        expect(disableSpy.firstCall.args).to.eqls(["can-i/feature test"])

        expect(featureLoader.enabled("test"),"Could not verify that the feature was enabled").to.be.false;
    })
})