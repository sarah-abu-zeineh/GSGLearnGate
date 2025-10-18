"use server";

import { writeFile } from "@/utils/writeFile";

export async function submitStudentTaskFile(formData: FormData) {
  const file = formData.get("image") as File;
  const path = await writeFile(file);
}
