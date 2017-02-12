import LayoutBuilder from './LayoutBuilder';
import NameDataStructure from '../../../Core/Components/Structure/NameDataStructure';
import FolderLayoutBuilder from "./FolderLayoutBuilder";
import FileLayoutBuilder from './FileLayoutBuilder';

export function Creator(root:string,settings:any){

    return new FileSystemBuilder(root,settings, new FolderLayoutBuilder(root,settings),new FileLayoutBuilder(root,settings));
}

export class FileSystemBuilder extends LayoutBuilder{


    constructor(root_directory:string,settings:any,protected folderLayoutBuilder:FolderLayoutBuilder, protected fileLayoutBuilder:FileLayoutBuilder ){
        super(root_directory,settings);

        //disable the actions so that it can be controlled;
        this.folderLayoutBuilder.onItemFoundAction=LayoutBuilder.prototype.onItemAction;
        this.fileLayoutBuilder.onItemFoundAction=LayoutBuilder.prototype.onItemAction;

        this.onItemFoundAction = this.onItemAction;
    }


    async onItemAction(item:NameDataStructure){
        await this.folderLayoutBuilder.onItemAction(item);
        await this.fileLayoutBuilder.onItemAction(item);
    }
}