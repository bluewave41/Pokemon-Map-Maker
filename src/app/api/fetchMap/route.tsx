import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import { z } from "zod";

const mapSchema = z.object({
  name: z.string(),
});

export async function POST(request: Request) {
  const result = await mapSchema.safeParseAsync(await request.json());
  if (!result.success) {
    return NextResponse.json(
      { status: "error", reason: "Invalid body provided." },
      { status: 400 }
    );
  }

  const { data } = result;
  const map = await fs.readFile(
    `public/maps/${data.name}/main/map.bytes`,
    "binary"
  );
  return new NextResponse(map);
}
