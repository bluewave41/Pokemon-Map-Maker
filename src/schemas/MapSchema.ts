import Tile from "@/lib/Tile";

export interface GameMap {
  width: number;
  height: number;
  tiles: Tile[][];
}
