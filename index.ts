// tsc && node dist/index.js

class MyArray {
  list: number[];
  private length: number;

  constructor() {
    this.list = [];
    this.length = 0;
  }

  insert(value: number): number[] {
    this.list[this.length] = value;
    this.length++;
    return this.list;
  }

  indexOf(value: number): number {
    for (let i = 0; i < this.list.length; i++)
      if (this.list[i] === value) return i;

    return -1;
  }

  removeAt(index: number): number[] {
    if (index < 0 || index >= this.length) throw new Error("Illegal Argument!");

    for (let i = index; i < this.length; i++) this.list[i] = this.list[i + 1];

    this.list.length--;
    this.length--;

    return this.list;
  }

  max(): number {
    let max = this.list[0];
    for (let item of this.list) if (item > max) max = item;
    return max;
  }

  intersect(list: number[]): number[] {
    const intersect = new MyArray();
    for (let item of list) if (this.list[item]) intersect.insert(item);

    return intersect.list;
  }

  reverse() {
    let reversed = new MyArray();

    for (let i = this.length - 1; i >= 0; i--) reversed.insert(this.list[i]);

    return reversed.list;
  }

  insertAt(index: number, value: number): number[] {
    for (let i = this.length; i > index; i--) this.list[i] = this.list[i - 1];
    this.list[index] = value;
    this.length++;

    return this.list;
  }

  print(): void {
    for (let num of this.list) console.log(num);
  }
}

class LinkedListNode<V> {
  next: LinkedListNode<V> | null;
  value: V | null;

