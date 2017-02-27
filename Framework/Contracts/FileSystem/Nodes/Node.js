"use strict";
var Node = (function () {
    function Node(creator, remover) {
        this.creator = creator;
        this.remover = remover;
        this.setParent();
        this.setCreator(creator);
        this.setRemover(remover);
    }
    /**
     * This will allow for the class that creates new nodes to be set
     */
    Node.prototype.setCreator = function (creator) {
        this.creator = creator;
    };
    /**
     * This allows the addition of the class that will be able to delete nodes
     */
    Node.prototype.setRemover = function (remover) {
        this.remover = remover;
    };
    /**
     * This will allow the parent to be set.
     */
    Node.prototype.setParent = function (node) {
        if (node === void 0) { node = null; }
        this.parent = node;
    };
    /**
     * This method is to retrieve the parent.
     */
    Node.prototype.getParent = function () {
        return this.parent;
    };
    /**
     * This will allow the creation of new child nodes
     */
    Node.prototype.CreateSubKey = function (information) {
        this.creator.create(information);
    };
    /**
     * This will allow the deletion of a subkey
     */
    Node.prototype.DeleteSubKey = function (information) {
        this.remover.delete(information);
    };
    ;
    return Node;
}());
exports.Node = Node;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Node;
//# sourceMappingURL=Node.js.map