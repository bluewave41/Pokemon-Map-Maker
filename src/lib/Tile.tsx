interface Properties {
  impassable?: boolean;
}

export default class Tile {
  tileId: number;
  propertiesValue: number;
  properties: Properties;

  constructor(tileId: number, propertiesValue: number) {
    this.tileId = tileId;
    this.propertiesValue = propertiesValue;
    this.properties = this.handleProperties();
  }
  setProperties(mask: number) {
    this.propertiesValue = this.propertiesValue | mask;
    this.properties = this.handleProperties();
  }
  handleProperties() {
    const obj: Properties = {};
    if (this.propertiesValue & 1) {
      obj.impassable = true;
    }
    return obj;
  }
}
