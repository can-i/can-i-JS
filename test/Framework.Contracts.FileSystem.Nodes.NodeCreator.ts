import * as sinon from "sinon";
import * as chai from "chai";
import NodeCreator from '../Framework/Contracts/FileSystem/Nodes/NodeCreator';

const expect = chai.expect;



describe("NodeCreator",function(){

    it("should be able to get the NodeCreator class",async function(){
        expect(NodeCreator).to.exist;
    })

})