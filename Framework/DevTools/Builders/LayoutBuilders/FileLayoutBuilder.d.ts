/// <reference types="core-js" />
import LayoutBuilder from "./LayoutBuilder";
import NameDataStructure from "../../../Core/Components/Structure/NameDataStructure";
export declare function Creator(root_directory: string, settings: any): FileLayoutBuilder;
export declare class FileLayoutBuilder extends LayoutBuilder {
    constructor(root_directory: string, settings: any);
    onItemAction(item: NameDataStructure): Promise<void>;
    /**
       * This creates the needed folder from the layout settings
       */
    CreateFile(root: string, name: string): Promise<void>;
    CreateFilePath(root: string, name: string): string;
}
export default FileLayoutBuilder;
