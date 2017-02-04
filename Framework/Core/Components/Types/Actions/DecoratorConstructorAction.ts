// import { Action } from '../../Actions/Action';

// import ConstructorActionType from "../../Types/Actions/ConstructorAction";

// export class ConstructorAction extends Action{


//     constructor(action:ConstructorActionType){
//         super(action);
//     }
// }


import Action from "../../Types/Actions/Action";

export namespace Framework.Core.Types.Actions {
    export type DecoratorConstructorAction = <T extends Function>(_class:{new():T})=>T|void;
}

export type DecoratorConstructorAction = Framework.Core.Types.Actions.DecoratorConstructorAction;

export default DecoratorConstructorAction;