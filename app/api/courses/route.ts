import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust your path
import { verifyJWT } from "@/lib/jwt"; // adjust your path
// helper to extract Bearer token from Authorization header
function getTokenFromHeader(auth: string | null): string | null {
  if (!auth) return null;
  const parts = auth.split(" ");
  if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
    return parts[1];
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Extract token from Authorization header
    const auth = req.headers.get("authorization");
    const token = getTokenFromHeader(auth);

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Verify token and check role
    const payload = verifyJWT(token);

    if (!payload || payload.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: admin only" },
        { status: 403 }
      );
    }

    // 3️⃣ Parse request body
    const { title, description } = await req.json();
    if (!title || !description) {
      return NextResponse.json(
        { error: "title and description required" },
        { status: 400 }
      );
    }

    // 4️⃣ Create course → Important: userId is required in your schema
    const course = await prisma.course.create({
      data: {
        title,
        description,
        userId: payload.id, // set FK directly to match generated Prisma input type
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (err) {
    console.error("Course POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
