import { Accessor } from './../win/Accessor';

export interface JobOption{
    ever?:number
}


export interface JobSettings {
    target:Object
    method_name:string,
    options:JobOption
}


export const ControllerJobs:Object[] = [];


export function Job(Options:JobOption){

    return function(target:Object,str:string){
        let access = Accessor(target);
        access.job = access.job || [];
        access.job.push({
            target:target,
            method_name:str,
            options:Options
        })

        ControllerJobs.push(target);
        console.log(access.job);
    }
}


// function log(target: Function, key: string, value: any) {
//     return {
//         value: function (...args: any[]) {
//             var a = args.map(a => JSON.stringify(a)).join();
//             var result = value.value.apply(this, args);
//             var r = JSON.stringify(result);
//             console.log(`Call: ${key}(${a}) => ${r}`);
//             return result;
//         }
//     };
// }





// function logClass(target: any) {

//   // save a reference to the original constructor
//   var original = target;

//   // a utility function to generate instances of a class
//   function construct(constructor, args) {
//     var c : any = function () {
//       return constructor.apply(this, args);
//     }
//     c.prototype = constructor.prototype;
//     return new c();
//   }

//   // the new constructor behaviour
//   var f : any = function (...args) {
//     console.log("New: " + original.name); 
//     return construct(original, args);
//   }

//   // copy prototype so intanceof operator still works
//   f.prototype = original.prototype;

//   // return new constructor (will override original)
//   return f;
// }