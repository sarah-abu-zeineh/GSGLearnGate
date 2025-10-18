import { db } from ".."
import {coursesTable} from "../schema"
import { eq } from "drizzle-orm"

export async function deleteCourse(id: number): Promise<void>{
    await  db.delete(coursesTable).where(eq(coursesTable.id, id))
}