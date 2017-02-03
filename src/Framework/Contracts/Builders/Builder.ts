
export namespace Framework.Contracts.Builders{


    /**
     * The Builder class is responsible for building things. 
     * It has it's build method
     * 
     */
    export abstract class Builder {

        abstract build(...args:any[]):any;
    }

}

const Builder = Framework.Contracts.Builders.Builder;

export default Builder;