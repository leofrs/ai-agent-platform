import { NextResponse } from "next/server";
import meetingPrisma from "@/db/meeting-prisma";

export async function GET() {
  try {
    const res = await meetingPrisma.getAllAgents();

    if (!res) {
      return NextResponse.json({ message: "No meet found" }, { status: 404 });
    }

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
