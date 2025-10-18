"use server";
import { editUser } from "@/services/courses";
import { writeFile } from "@/utils/writeFile";

export type UserState =
  | { success: false; error: string; message: string }
  | { success: true; message: string; error?: undefined };

export async function submitUser(
  state: UserState,
  formData: FormData
): Promise<UserState> {
  try {
    const userId = formData.get("id") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const city = formData.get("city") as string;
    const dateOfBirth = new Date(formData.get("dateOfBirth") as string);
    const image = formData.get("image") as File | null;

    if (!firstName || !lastName || !email || !city || !dateOfBirth) {
      return {
        success: false,
        error: "Missing required fields",
        message: "Please provide all the required fields.",
      };
    }

    let publicFilePath: string = "";

    if (image) {
      publicFilePath = await writeFile(image);
    }

    await editUser(Number(userId), {
      id: Number(userId),
      firstName,
      lastName,
      email,
      dateOfBirth,
      image: publicFilePath,
      city,
    });

    return {
      success: true,
      message: "User updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
      message: "User update failed.",
    };
  }
}
