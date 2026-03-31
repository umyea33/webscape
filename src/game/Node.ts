export class Node {
  public id: string;
  public neighbors: Node[];

  constructor(id: string) {
    this.id = id;
    this.neighbors = [];
  }

  addNeighbor(node: Node): void {
    if (!this.neighbors.includes(node)) {
      this.neighbors.push(node);
    }
  }

  removeNeighbor(node: Node): void {
    const index = this.neighbors.indexOf(node);
    if (index !== -1) {
      this.neighbors.splice(index, 1);
    }
  }
}
