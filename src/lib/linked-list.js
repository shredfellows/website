
/** 
 * Constructor to create node for doubly linked list.
 */
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
/** 
 * Constructor to create the double linked list for the rotator.
 */
export default class DoublyLinkedList {
  constructor() {
    this.root = null;
  }

  static fromArray(arr) {
    let list = new DoublyLinkedList();
    let current = null;

    for (let i = 0; i < arr.length; i++) {
      let node = new Node(arr[i]);
      if (i === 0) {
        list.root = node;
        current = node;
      } else {
        current.next = node;
        node.prev = current;
        current = current.next;
      }
    }

    return list;
  }

  isEmpty() {
    return this.root === null;
  }

  size() {
    let count = 0;
    let current = this.root;
    while (current) {
      current = current.next;
      count++;
    }
    return count;
  }
/**
 * Add node to begining of linked list.
 */
  prepend(value) {
    let node = new Node(value);
    node.next = this.root;

    this.root.prev = node;
    this.root = node;
  }
/**
 * Add node to end of linked list.
 */
  append(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    let current = this.root;
    while (current.next) {
      current = current.next;
    }
    let node = new Node(value);
    node.prev = current;
    current.next = node;
  }


/**
 * Remove nodes in linked list.
 */
  removeHead() {
    let result = this.root;
    this.root = this.root.next;
    if (this.root && this.root.prev) {
      this.root.prev = null;
    }
    return result;
  }

  removeNextNode(current) {
    let result = current.next;
    current.next = current.next.next;

    if (current.next && current.next.prev) {

      current.next.prev = current;
    }
    return result;
  }
/**
 * Reverse linked list.
 */
  reverse() {
    if (this.isEmpty()) {
      return;
    }

    let current = this.root.next;
    let reversed = this.root;
    reversed.next = null;

    while (current) {
      let remaining = current.next;

      current.next = reversed;
      reversed.prev = current;
      reversed = current;

      current = remaining;
    }

    this.root = reversed;
    this.root.prev = null;
  }
/**
 * Find middle of linked list.
 */
  findMiddle(list) {
    let slow = this.root;
    let fast = this.root;
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }
/**
 * Find node in linked list.
 */
  findNth(n) {
    var i = 0;
    let current = this.root;

    while (current) {
      if (i === n) {
        return current;
      }
      i++;
      current = current.next;
    }
  }

  findNthFromLast(n) {
    let result = this.root;
    let offset = this.root;

    for (var i = 0; i < n; i++) {
      offset = offset.next;
    }

    while (offset.next) {
      result = result.next;
      offset = offset.next;
    }

    return result;
  }

  findLast() {
    let current = this.root;
    while (current.next) {
      current = current.next;
    }
    return current;
  }
}
