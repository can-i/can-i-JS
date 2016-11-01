let must = require("must");

describe("A Node Test",function(){

    let number:number;
    before(function(){
        number =1;
    })


    beforeEach(function(){
        number++;
    })


    it("Should add 1 to number",function(){
        must(number).to.equal(2);
    })
})