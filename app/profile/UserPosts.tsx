"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Edit } from "lucide-react"; // Icons use kar rahe hain
import { useState } from "react";


type post = {
    id : string;
    title : string;
    content : string;
}



const UserPosts = ({ posts }: { posts: post[] }) => {
    const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleDelete = async (postId: string) => {
    if(!window.confirm("Are you sure you want to delete this post?")){
        return;
    }

    setLoadingId(postId);
    try{
        const response = await fetch(`/api/post/${postId}`, {
            method : "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete post");
        }

        router.refresh();

    } catch (error) {
        console.error("Error deleting post:", error);
    } finally {
        setLoadingId(null);
    }
}
  return (
    <div className="grid gap-4 mt-6">
      {posts.map((post) => (
        <div key={post.id} className="p-5 border rounded-lg shadow-sm flex justify-between items-center bg-white">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
            <p className="text-gray-500 line-clamp-1 mt-1">{post.content}</p>
          </div>

          <div className="flex gap-3 ml-4">
            {/* Edit Button */}
            <Link 
              href={`/posts/${post.id}/edit`} 
              className="p-2 text-indigo-500 bg-indigo-50 rounded hover:bg-indigo-100 transition"
            >
              <Edit className="w-5 h-5" />
            </Link>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(post.id)}
              disabled={loadingId === post.id}
              className={`p-2 text-red-500 bg-red-50 rounded hover:bg-red-100 transition ${loadingId === post.id ? 'opacity-50' : ''}`}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserPosts