const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(data) {
     const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
    } else {
      this.addNode(this.rootNode, newNode);
    }
  }

  addNode(currentNode, newNode) {
    if (newNode.data < currentNode.data) {
      if (!currentNode.left) {
        currentNode.left = newNode;
      } else {
        this.addNode(currentNode.left, newNode);
      }
    } else if (newNode.data > currentNode.data) {
      if (!currentNode.right) {
        currentNode.right = newNode;
      } else {
        this.addNode(currentNode.right, newNode);
      }
    }
  }

  find(data) {
    return this.findNode(this.rootNode, data);
  }

  findNode(currentNode, data) {
    if (!currentNode) {
      return null;
    }

    if (data < currentNode.data) {
      return this.findNode(currentNode.left, data);
    } else if (data > currentNode.data) {
      return this.findNode(currentNode.right, data);
    } else {
      return currentNode;
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(currentNode, data) {
    if (!currentNode) {
      return null;
    }

    if (data < currentNode.data) {
      currentNode.left = this.removeNode(currentNode.left, data);
    } else if (data > currentNode.data) {
      currentNode.right = this.removeNode(currentNode.right, data);
    } else {
      if (!currentNode.left && !currentNode.right) {
        return null;
      } else if (!currentNode.left) {
        return currentNode.right;
      } else if (!currentNode.right) {
        return currentNode.left;
      } else {
        const minNode = this.findMinNode(currentNode.right);
        currentNode.data = minNode.data;
        currentNode.right = this.removeNode(currentNode.right, minNode.data);
      }
    }

    return currentNode;
  }

    findMinNode(node) {
    let currentNode = node;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode;
  }

  min() {
    return this.findMinNode(this.rootNode).data;
  }

  max() {
    let currentNode = this.rootNode;

    while (currentNode.right) {
      currentNode = currentNode.right;
    }

    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};