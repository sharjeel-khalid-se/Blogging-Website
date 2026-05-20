import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type routeContext = {
    params : Promise<{id : string}>
}

/**
 * @route DELETE /api/post/:id
 * @desc Delete a post by ID
 * @access Public
 */
export async function DELETE(request: Request, context : routeContext) {
  try {
   
  const id = parseInt((await context.params).id)
    if (!id) {
      return NextResponse.json({
        message: "Post ID is required",
      });
    }

    const post = await prisma.post.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      message: "Post deleted successfully",
      post,
    });
  } catch {
    return NextResponse.json({
      message: "Error deleting post",
    }, {
        status : 500
    })
  }
}


/**
 * @route PUT /api/post/:id
 * @desc Update a post by ID
 * @access Public
 */
export async function PUT(request: Request, context : routeContext) {
  try {
  const id = parseInt((await context.params).id)
    if (!id) {
      return NextResponse.json({
        message: "Post ID is required",
      });
    }

    const { title, content } = await request.json();
    if (!title || !content) {
      return NextResponse.json({
        message: "Title and content are required",
      });
    }
    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
      },
    });
    return NextResponse.json({
      message: "Post updated successfully",
      post,
    });
  } catch {
    return NextResponse.json({
      message: "Error updating post",
    }, {
        status : 500
    });
  }
}

/**
 * @route GET /api/post/:id
 * @desc Get a post by ID
 * @access Public
 */
export async function GET(request: Request, context : routeContext) {
  try {
    const id = parseInt((await context.params).id)
    console.log(id)
    if (!id) {  
      return NextResponse.json({
        message: "Post id is required",
      });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      message: "Post retrieved successfully",
      post,
    });
  } catch {
    return NextResponse.json({
      message: "Error retrieving post",
    }, {
        status : 500
    });
  }
}