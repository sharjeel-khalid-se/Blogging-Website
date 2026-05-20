import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @route POST /api/post
 * @desc Create a new post
 * @access Public
 */
export async function POST(request: Request) {
  try {
    const { title, content, userId } = await request.json();

    if (!title || !content || !userId) {
      return NextResponse.json(
        {
          message: "Title, content, and userId are required",
        },
        { status: 400 },
      );
    }

    const parsedUserId = Number(userId);

    if (Number.isNaN(parsedUserId)) {
      return NextResponse.json(
        {
          message: "userId must be a valid number",
        },
        { status: 400 },
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        user: {
          connect: {
            id: parsedUserId,
          },
        },
      },
    });
    return NextResponse.json({
      message: "Post created successfully",
      post,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating post";
    return NextResponse.json(
      {
        message: "Error creating post",
        error: message,
      },
      { status: 500 },
    );
  }
}

/**
 * @route GET /api/post
 * @desc Get all posts
 * @access Public
 */
export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json({
      message: "Posts retrieved successfully",
      posts,
    });
  } catch {
    return NextResponse.json({
      message: "Error retrieving posts",
    });
  }
}


