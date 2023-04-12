const { NotImplementedError } = require('../extensions/index.js');

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
      return;
    }

    let currentNode = this.rootNode;
    while (currentNode) {
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          break;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          break;
        }
        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data, node = this.rootNode) {
    if (!node) {
      return null;
    }

    if (data === node.data) {
      return node;
    }

    if (data < node.data) {
      return this.find(data, node.left);
    } else {
      return this.find(data, node.right);
    }
  }

  remove(data) {
    this.rootNode = this._remove(data, this.rootNode);
  }

  _remove(data, node) {
    if (!node) {
      return null;
    }

    if (data < node.data) {
      node.left = this._remove(data, node.left);
      return node;
    }

    if (data > node.data) {
      node.right = this._remove(data, node.right);
      return node;
    }

    if (!node.left && !node.right) {
      return null;
    }

    if (!node.left) {
      return node.right;
    }

    if (!node.right) {
      return node.left;
    }

    const minRight = this._min(node.right);
    node.data = minRight.data;
    node.right = this._remove(minRight.data, node.right);
    return node;
  }

  min() {
    const minNode = this._min(this.rootNode);
    return minNode ? minNode.data : null;
  }

  _min(node) {
    while (node && node.left) {
      node = node.left;
    }
    return node;
  }

  max() {
    const maxNode = this._max(this.rootNode);
    return maxNode ? maxNode.data : null;
  }

  _max(node) {
    while (node && node.right) {
      node = node.right;
    }
    return node;
  }
}


module.exports = {
  BinarySearchTree
};