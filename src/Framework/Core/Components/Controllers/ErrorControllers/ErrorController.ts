import { Controller } from '../Controller';
import { Error500Controller } from './Error500Controller';
import { Error200Controller } from './Error200Controller';
import { Error300Controller } from './Error300Controller';
import { Error400Controller } from './Error400Controller';
import * as express from 'express';


export class ErrorController extends Controller {
    protected Error200 = new Error200Controller();
    protected Error300 = new Error300Controller();
    protected Error400 = new Error400Controller();
    protected Error500 = new Error500Controller();

    constructor() {
        super();
    }


    private PasstoBase(key: "req" | "res" | "next", v: any) {
        let errors = [this.Error200, this.Error300, this.Error400, this.Error500];

        errors.forEach(error => {
            error[key] = v;
        })

        super[key] = v;
    }

    set req(v: express.Request) {
        this.PasstoBase("req",v);
    }

    set res(v: express.Response) {
        this.PasstoBase("res",v);
    }

    set next(v: express.NextFunction) {
        this.PasstoBase("next",v);
    }



}