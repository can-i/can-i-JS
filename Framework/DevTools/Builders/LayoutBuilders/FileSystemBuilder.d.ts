/// <reference types="core-js" />
import LayoutBuilder from './LayoutBuilder';
import NameDataStructure from '../../../Core/Components/Structure/NameDataStructure';
import FolderLayoutBuilder from "./FolderLayoutBuilder";
import FileLayoutBuilder from './FileLayoutBuilder';
export declare function Creator(root: string, settings: any): FileSystemBuilder;
export declare class FileSystemBuilder extends LayoutBuilder {
    protected folderLayoutBuilder: FolderLayoutBuilder;
    protected fileLayoutBuilder: FileLayoutBuilder;
    constructor(root_directory: string, settings: any, folderLayoutBuilder: FolderLayoutBuilder, fileLayoutBuilder: FileLayoutBuilder);
    onItemAction(item: NameDataStructure): Promise<void>;
}
