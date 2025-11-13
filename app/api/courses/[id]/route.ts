// src/app/api/courses/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTokenFromHeader, verifyJWT } from "@/lib/jwt";
import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(course);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = await params;   // pehle params ko await karo
    const courseId = id;   // number me convert karo

    await prisma.course.delete({
      where: { id: courseId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


// ✅ New UPDATE (PUT) route
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = await params; // ✅ await lagana zaroori hai
    const courseId = id;

    const body = await req.json();
    const { title, description } = body;

    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: { title, description },
    });

    return NextResponse.json(updatedCourse);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

