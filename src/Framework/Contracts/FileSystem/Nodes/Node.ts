
import { NodeCreator } from './NodeCreator';
import { NodeRemover } from './NodeRemover';
export abstract class Node {

    private parent: Node | null;

    constructor(protected creator: NodeCreator, protected remover: NodeRemover) {
        this.setParent();
        this.setCreator(creator);
        this.setRemover(remover);
    }

    /**
     * This will allow for the class that creates new nodes to be set
     */
    setCreator(creator: NodeCreator) {
        this.creator = creator;
    }

    /**
     * This allows the addition of the class that will be able to delete nodes
     */
    setRemover(remover: NodeRemover) {
        this.remover = remover;
    }

    /**
     * This will allow the parent to be set.
     */
    setParent(node: Node | null = null) {
        this.parent = node;
    }

    /**
     * This method is to retrieve the parent.
     */
    getParent() {
        return this.parent;
    }

    /**
     * This gets the all the child node that the node has. 
     * If there is nothing there then it will return an empty array.
     */
    abstract GetChildren<T extends Node>(): Promise<T[]>;


    /**
     * This will allow the creation of new child nodes
     */
    CreateSubKey(information: any){
        this.creator.create(information);
    }

    /**
     * This will allow the deletion of a subkey
     */
    DeleteSubKey(information: any){
        this.remover.delete(information);
    };

    

}


export default Node;