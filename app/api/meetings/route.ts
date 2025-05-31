import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma-config";

export async function GET() {
  try {
    const res = await prisma.meetings.findMany();

    if (!res) {
      return NextResponse.json(
        {
          message: "Meetings not found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
