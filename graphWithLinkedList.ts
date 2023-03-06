class GraphNode2 {
  label: string;
  edges: LinkedList<string>;

  constructor(label: string) {
    this.label = label;
    this.edges = new LinkedList();
  }
}

class GraphWithLinkedList {
  nodes: GraphNode2[];
  indexes: { [key: string]: number };
  size: number;

  constructor() {
    this.nodes = [];
    this.indexes = {};
    this.size = 0;
  }

  hasNode(label: string) {
    return this.indexes[label] >= 0;
  }

  addNode(label: string) {
    if (this.indexes[label]) throw new Error("Node already exists.");

    const node = new GraphNode2(label);

    this.nodes[this.size] = node;
    this.indexes[label] = this.size;
    this.size++;

    return this.nodes;
  }

  addEdge(from: string, to: string) {
    if (!this.hasNode(from) || !this.hasNode(to))
      throw new Error("Node doesn't exists");

    const fromNode = this.nodes[this.indexes[from]];

    if (!fromNode.edges.contains(to)) fromNode.edges.addLast(to);

    return fromNode;
  }

  removeEdge(from: string, to: string) {
    if (!this.hasNode(from) || !this.hasNode(to)) return;

    const index = this.indexes[from];
    const fromNode = this.nodes[index];

    fromNode.edges.remove(to);

    return this.nodes[index];
  }

  removeNode(label: string) {
    if (!this.hasNode(label)) return;

    const index = this.indexes[label];
    const node = this.nodes[index];

    this.nodes.splice(index, 1);
    this.size--;

    for (let node of this.nodes) node.edges.remove(label);

    return node;
  }

  print() {
    for (let node of this.nodes) {
      if (!node.edges.isEmpty())
        console.log(
          `${node.label} is connected to [${node.edges.toArray().toString()}]`
        );
    }
  }
}
