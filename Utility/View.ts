import { Accessor } from './../Win/Accessor';


export function View(page:string) {

    return function View(target: Object, key: string, d: TypedPropertyDescriptor<any>) {
        let original = d.value;
        d.value = function (...args:any[]) {
            this.internal_options.render = true;
            this.internal_options.renderPage = page;
            original.apply(this,args);
        }
        return d;
    }
}