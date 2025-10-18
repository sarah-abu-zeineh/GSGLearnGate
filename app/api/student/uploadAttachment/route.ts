import { writeFile } from "@/utils/writeFile";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  try {
    const url = await writeFile(file);
    return NextResponse.json({ url }, { status: 200 });
  } catch (err) {
    console.error("File upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
