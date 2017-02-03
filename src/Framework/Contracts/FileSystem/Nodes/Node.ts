import NodeCreator from './NodeCreator';
import NodeRemover from './NodeRemover';



export namespace Framework.Contracts.FileSystem.Nodes {
    export abstract class Node {

        private parent: Node | null;

        constructor(protected creator: NodeCreator, protected remover: NodeRemover) {
            this.setParent(null);
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
        setParent(node: Node) {
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
        abstract GetChildren(): Promise<Node[]>;


        /**
         * This will allow the creation of new child nodes
         */
        abstract CreateSubKey(information: any): Promise<boolean>;

        /**
         * This will allow the deletion of a subkey
         */
        abstract DeleteSubKey(information: any): Promise<boolean>;

    }

}


export default Framework.Contracts.FileSystem.Nodes.Node;