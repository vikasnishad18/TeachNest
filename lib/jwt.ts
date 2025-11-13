// src/lib/jwt.ts
import jwt from "jsonwebtoken";

// ✅ Define the JWT payload type here itself
export type JWTPayload = {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
};

// ✅ Explicitly cast JWT_SECRET as string
const JWT_SECRET: string = process.env.JWT_SECRET ?? "";
if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is not set in .env");
}

// ✅ Sign JWT with a payload
export function signJWT(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

// ✅ Verify JWT safely, returns payload or null
export function verifyJWT(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as JWTPayload;
  } catch (err) {
    console.error("❌ Invalid token:", err);
    return null;
  }
}

// ✅ Extract token from Authorization header ("Bearer <token>")
export function getTokenFromHeader(authHeader?: string | null): string | null {
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return null;
  return parts[1];
}
