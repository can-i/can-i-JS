import { Root } from '../../../Utilities/Internal';
import { ControllerMethodOptions } from '../Controllers/Options/ControllerMethodOptions';
import { MainController } from './MainController';
import ControllerOptions from './Options/ControllerOptions';

const root = Root();
export function GetControllerOptions() {
    return root.ControllerOptions.filter(option => {
        return !(option instanceof ControllerMethodOptions);
    })
}

export default GetControllerOptions;