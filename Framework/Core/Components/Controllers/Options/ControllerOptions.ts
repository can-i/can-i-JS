import { MainController } from '../MainController';
import RouteFormatter from '../../Routing/RouteFormatter';
import { Root } from '../../../../Utilities/Internal';

const root = Root();

export class ControllerOptions<T extends MainController>{


    klass:{new():T}
    private _route="/"

    get route(){
        return this._route;
    }

    set route(v){
        this._route = RouteFormatter(v);
    }
    Settings:any = {}
    constructor(protected _class:{new():T}){
        root.ControllerOptions.push(this);
    }
}


export default ControllerOptions;