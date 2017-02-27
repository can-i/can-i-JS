/// <reference types="core-js" />
import Node from '../../../Contracts/FileSystem/Nodes/Node';
import NodeCreator from '../../../Contracts/FileSystem/Nodes/NodeCreator';
import NodeRemover from '../../../Contracts/FileSystem/Nodes/NodeRemover';
export declare class FileNode extends Node {
    protected _path: string;
    constructor(_path: string, creator: NodeCreator, remover: NodeRemover);
    path: string;
    GetChildren(): Promise<FileNode[]>;
    static Create(_path: string): FileNode;
}
