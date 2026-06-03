import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "No token" },
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

    return NextResponse.json({
      message: "Token valid",
      valid: true,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Verification failed" },
      { status: 401 }
    );
  }
}
