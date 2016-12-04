import { InternalAccessorStructure } from './../IOC/InternalAccessorStructure';

const map = new Map<any,any>();
export const Accessor = function (obj: any): InternalAccessorStructure {
    let o: any = obj.constructor === Function ? obj : obj.constructor;
    let r = map.get(o)
    if (!r) {
        r = {};
        map.set(o, r)
    }
    return r;
}

export default Accessor;