import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All feilds are Required!" },
        { status: 400 },
      );
    }

    const exitingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (exitingUser) {
      return NextResponse.json(
        { message: "Email Already in Use!" },
        { status: 409 },
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = await jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );

    const cookieStore = await cookies();
    cookieStore.set("auth_token", token);

    return NextResponse.json(
      { message: "User Successfully Created!" },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to create User!", error: (err as Error).message },
      { status: 500 },
    );
  }
}
