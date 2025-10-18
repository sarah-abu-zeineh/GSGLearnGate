import { randomUUID } from "crypto";
import path from "path";
import { promises as fs } from "fs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function writeFile(file: File) {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const filePath = path.join(
    UPLOAD_DIR,
    `${randomUUID()}${path.extname(file.name)}`
  );
  await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
  return `/uploads/${path.basename(filePath)}`;
}
