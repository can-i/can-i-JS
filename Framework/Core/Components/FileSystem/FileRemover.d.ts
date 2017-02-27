/// <reference types="core-js" />
import NodeRemover from '../../../Contracts/FileSystem/Nodes/NodeRemover';
export declare class FileRemover extends NodeRemover {
    delete(_path: string): Promise<void>;
}
