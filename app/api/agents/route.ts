import { NextResponse } from "next/server";
import agentsPrisma from "@/db/agents-prisma";

export async function GET() {
  try {
    const res = await agentsPrisma.getAllAgents();

    if (!res) {
      return NextResponse.json({ message: "No agents found" }, { status: 404 });
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
