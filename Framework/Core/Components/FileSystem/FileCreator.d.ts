/// <reference types="core-js" />
import NodeCreator from '../../../Contracts/FileSystem/Nodes/NodeCreator';
export declare class FileCreator extends NodeCreator {
    create(_path: string): Promise<void>;
}
