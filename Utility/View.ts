import { Accessor } from './../win/Accessor';


export function View(page:string) {

    return function View(target: Object, key: string, d: TypedPropertyDescriptor<any>) {
        let original = d.value;
        d.value = function (...args: string[]) {
            this.internal_options.render = true;
            original.apply(this,page,...args);
        }
        return d;
    }
}