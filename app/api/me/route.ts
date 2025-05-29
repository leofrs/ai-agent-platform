import { TokenPayload, verifyToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Token não encontrado" },
        { status: 401 }
      );
    }

    const payload = await verifyToken<TokenPayload>(token.value);

    if (!payload) {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 });
    }

    return NextResponse.json(
      { userRole: payload.user.userRole, userName: payload.user.name },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao verificar o token:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
