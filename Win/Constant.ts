const GLOBAL_KEY="__GLOBAL_CONSTANT_KEY_CHANGABLE";
const g = <any>global;


let GLOBAL_STORE = new Map<string,any>();
if((GLOBAL_KEY in g)){
    GLOBAL_STORE = g[GLOBAL_KEY];
}else{
    g[GLOBAL_KEY] = GLOBAL_STORE;
}

export class Constant{
    private static map = GLOBAL_STORE;
    static set<T>(key:string,data:T):T{
        if(this.map.has(key)){
            return this.map.get(key)
        }else{
            Constant.map.set(key,data);
        }

        return data;
    }
}