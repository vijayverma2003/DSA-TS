export default class MyArray {
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
