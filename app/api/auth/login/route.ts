import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and Password are Required" },
        { status: 409 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid Credential" },
        { status: 401 },
      );
    }

        const passwordTrue = await compare(password, user.password)
    if (!passwordTrue) {
      return NextResponse.json(
        { message: "Invalid Credential" },
        { status: 401 },
      );
    }

    const token = await jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    const cookieStore = await cookies();
    cookieStore.set("auth_token", token);

    return NextResponse.json(
      {
        success: true,
        message: "user login successfully",
      },

      { status: 200 },
    );

  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to login user , server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
