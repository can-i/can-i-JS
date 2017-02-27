/// <reference types="core-js" />
import { NodeCreator } from './NodeCreator';
import { NodeRemover } from './NodeRemover';
export declare abstract class Node {
    protected creator: NodeCreator;
    protected remover: NodeRemover;
    private parent;
    constructor(creator: NodeCreator, remover: NodeRemover);
    /**
     * This will allow for the class that creates new nodes to be set
     */
    setCreator(creator: NodeCreator): void;
    /**
     * This allows the addition of the class that will be able to delete nodes
     */
    setRemover(remover: NodeRemover): void;
    /**
     * This will allow the parent to be set.
     */
    setParent(node?: Node | null): void;
    /**
     * This method is to retrieve the parent.
     */
    getParent(): Node | null;
    /**
     * This gets the all the child node that the node has.
     * If there is nothing there then it will return an empty array.
     */
    abstract GetChildren<T extends Node>(): Promise<T[]>;
    /**
     * This will allow the creation of new child nodes
     */
    CreateSubKey(information: any): void;
    /**
     * This will allow the deletion of a subkey
     */
    DeleteSubKey(information: any): void;
}
export default Node;
