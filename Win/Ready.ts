import { Constant } from './Constant';

const READY_KEY="__GLOBAL_READY_KEY";

export interface IReady {
    isReady(): boolean
    OnReady(callback: Function): void;

    Ready(): void;
}

export class Ready implements IReady {

    constructor() {
        console.log("created Ready");
    }

    private store: Function[] = [];

    isReady() {
        return Constant.set(READY_KEY,{ready:false}).ready;
    }

    Ready() {
        let readyState = Constant.set(READY_KEY,{ready:true});
        readyState.ready = true;
        let cb;
        while (cb = this.store.shift()) {
            cb();
        }
    }

    OnReady(cb: Function) {
        if (this.isReady()) {
            cb();
        } else {
            this.store.push(cb);
        }
    }


}