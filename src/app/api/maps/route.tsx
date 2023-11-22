import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const maps = await fs.readdir("public/maps");
  return NextResponse.json(maps);
}
