import { IRegister } from "@/db/user-prisma";
import { NextRequest, NextResponse } from "next/server";
import userPrisma from "@/db/user-prisma";
import { hashPassword } from "@/lib/bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body as IRegister;

    if (!name || !email || !password) {
      return NextResponse.json("Missing fields", { status: 400 });
    }

    const isUser = await userPrisma.findByEmail(email);

    if (isUser === "User not found") {
      const hash = await hashPassword(password);
      const user = await userPrisma.register({
        name,
        email,
        password: hash,
      });
      return NextResponse.json(user, { status: 201 });
    }

    return NextResponse.json(isUser, { status: 400 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(`Internal server error: ${e}`, { status: 500 });
  }
}
