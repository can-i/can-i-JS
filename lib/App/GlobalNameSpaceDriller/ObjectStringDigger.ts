import InternalNameSpace from '../internal_global';
/**
 * @param full_namespace This is the full name of the namespace intended to be used.
 * This includes the periods that are found in the namespace
 */
export function ObjectStringDigger(full_namespace:string){

    /**
     * The full namespace divided into an array that is seperated using "."
     * 
     * It is recommended to using the reverse of your domain
     *  
     */
    let chunk = full_namespace.split(".");

    let inner_corner_of_the_universe:any = global;

    for(let step of chunk){
        inner_corner_of_the_universe=driptip(inner_corner_of_the_universe,step);
    }

    return inner_corner_of_the_universe;
}


export function driptip(step:any,label:string){
    return step[label] = {};
}