"use server";
import { Role } from "@/types";
import { addUser } from "@/services/users";
import bcrypt from "bcryptjs";
import { writeFile } from "@/utils/writeFile";

export type UserState =
  | { success: false; error: string; message: string; id: undefined }
  | { success: true; message: string; id: number; error?: undefined };

export async function submitUser(
  state: UserState,
  formData: FormData
): Promise<UserState> {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const city = formData.get("city") as string;
    const role = formData.get("role") as Role;
    const dateOfBirth = new Date(formData.get("dateOfBirth") as string);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !city ||
      !role ||
      !dateOfBirth
    ) {
      return {
        success: false,
        error: "Missing required fields",
        message: "Please provide all the required fields.",
        id: undefined,
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const image = formData.get("image") as File | null;
    let publicFilePath: string = "";

    if (image) {
      publicFilePath = await writeFile(image);
    }

    const newUser = await addUser(
      {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        dateOfBirth,
        image: publicFilePath,
        role,
        city,
      },
      role
    );

    return {
      success: true,
      message: "Course creation successful.",
      id: newUser.id,
    };
  } catch {
    return {
      success: false,
      error: "Something went wrong",
      message: "Course creation failed.",
      id: undefined,
    };
  }
}
