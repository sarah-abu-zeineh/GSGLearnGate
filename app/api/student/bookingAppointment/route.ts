import { bookAppointment } from "@/src/db/queries/update";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { appointmentId, studentId } = body;

    const isBooked = await bookAppointment(appointmentId, studentId);

    if (isBooked) {
      return NextResponse.json(
        { message: "Appointment booked successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to book appointment" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
