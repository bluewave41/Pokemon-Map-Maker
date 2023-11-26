import Tile from "@/lib/Tile";
import { z } from "zod";

export interface GameMap {
  width: number;
  height: number;
  tiles: Tile[][];
  images: Record<string, string>;
}

export const gameMapSchema = z.object({
  width: z.number(),
  height: z.number(),
  tiles: z
    .object({
      tileId: z.number(),
      propertiesValue: z.number(),
      properties: z.object({
        impassable: z.boolean().optional(),
      }),
    })
    .array()
    .array(),
  images: z.any(),
});
