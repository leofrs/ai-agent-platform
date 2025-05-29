import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export type TokenPayload = {
  user: {
    id: string;
    name: string;
    userRole: "ADMIN" | "USER";
  };
  iat: number;
  exp: number;
};

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "secret");

export async function generateToken(payload: { [key: string]: any }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}

export async function verifyToken<TokenPayload>(token: string) {
  try {
    const { payload } = await jwtVerify<TokenPayload>(token, secret);
    return payload;
  } catch (err) {
    console.error("Token inválido ou expirado");
    return null;
  }
}

export async function getUserFromToken(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = await verifyToken<TokenPayload>(token);
    return decoded;
  } catch {
    return null;
  }
}
