export declare namespace Framework.Contracts.Builders {
    /**
     * The Builder class is responsible for building things.
     * It has it's build method
     *
     */
    abstract class Builder {
        abstract build(...args: any[]): any;
    }
}
declare const Builder: typeof Framework.Contracts.Builders.Builder;
export default Builder;
