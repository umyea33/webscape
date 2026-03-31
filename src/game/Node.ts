export class Node {
  public id: string;
  public x: number;
  public y: number;
  public neighbors: Node[];

  constructor(id: string, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
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
