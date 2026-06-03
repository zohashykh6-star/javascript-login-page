import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/jwt";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Profile retrieved",
      user,
    });
  } catch (error) {
    console.error("Profile error:", error instanceof Error ? error.message : "Unknown error");

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
