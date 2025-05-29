import { generateToken } from "@/lib/jwt";
import { serialize } from "cookie";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";

interface IData {
  email: string;
  password: string;
}

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as IData;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios" },
        { status: 401 }
      );
    }

    const isUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, password: true, userRole: true },
    });

    if (!isUser) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, isUser.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Senha incorreta" }, { status: 401 });
    }

    const user = {
      id: isUser.id,
      name: isUser.name,
      userRole: isUser.userRole,
    };

    const token = await generateToken({ user });

    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hora
    });

    const response = NextResponse.json(
      { message: "Usuário logado com sucesso" },
      { status: 201 }
    );
    response.headers.set("Set-Cookie", cookie);

    return response;
  } catch (error) {
    console.error("Error encontrado:", error);
    return NextResponse.json(
      { message: "Error interno do servidor" },
      { status: 501 }
    );
  }
}