  constructor(value: V | null, next: LinkedListNode<V> | null = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList<V> {
  head: LinkedListNode<V> | null;
  tail: LinkedListNode<V> | null;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.head === null;
  }

  addFirst(value: V) {
    this.size++;
    const node = new LinkedListNode<V>(value);

    if (!this.head) this.head = this.tail = node;

    node.next = this.head;
    this.head = node;
  }

  addLast(value: V) {
    this.size++;
    const node = new LinkedListNode<V>(value);

    if (!this.tail) {
      this.head = node;
      this.tail = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  indexOf(value: V) {
    let curr = this.head;
    let index = 0;

    while (curr) {
      if (value === curr.value) return index;
      index++;
      curr = curr.next;
    }

    return -1;
  }

  contains(value: V): boolean {
    return this.indexOf(value) !== -1;
  }

  remove(value: V) {
    if (!this.head) return;

    let curr: LinkedListNode<V> | null = this.head; // pawan
    let last = null; // null

    while (curr) {
      console.log(curr.value);
      if (curr && curr.value === value) {
        if (curr === this.head) this.head = curr.next;
        if (curr === this.tail) this.tail = last;
        if (last) last.next = curr.next;
        this.size--;
        return;
      }
      last = curr;
      curr = curr.next;
    }

    return;
  }

  removeFirst() {
    if (!this.head) throw new Error("List is empty");
    this.size--;

    if (this.head === this.tail) {
      this.head = this.tail = null;
      return;
    }

    const headNext = this.head.next;
    this.head.next = null;
    this.head = headNext;
  }

  removeLast() {
    if (!this.head) return;
    this.size--;

    if (this.head === this.tail) {
      this.head = this.tail = null;
      return;
    }

    let first = this.head;

    while (first) {
      if (first.next && first.next === this.tail) first = first.next;
      else break;
    }

    first.next = null;
    this.tail = first;
  }

  toArray() {
    if (!this.head) throw new Error("Linked list is empty!");

    const arr = [];

    let first: LinkedListNode<V> | null = this.head;

    while (first) {
      arr.push(first.value);
      if (first.next) first = first.next;
      else break;
    }

    return arr;
  }

  reverse() {
    if (!this.head) return;

    let prev: LinkedListNode<V> | null = null;
    let current: LinkedListNode<V> | null = this.head;

    while (current) {
      let next: null | LinkedListNode<V> = current.next;
      current.next = prev;
      prev = current;

      current = next;
    }

    this.tail = this.head;
    this.tail.next = null;

    this.head = prev;
  }

  kthNodeFromEnd(k: number) {
    if (!this.head) return;

    let distance = k - 1;

    let curr = this.head;

    while (distance) {
      distance--;
      if (curr.next) curr = curr.next;
      else return;
    }

    let first: null | LinkedListNode<V> = this.head;

    while (curr.next) {
      first = first!.next;
      curr = curr.next;
    }

    return first;
  }

  printMiddle() {
    if (!this.head) return;

    let first: null | LinkedListNode<V> = this.head;
    let second: null | LinkedListNode<V> = this.head;

    while (
      second &&
      second.next &&
      second !== this.tail &&
      second.next !== this.tail
    ) {
      second = second.next.next;
      if (first.next) first = first.next;
    }

    if (second === this.tail) return [first.value];
    else if (first.next) return [first.value, first.next.value];
    else return null;
  }

  hasLoop() {
    if (!this.head) return;

    let first: null | LinkedListNode<V> = this.head;
    let second: null | LinkedListNode<V> = this.head;

    while (second && second.next) {
      second = second.next.next;
      if (first.next) first = first.next;
      if (second === first) return true;
    }

    return false;
  }
}

class Stack<T> {
  list: number[] | string[] | T[];
  size: number;

  constructor() {
    this.list = [];
    this.size = 0;
  }

  push(value: number | string | T) {
    this.list[this.size++] = value;
  }

  pop() {
    let last = this.peek;

    this.list.length--;
    this.size--;

    return last;
  }

  get peek() {
    return this.list[this.size - 1];
  }

  get empty() {
    return this.size === 0;
  }
}

function reverseString(str: string): string {
  let stack = new Stack();

  for (let letter of str) stack.push(letter);

  let reverse = "";

  while (!stack.empty) {
    reverse += stack.pop();
  }

  return reverse;
}

function balanceExpressions(str: string) {
  const left = ["(", "[", "{", "<"];
  const right = [")", "]", "}", ">"];

  let stack = new Stack();

  for (let letter of str) {
    if (left.includes(letter)) stack.push(letter);

    if (right.includes(letter)) {
      let popped = stack.pop() as string;
      if (right.indexOf(letter) === left.indexOf(popped)) continue;
      else return false;
    }
  }

  return stack.empty;
}

class MinStack {
  list: number[];
  size: number;
  min: number[];

  constructor() {
    this.list = [];
    this.min = [];
    this.size = 0;
  }

  push(value: number) {
    this.list[this.size++] = value;
    if (this.min.length === 0 || this.min[this.min.length - 1] > value)
      this.min.push(value);
  }

  pop() {
    let last = this.peek;

    this.list.length--;
    this.size--;

    if (last === this.min[this.min.length]) this.min.length--;

    return last;
  }

  get peek() {
    return this.list[this.size - 1];
  }

  get empty() {
    return this.size === 0;
  }

  get getMin() {
    return this.min[this.min.length - 1];
  }
}

class Queue<T = number> {
  list: T[];

  constructor() {
    this.list = [];
  }

  enqueue(value: T) {
    this.list.push(value);
  }

  dequeue(): T {
    let first = this.list[0];

    for (let i = 0; i < this.list.length; i++) {
      this.list[i] = this.list[i + 1];
    }

    this.list.length--;

    return first;
  }

  get peek() {
    return this.list[0];
  }

  get empty() {
    return this.list.length === 0;
  }

  reverse() {
    let stack = new Stack();

    for (let item of this.list) stack.push(item);

    let reversed = new Queue();

    while (!stack.empty) reversed.enqueue(stack.pop() as number);

    return reversed;
  }
}

class PriorityQueue<T> {
  list: T[];

  constructor() {
    this.list = [];
  }

  enqueue(value: T) {
    if (this.list.length === 0) {
      this.list.push(value);
      return;
    }

    for (let i = this.list.length - 1; i >= 0; i--) {
      if (value < this.list[i]) this.list[i + 1] = this.list[i];
      else {
        this.list[i + 1] = value;
        break;
      }
    }
  }
}

function findFirstNonRepeatableCharacter(str: string) {
  str = str.toLowerCase();

  let frequency: {
    [key: string]: number;
  } = {};

  for (let letter of str)
    frequency[letter] = frequency[letter] ? frequency[letter] + 1 : 1;

  for (let key in frequency) if (frequency[key] === 1) return key;

  return null;
}

function findFirstRepeatedCharacter(str: string) {
  str = str.toLowerCase();

  const set = new Set();

  for (let letter of str) {
    if (set.has(letter)) return letter;
    set.add(letter);
  }

  return null;
}

class KeyValuePair {
  constructor(public key: number, public value: string) {}
}

class HashTable {
  list: LinkedList<KeyValuePair>[];
  size: number;

  constructor(size: number) {
    this.list = [];
    this.size = size;
  }

  private getIndex(key: number) {
    return key < this.size ? key : key % this.size;
  }

  put(key: number, value: string) {
    let index = this.getIndex(key);

    let pair = new KeyValuePair(key, value);

    if (!this.list[index]) this.list[index] = new LinkedList();

    this.list[index].addLast(pair);
    return this.list;
  }

  get(key: number) {
    let index = this.getIndex(key);

    let ll = this.list[index];
    if (!ll) return undefined;

    let curr = ll.head;

    while (curr) {
      if (curr.value?.key === key) return curr.value;
      curr = curr.next;
    }

    return undefined;
  }

  remove(key: number) {
    let index = this.getIndex(key);

    let ll = this.list[index];
    if (!ll) return undefined;

    let pair = this.get(key);
    if (pair) ll.remove(pair);

    return pair;
  }
}

class BTNode {
  left: BTNode | null;
  right: BTNode | null;

  constructor(public value: number) {
    this.left = null;
    this.right = null;
  }

  toString() {
    return `Node ${this.value}`;
  }
}

class BinaryTree {
  root: BTNode | null;

  constructor() {
    this.root = null;
  }

  insert(value: number) {
    const node = new BTNode(value);

    if (!this.root) {
      this.root = node;
      return;
    }

    let current: BTNode | null = this.root;

    while (true) {
      if (current.value > value) {
        if (current.left === null) {
          current.left = node;
          break;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = node;
          break;
        }
        current = current.right;
      }
    }

    return this.root;
  }

  find(value: number) {
    let current = this.root;

    while (current) {
      if (value === current.value) return true;

      if (value < current.value) current = current.left;
      else current = current.right;
    }

    return false;
  }

  private _traversePreOrder(root: BTNode | null) {
    if (!root) return;

    console.log(root.value);
    this._traversePreOrder(root.left);
    this._traversePreOrder(root.right);
  }

  traversePreOrder() {
    this._traversePreOrder(this.root);
  }

  private _traverseInOrder(root: BTNode | null) {
    if (!root) return;

    this._traverseInOrder(root.left);
    console.log(root.value);
    this._traverseInOrder(root.right);
  }

  traverseInOrder() {
    this._traverseInOrder(this.root);
  }

  private _traversePostOrder(root: BTNode | null) {
    if (!root) return;

    this._traversePostOrder(root.left);
    this._traversePostOrder(root.right);
    console.log(root.value);
  }

  traversePostOrder() {
    this._traversePostOrder(this.root);
  }

  private _height(root: BTNode | null): number {
    if (!root) return -1;

    return 1 + Math.max(this._height(root.left), this._height(root.right));
  }

  height() {
    return this._height(this.root);
  }

  private _min(root: BTNode | null) {
    if (!root) return 0;

    if (!root.left && !root.right) return root.value;

    let left: number = this._min(root.left);
    let right: number = this._min(root.right);

    return Math.min(Math.min(left, right), root.value);
  }

  min() {
    return this._min(this.root);
  }

  private _equals(current: BTNode | null, root: BTNode | null): boolean {
    if (!root && !current) return true;

    if (current && root)
      return (
        root.value === current.value &&
        this._equals(current.left, root.left) &&
        this._equals(current.right, root.right)
      );

    return false;
  }

  equals(tree: BinaryTree) {
    return this._equals(this.root, tree.root);
  }

  private _validate(root: BTNode | null, min: number, max: number): boolean {
    if (!root) return true;

    return (
      root.value > min &&
      root.value < max &&
      this._validate(root.left, min, root.value) &&
      this._validate(root.right, root.value, max)
    );
  }

  validate() {
    return this._validate(this.root, Number.MIN_VALUE, Number.MAX_VALUE);
  }

  private _nodesAtKthDistance(root: BTNode | null, k: number, arr: number[]) {
    if (!root) return;

    if (k === 0) return arr.push(root.value);

    this._nodesAtKthDistance(root.left, k - 1, arr);
    this._nodesAtKthDistance(root.right, k - 1, arr);
  }

  nodesAtKthDistance(k: number) {
    let arr: number[] = [];
    this._nodesAtKthDistance(this.root, k, arr);
    return arr;
  }

  traverseLevelOrder() {
    for (let i = 0; i <= this.height(); i++) {
      console.log(this.nodesAtKthDistance(i).toString());
    }
  }
}

class AVLNode {
  value: number;
  left: AVLNode | null;
  right: AVLNode | null;
  height: number;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 0;
  }
}

class AVLTree {
  root: AVLNode | null;

  constructor() {
    this.root = null;
  }

  private height(node: AVLNode | null) {
    return node ? node.height : -1;
  }

  private setHeight(node: AVLNode) {
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  private balanceFactor(node: AVLNode | null) {
    return node ? this.height(node.left) - this.height(node.right) : 0;
  }

  private isLeftHeavy(node: AVLNode) {
    return this.balanceFactor(node) > 1;
  }

  private isRightHeavy(node: AVLNode) {
    return this.balanceFactor(node) < -1;
  }

  private leftRotate(node: AVLNode) {
    let newRoot = node.right;
    node.right = newRoot!.left;
    newRoot!.left = node;

    newRoot!.height = this.setHeight(newRoot as AVLNode);
    node.height = this.setHeight(node);

    return newRoot;
  }

  private rightRotate(node: AVLNode) {
    let newRoot = node.left;
    node.left = newRoot!.right;
    newRoot!.right = node;

    newRoot!.height = this.setHeight(newRoot as AVLNode);
    node.height = this.setHeight(node);

    return newRoot;
  }

  private balance(node: AVLNode) {
    if (this.isLeftHeavy(node)) {
      if (node.left && this.balanceFactor(node.left) < 0)
        node.left = this.leftRotate(node.left);

      node = this.rightRotate(node) as AVLNode;
    } else if (this.isRightHeavy(node)) {
      if (node.right && this.balanceFactor(node.right) > 0)
        node.right = this.rightRotate(node.right);

      node = this.leftRotate(node) as AVLNode;
    }

    return node;
  }

  private _insert(root: AVLNode | null, value: number): AVLNode {
    if (!root) {
      return new AVLNode(value);
    }

    if (value < root.value) root.left = this._insert(root.left, value);
    else root.right = this._insert(root.right, value);

    root.height = this.setHeight(root);

    root = this.balance(root) as AVLNode;

    return root;
  }

  insert(value: number) {
    this.root = this._insert(this.root, value);
  }
}

// Heaps are used in sorting and graph algorithms. In heap every level except potentially the last level in filled with nodes.
// In heap the nodes are filled from left to right and the value of the parent node is always greater than its children this is called
// heap property.

// Heap is a completed binary tree which satisfies the heap property.
// Max Heap's root holds the maximum value, and other is min heap.

class Heap {
  list: number[];

  constructor() {
    this.list = [];
  }

  get isEmpty() {
    return this.list.length === 0;
  }

  private getParent(index: number) {
    return Math.floor((index - 1) / 2);
  }

  private leftChildIndex(index: number) {
    return index * 2 + 1;
  }

  private rightChildIndex(index: number) {
    return index * 2 + 2;
  }

  private getLeftChild(index: number) {
    return this.list[this.leftChildIndex(index)];
  }

  private getRightChild(index: number) {
    return this.list[this.rightChildIndex(index)];
  }

  private hasLeftChild(index: number) {
    return this.leftChildIndex(index) < this.list.length;
  }

  private hasRightChild(index: number) {
    return this.rightChildIndex(index) < this.list.length;
  }

  private swap(a: number, b: number) {
    let temp = this.list[a];
    this.list[a] = this.list[b];
    this.list[b] = temp;
  }

  private bubbleUp(index: number = this.list.length - 1) {
    let value = this.list[index];
    let parent = this.getParent(index);

    while (parent >= 0 && this.list[parent] < value) {
      this.swap(parent, index);
      index = parent;
      parent = this.getParent(parent);
    }

    return this.list;
  }

  private largerChildIndex(index: number) {
    if (!this.hasLeftChild) return index;

    if (!this.hasRightChild) return this.leftChildIndex(index);

    return this.getLeftChild(index) >= this.getRightChild(index)
      ? this.leftChildIndex(index)
      : this.rightChildIndex(index);
  }

  private bubbleDown(index: number = 0) {
    let maximum = this.largerChildIndex(index);

    while (index < this.list.length) {
      if (this.list[index] < this.list[maximum]) {
        this.swap(index, maximum);
        index = maximum;
        continue;
      }

      break;
    }

    return this.list;
  }

  insert(value: number) {
    this.list.push(value);
    return this.bubbleUp();
  }

  remove() {
    const root = this.list[0];
    this.list[0] = this.list[this.list.length - 1];
    this.list.length--;
    this.bubbleDown();
    return root;
  }
}

// Tries

// Tries name came from Retrievals, They are also called, Digital, Radix, Prefix trees

class TrieNode {
  value: string | null;
  children: { [key: string]: TrieNode };
  isEndOfWord: boolean;

  constructor(value: string | null) {
    this.value = value;
    this.children = {};
    this.isEndOfWord = false;
  }

  hasChild(ch: string) {
    return this.children.hasOwnProperty(ch);
  }

  getChild(ch: string) {
    return this.children[ch];
  }

  addChild(ch: string) {
    this.children[ch] = new TrieNode(ch);
  }

  getChildren() {
    let nodes = [];
    for (let ch in this.children) nodes.push(this.children[ch]);

    return nodes;
  }

  hasChildren() {
    return this.getChildren().length !== 0;
  }

  removeChild(ch: string) {
    delete this.children[ch];
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode(null);
  }

  insert(word: string) {
    if (!word || typeof word !== "string")
      throw new Error("Enter a valid string!");

    let current = this.root;

    for (let ch of word) {
      if (!current.hasChild(ch)) current.addChild(ch);
      current = current.getChild(ch);
    }

    current.isEndOfWord = true;

    return this.root;
  }

  contains(word: string) {
    if (!word || typeof word !== "string") return false;

    let current = this.root;

    for (let ch of word) {
      if (current.hasChild(ch)) current = current.getChild(ch);
      else return false;
    }

    return current.isEndOfWord;
  }

  private _remove(node: TrieNode, word: string, index: number = 0) {
    if (index === word.length) {
      node.isEndOfWord = false;
      return;
    }

    const ch = word[index];

    let child = node.getChild(ch);

    if (!child) return;

    this._remove(child, word, ++index);

    node.isEndOfWord = false;

    if (!child.hasChildren() && !node.isEndOfWord) node.removeChild(ch);
  }

  remove(word: string) {
    if (!word || typeof word !== "string") return;
    this._remove(this.root, word);
  }

  autoComplete(word: string) {
    if (!word || typeof word !== "string") return;

    let current = this.root;
    for (let ch of word)
      if (current.hasChild(ch)) current = current.getChild(ch);

    const words: string[] = [];

    this._autoComplete(current, word, words);
    return words;
  }

  private _autoComplete(root: TrieNode, word: string, words: string[]) {
    if (root.isEndOfWord) words.push(word);

    for (let child of root.getChildren())
      this._autoComplete(child, word + child.value, words);

    return;
  }
}

// We use graphs to represent connected objects, like routers in network, and people in social media system.
// Using graphs we can see these connections and check how strong these connections are.

class GraphNode {
  label: string;

  constructor(label: string) {
    this.label = label;
  }
}

class Graph {
  nodes: { [key: string]: GraphNode };
  adjacencyList: { [key: string]: string[] };
  size: number;

  constructor() {
    this.nodes = {};
    this.adjacencyList = {};
    this.size = 0;
  }

  addNode(label: string) {
    if (this.nodes[label]) throw new Error("Node already exists.");

    const node = new GraphNode(label);

    this.nodes[label] = node;
    this.adjacencyList[label] = [];
    this.size++;

    return this.nodes;
  }

  addEdge(from: string, to: string) {
    if (!this.nodes[from] || !this.nodes[to])
      throw new Error("Node doesn't exists");

    this.adjacencyList[from].push(to);
  }

  removeEdge(from: string, to: string) {
    if (!this.nodes[from] || !this.nodes[to]) return;

    this.adjacencyList[from].splice(this.adjacencyList[from].indexOf(to), 1);

    return this.nodes[from];
  }

  removeNode(label: string) {
    if (!this.nodes[label]) return;

    delete this.nodes[label];
    this.size--;

    for (let node in this.adjacencyList) {
      let index = this.adjacencyList[node].indexOf(label);
      this.adjacencyList[node].splice(index, 1);
    }
  }

  print() {
    for (let label in this.nodes) {
      const node = this.nodes[label];
      if (this.adjacencyList[label].length > 0)
        console.log(
          `${node.label} is connected to [${this.adjacencyList[
            label
          ].toString()}]`
        );
    }
  }

  private _depthFirstRecursive(node: string, visited: Set<string>) {
    console.log(node);
    visited.add(node);

    for (let neighbour of this.adjacencyList[node])
      if (!visited.has(node)) this._depthFirstRecursive(neighbour, visited);
  }

  depthFirstRecursive(node: string) {
    const root = this.nodes[node];
    if (!root) return;

    this._depthFirstRecursive(node, new Set<string>());
  }

  depthFirstIterative(root: string) {
    const node = this.nodes[root];
    if (!node) return;

    const visited = new Set();
    const stack = new Stack<string>();

    stack.push(root);

    while (!stack.empty) {
      const current = stack.pop();

      if (visited.has(current)) continue;

      console.log(current);
      visited.add(current);

      for (let neighbour of this.adjacencyList[current as string])
        if (!visited.has(neighbour)) stack.push(neighbour);
    }
  }

  breadthFirstTraversal(root: string) {
    const node = this.nodes[root];
    if (!node) return;

    const visited = new Set();
    const queue = new Queue<string>();

    queue.enqueue(root);

    while (!queue.empty) {
      const current: string = queue.dequeue();

      if (visited.has(current)) continue;

      console.log(current);
      visited.add(current);

      for (let neighbour of this.adjacencyList[current as string])
        if (!visited.has(neighbour)) queue.enqueue(neighbour);
    }
  }

  topologicalSort(start: string) {
    if (!this.nodes[start]) return;

    const stack = new Stack<string>();

    this._topologicalSort(start, stack, new Set());

    const sorted: string[] = [];

    while (!stack.empty) sorted.push(stack.pop() as string);

    return sorted;
  }

  private _topologicalSort(
    start: string,
    stack: Stack<string>,
    visited: Set<string>
  ) {
    if (visited.has(start)) return;

    visited.add(start);

    for (let neighbour of this.adjacencyList[start as string])
      this._topologicalSort(neighbour, stack, visited);

    stack.push(start);
  }

  hasCycle() {
    const all = new Set<string>();

    for (let node in this.nodes) all.add(node);

    const visiting = new Set<string>();

    const visited = new Set<string>();

    while (all.size !== 0) {
      let current = all.keys().next().value;

      if (this._hasCycle(current, all, visiting, visited)) return true;
    }

    return false;
  }

  private _hasCycle(
    node: string,
    all: Set<string>,
    visiting: Set<string>,
    visited: Set<string>
  ) {
    all.delete(node);
    visiting.add(node);

    for (let neighbour of this.adjacencyList[node as string]) {
      if (visited.has(neighbour)) continue;

      if (visiting.has(neighbour)) return true;

      if (this._hasCycle(neighbour, all, visiting, visited)) return true;
    }

    visiting.delete(node);
    visited.add(node);

    return false;
  }
}

class WeightedGraphNode {
  edges: WeightedGraphEdge[];

  constructor(public value: string) {
    this.edges = [];
  }

  addEdge(to: WeightedGraphNode, weight: number) {
    this.edges.push(new WeightedGraphEdge(this, to, weight));
  }

  getEdges() {
    return this.edges;
  }
}

class WeightedGraphEdge {
  constructor(
    public from: WeightedGraphNode,
    public to: WeightedGraphNode,
    public weight: number
  ) {}

  toString() {
    return `${this.from.value} -${this.weight}-> ${this.to.value}`;
  }
}

class NodeEntry {
  constructor(public node: WeightedGraphNode, public priority: number) {}
}

class PriorityQueueForNodeEntry {
  list: NodeEntry[];

  constructor() {
    this.list = [];
  }

  enqueue(value: NodeEntry) {
    this.list.push(value);

    this.list.sort((a, b) => {
      if (a.priority > b.priority) return 1;
      else if (a.priority < b.priority) return -1;
      else return 0;
    });
  }

  dequeue() {
    const first = this.list[0];
    this.list.splice(0, 1);
    return first;
  }

  get empty() {
    return this.list.length === 0;
  }

  get peek() {
    return this.list[0];
  }
}

class WeightedGraph<T = string> {
  nodes: { [key: string]: WeightedGraphNode };

  constructor() {
    this.nodes = {};
  }

  addNode(value: string) {
    if (!value) throw new Error("Value should be of type string");

    const node = new WeightedGraphNode(value);
    if (!this.nodes[value]) this.nodes[value] = node;

    return node;
  }

  addEdge(from: string, to: string, weight: number = 0) {
    const fromNode = this.nodes[from];
    if (!fromNode) throw new Error("From node doesn't exists");

    const toNode = this.nodes[to];
    if (!toNode) throw new Error("To node doesn't exists");

    fromNode.addEdge(toNode, weight);
    toNode.addEdge(fromNode, weight);
  }

  print() {
    for (let node in this.nodes) {
      for (let neighbour of this.nodes[node].getEdges())
        console.log(neighbour.toString());
    }
  }

  shortestPath(from: string, to: string) {
    const fromNode = this.nodes[from];
    const toNode = this.nodes[to];

    if (!fromNode || !toNode) return null;

    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string } = {};
    const visited = new Set();

    for (let node in this.nodes) distances[node] = Number.MAX_VALUE;
    distances[from] = 0;

    const queue = new PriorityQueueForNodeEntry();
    queue.enqueue(new NodeEntry(fromNode, 0));

    while (!queue.empty) {
      let nodeEntry = queue.dequeue();

      for (let node of nodeEntry.node.getEdges()) {
        if (visited.has(node.to.value)) continue;

        let distance = node.weight + distances[nodeEntry.node.value];

        if (distances[node.to.value] > distance) {
          previous[node.to.value] = nodeEntry.node.value;
          distances[node.to.value] = distance;
        }

        queue.enqueue(new NodeEntry(node.to, distances[node.to.value]));
      }

      visited.add(nodeEntry.node.value);
    }

    const stack = new Stack();

    let current = to;
    while (current) {
      stack.push(current);
      current = previous[current];
    }

    const path = [];

    while (!stack.empty) path.push(stack.pop());

    return path.join("");
  }
}

const graph = new WeightedGraph();

graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");

graph.addEdge("A", "B", 3);
graph.addEdge("A", "C", 4);
graph.addEdge("A", "D", 2);
graph.addEdge("B", "D", 6);
graph.addEdge("B", "E", 1);
graph.addEdge("D", "E", 5);
graph.addEdge("D", "C", 1);
