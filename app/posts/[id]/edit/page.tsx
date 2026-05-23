import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import EditPostForm from "./EditPostForm";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getUserSession();
  
  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  const postId = parseInt(id);

  if (isNaN(postId)) {
    return notFound();
  }

  // Database se purani post nikalen
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5">
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">Edit Post</h1>
      
      {/* Client component ko purana data pass kar rahe hain */}
      <EditPostForm post={post} />
    </div>
  );
}