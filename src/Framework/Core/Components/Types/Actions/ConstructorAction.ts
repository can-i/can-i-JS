// import { Action } from '../../Actions/Action';

// import ConstructorActionType from "../../Types/Actions/ConstructorAction";

// export class ConstructorAction extends Action{


//     constructor(action:ConstructorActionType){
//         super(action);
//     }
// }


import Action from "../../Types/Actions/Action";

export namespace Framework.Core.Types.Actions {
    export type ConstructorAction = Action;
    export const name="hello";
}

export default Framework.Core.Types.Actions.ConstructorAction;