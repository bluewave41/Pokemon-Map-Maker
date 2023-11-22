export default class Tile {
  tileId: number;
  properties: number;

  constructor(tileId: number, properties: number) {
    this.tileId = tileId;
    this.properties = properties;
  }
}
