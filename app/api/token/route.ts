import { TokenPayload, verifyToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { StreamClient, UserRequest } from "@stream-io/node-sdk";
import { v4 as uuidv4 } from "uuid";

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

    const userId = payload.user.id;
    const userName = payload.user.name;

    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    if (!apiKey) {
      return Response.error();
    }

    const streamSecret = process.env.STREAM_SECRET;

    if (!streamSecret) {
      return Response.error();
    }

    const serverClient = new StreamClient(apiKey, streamSecret);

    const userToken = serverClient.generateUserToken({ user_id: userId });

    const user: UserRequest = {
      id: userId,
      name: userName,
      image: `https://getstream.io/random_png/?id=${userId}&name=${userName}`,
      role: "admin",
    };

    const callId = uuidv4();

    const response = {
      user: user,
      token: userToken,
      callId: callId,
      apiKey: apiKey,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
