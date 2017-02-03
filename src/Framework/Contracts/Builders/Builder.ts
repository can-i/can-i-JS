
export namespace Framework.Contracts.Builders{


    /**
     * The Builder class is responsible for building things. 
     * It has it's build method
     * 
     */
    export abstract class Builder {

        abstract build(): Promise<any>;
    }

}

export default Framework.Contracts.Builders.Builder;