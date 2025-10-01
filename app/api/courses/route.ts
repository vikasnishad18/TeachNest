// src/app/api/courses/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { NextRequest } from "next/server";
import { getTokenFromHeader, verifyJWT } from "@/lib/jwt";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(courses);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
try {
    // const auth = req.headers.get("authorization");
    // const token = getTokenFromHeader(auth);
    // if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // const payload = verifyJWT(token);
    // if (payload.role !== "ADMIN") {
    //   return NextResponse.json({ error: "Forbidden: admin only" }, { status: 403 });
    // }

    const { title, description } = await req.json();
    if (!title || !description) {
      return NextResponse.json({ error: "title and description required" }, { status: 400 });
    }

    const course = await prisma.course.create({
      data: { title, description },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
