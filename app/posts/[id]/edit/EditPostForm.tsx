"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PostProps = {
  post: {
    id: number;
    title: string;
    content: string;
  };
};

export default function EditPostForm({ post }: PostProps) {
  // State mein initial value purani post ki set ki hai
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/post/${post.id}`, {
        method: "PUT", // Update ke liye PUT use karte hain
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      // Success hone par profile page par wapas bhej dein aur refresh karein
      router.push("/profile");
      router.refresh();
      
    } catch (err) {
      setError("An error occurred while updating the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="flex flex-col gap-5 w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
      {error && <p className="text-red-500 bg-red-50 p-3 rounded">{error}</p>}

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={8}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`bg-indigo-400 text-white py-3 px-6 rounded-lg font-medium transition hover:bg-indigo-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Updating..." : "Update Post"}
      </button>
    </form>
  );
}