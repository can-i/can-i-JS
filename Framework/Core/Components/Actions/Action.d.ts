/**It is very important to keep all imports to the top. This will be critical when developing tools to document and provide easy access to the framework. */
import { Action as ActionType } from "../Types/Actions/Action";
export declare class Action {
    action: ActionType;
    constructor(action: ActionType);
}
export default Action;
