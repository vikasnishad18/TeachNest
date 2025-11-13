import { cookies } from "next/headers";
import { verifyJWT, JWTPayload } from "./jwt";

export async function getUser(): Promise<JWTPayload | null> {
  const cookieStore = await cookies(); // ✅ await here
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

export async function requireUser(): Promise<JWTPayload> {
  const user = await getUser();
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  return user;
}

export async function requireAdmin(): Promise<JWTPayload> {
  const user = await requireUser();
  if (user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }
  return user;
}
