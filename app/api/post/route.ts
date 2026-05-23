import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/session";

/**
 * @route POST /api/post
 * @desc Create a new post
 * @access Public
 */
export async function POST(request: Request) {
  try {
    const session = await getUserSession();

    if (!session) {
      return NextResponse.json(
        {
          message: "Unatuhorized",
        },
        { status: 401 },
      );
    }
    const { title, content } = await request.json();
    const userId = session.sub
    console.log(userId)
    if (!title || !content ) {
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
