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

class LinkedListNode {
  next: LinkedListNode | null;
  value: number | null;

  constructor(value: number | null, next: LinkedListNode | null = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  head: LinkedListNode | null;
  tail: LinkedListNode | null;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addFirst(value: number) {
    this.size++;
    const node = new LinkedListNode(value);

    if (!this.head) this.head = this.tail = node;

    node.next = this.head;
    this.head = node;
  }

  addLast(value: number) {
    this.size++;
    const node = new LinkedListNode(value);

    if (!this.tail) this.head = this.tail = node;

    this.tail.next = node;
    this.tail = node;
  }

  indexOf(value: number) {
    let first = this.head;
    let index = 0;

    while (first) {
      if (value === first.value) return index;
      index++;
      first = first.next;
    }

    return -1;
  }

  contains(value: number): boolean {
    return this.indexOf(value) !== -1;
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

    let first: LinkedListNode | null = this.head;

    while (first) {
      arr.push(first.value);
      first = first.next;
    }

    return arr;
  }

  reverse() {
    if (!this.head) return;

    let prev: LinkedListNode | null = null;
    let current: LinkedListNode | null = this.head;

    while (current) {
      let next: null | LinkedListNode = current.next;
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

    let first: null | LinkedListNode = this.head;

    while (curr.next) {
      first = first!.next;
      curr = curr.next;
    }

    return first;
  }

  printMiddle() {
    if (!this.head) return;

    let first: null | LinkedListNode = this.head;
    let second: null | LinkedListNode = this.head;

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

    let first: null | LinkedListNode = this.head;
    let second: null | LinkedListNode = this.head;

    while (second && second.next) {
      second = second.next.next;
      if (first.next) first = first.next;
      if (second === first) return true;
    }

    return false;
  }
}

class Stack {
  list: number[] | string[];
  size: number;

  constructor() {
    this.list = [];
    this.size = 0;
  }

  push(value: number | string) {
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

let stack = new MinStack();
stack.push(8);
stack.push(3);
stack.push(3);
stack.push(1);
stack.push(7);

console.log(stack.getMin);
