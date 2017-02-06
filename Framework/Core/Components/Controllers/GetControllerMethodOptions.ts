import { Root } from '../../../Utilities/Internal';
import { ControllerMethodOptions } from './Options/ControllerMethodOptions';
import { ControllerOptions } from './Options/ControllerOptions';
import { MainController } from './MainController';


const root = Root();
export function GetControllerMethodOptions() {
    return root.ControllerOptions.filter(option => {
        return option instanceof ControllerMethodOptions;
    }) as ControllerMethodOptions<MainController>[];
}


export default GetControllerMethodOptions;