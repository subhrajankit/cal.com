import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-default-key-calcom-clone";
const encodedKey = new TextEncoder().encode(JWT_SECRET);

export async function signToken(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, encodedKey);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("calcom_token")?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyToken(token);
  if (!payload || !payload.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.id as string },
  });

  return user;
}
