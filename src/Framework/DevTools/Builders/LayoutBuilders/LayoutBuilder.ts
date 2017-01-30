import StringKeyPair from '../../../Core/Components/Types/Generic/StringKeyPair';
import NameDataStructure from '../../../Core/Components/Structure/NameDataStructure';
import OnItemFoundAction from '../../../Core/Components/Types/Actions/OnItemFoundAction';





/**
 * This creator pattern will be seen alot through out this framework. 
 * This will make it easy to Create a class without having to know exactly 
 * what it needs to function.
 * 
 * This will be useful.
 */
export function Creator(root_directory: string, settings: any) {
    return new LayoutBuilder(root_directory, settings);
}

export class LayoutBuilder {


    get root_directory() {
        return this._root_directory;
    }

    get settings() {
        return this._settings;
    }


    onItemFoundAction: OnItemFoundAction;
    constructor(protected _root_directory: string, protected _settings: any) {
        this.onItemFoundAction = this.onItemAction;
    }


    async onItemAction(item: NameDataStructure) {

    }

    async FindItem(settings: any, name: string = "") {

        let steps = this.GetSteps(settings);

        for (const step of steps) {
            let stepname: string;

            if (name) {
                stepname = `${name}.${step}`
            } else {
                stepname = step;
            }

            let data = settings[step];

            /**
             * Here i am going to need a structure that
             * contains
             * 
             * {
             *      name:string,
             *      data:any
             * }
             */

            let namedata: NameDataStructure = {
                name: stepname,
                data
            };


            if (this.onItemFoundAction) {
                await this.onItemFoundAction(namedata);
            } else {
                //Log should go here that item is not found;
            }



            if (typeof data === "object"){
                this.FindItem(data,stepname);
            }
        }

    }

    GetSteps(object: StringKeyPair) {
        let keys = Object.keys(object);
        return keys;
    }

    onItemFound(onItemFoundAction: OnItemFoundAction) {
        this.onItemFoundAction = onItemFoundAction;
    }


    async Run() {
        await this.FindItem(this.settings);
    }
}






export default LayoutBuilder;