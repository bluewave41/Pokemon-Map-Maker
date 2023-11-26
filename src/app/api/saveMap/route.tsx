import { gameMapSchema } from "@/schemas/gameMapSchema";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import BufferedWriter from "@/lib/BufferedWriter";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await gameMapSchema.safeParseAsync(body.map);
  if (!result.success) {
    return NextResponse.json(
      { status: "error", reason: "Invalid body provided." },
      { status: 400 }
    );
  }

  const { width, height, tiles, images } = result.data;

  const writer = new BufferedWriter();
  writer.writeByte(Object.keys(images).length);

  for (const image in images) {
    writer.writeString(image);
    writer.writeString(images[image]);
  }

  writer.writeByte(width);
  writer.writeByte(height);

  for (const row of tiles) {
    for (const tile of row) {
      writer.writeByte(tile.tileId);
      writer.writeByte(tile.propertiesValue);
    }
  }

  fs.writeFile("./public/map.bytes", writer.getBuffer());

  return new NextResponse();
}
