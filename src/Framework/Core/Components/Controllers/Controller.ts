import AppGetter from '../App/AppGetter';
import * as express from 'express';


export class ControllerSetter {

}

export class Controller extends ControllerSetter {

    private _req: express.Request;
    private _res: express.Response;

    private _next: express.NextFunction;

    set req(v) {
        if (!this._req) {
            this._req = v;
        }
    }

    set res(v) {
        if (!this._res) {
            this._res = v;
        }
    }

    set next(v) {
        if (!this._next) {
            this._next = v;
        }
    }

    /**
     * The express Next function used to go to the next middleware.
     */
    get next() {
        return this._next;
    }

    get req() {
        return this._req;
    }

    get res() {
        return this._res;
    }

    get App(): express.Application {

        return AppGetter()
    }


}