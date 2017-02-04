import AppGetter from '../App/AppGetter';
import * as express from 'express';
import { ApplicationController } from './ApplicationController';



export class CommunicationController extends ApplicationController {

    private _req: express.Request;
    private _res: express.Response;

    private _next: express.NextFunction;

    /**
     * Express req Object
     */
    set req(v) {
        if (!this._req) {
            this._req = v;
        }
    }


    /**
     * Express res Object
     */
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


    /**
     * Express req Object
     */
    get req() {
        return this._req;
    }

    /**
     * The express res Object
     */
    get res() {
        return this._res;
    }


    send(body?: any) {
        this.res.send(body);
        return this;
    }


    /**
     * Set the Status of the response
     */
    status(code: number) {
        this.res.status(code);
        return this;
    }


}