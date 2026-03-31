import { Node } from './Node';

export class Graph {
  public nodes: Node[];
  public width: number;
  public height: number;

  constructor() {
    this.nodes = [];
    this.width = 0;
    this.height = 0;
  }

  addNode(id: string, x: number = 0, y: number = 0): Node {
    const existing = this.getNode(id);
    if (existing) {
      return existing;
    }
    const node = new Node(id, x, y);
    this.nodes.push(node);
    return node;
  }

  removeNode(id: string): void {
    const node = this.getNode(id);
    if (!node) return;

    for (const other of this.nodes) {
      other.removeNeighbor(node);
    }

    const index = this.nodes.indexOf(node);
    this.nodes.splice(index, 1);
  }

  getNode(id: string): Node | undefined {
    return this.nodes.find((node) => node.id === id);
  }

  addEdge(idA: string, idB: string): void {
    const nodeA = this.addNode(idA);
    const nodeB = this.addNode(idB);
    nodeA.addNeighbor(nodeB);
  }

  removeEdge(idA: string, idB: string): void {
    const nodeA = this.getNode(idA);
    const nodeB = this.getNode(idB);
    if (nodeA && nodeB) {
      nodeA.removeNeighbor(nodeB);
    }
  }
}
