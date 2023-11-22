import BufferedReader from "./BufferedReader";
import Tile from "./Tile";

export default function loadMap(data: Buffer) {
  const map = new BufferedReader(data);

  const imageCount = map.readByte();
  const images: Record<string, string> = {};

  for (var i = 0; i < imageCount; i++) {
    const name = map.readString();
    const data = map.readString();
    images[name] = data;
  }

  const width = map.readByte();
  const height = map.readByte();
  const tiles = [];

  for (var y = 0; y < height; y++) {
    const row = [];
    for (var x = 0; x < width; x++) {
      row.push(new Tile(map.readByte(), map.readByte()));
    }
    tiles.push(row);
  }

  return { width, height, tiles, images };
}
