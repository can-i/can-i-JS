import { ObjectStringDigger } from './GlobalNameSpaceDriller/ObjectStringDigger';




/**
 * This is the string that contains the name for the internal
 * global namespace
 */
const ns = 'com.can-i.www.global';



export function InternalNameSpace(namespace: string) {


    /**
     * This is the internal namespace.
     * This is a way to further divide up the  global namespace in nodejs.
     * This gives far less chances of having a namespace colission.
     * 
     * This was inspired by the way android divides up their packages.
     * 
     * 
     * 
     */
    let global_namespace_root = ObjectStringDigger(ns);

    let root = global_namespace_root[namespace] = global_namespace_root[namespace] || {};
    return root as any;
}


export default InternalNameSpace