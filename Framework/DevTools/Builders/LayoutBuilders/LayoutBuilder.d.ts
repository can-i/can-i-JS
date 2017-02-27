/// <reference types="core-js" />
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
export declare function Creator(root_directory: string, settings: any): LayoutBuilder;
export declare class LayoutBuilder {
    protected _root_directory: string;
    protected _settings: {
        [key: string]: any;
    };
    readonly root_directory: string;
    readonly settings: {
        [key: string]: any;
    };
    onItemFoundAction: OnItemFoundAction;
    constructor(_root_directory: string, _settings: {
        [key: string]: any;
    });
    onItemAction(item: NameDataStructure): Promise<void>;
    FindItem(settings: any, name?: string): Promise<void>;
    GetSteps(object: StringKeyPair): string[];
    onItemFound(onItemFoundAction: OnItemFoundAction): void;
    Run(): Promise<void>;
}
export default LayoutBuilder;
