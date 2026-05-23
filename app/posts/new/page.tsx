"use client";

import Link from "next/link";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const newPost = {
        title,
        content,
      };

      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.message || "Failed to create post. Please try again.",
        );
        return;
      }
      const data = await response.json();
      console.log(data);
      setTitle("");
      setContent("");
      router.push(`/posts/${data.post.id}`);
    } catch (err) {
      setError("An error occurred while creating the post. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen px-48 flex-col items-center pt-10 ">
      <div className="w-full ">
        <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="h-[1px] w-full bg-gray-300"></div>
        <form
          action=""
          className="w-full mt-10 flex flex-col"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a catchy title for your post"
            className="w-full placeholder-opacity-10 p-2 border placeholder-gray-300 border-gray-300 mb-2 outline-none border-none text-4xl font-bold"
          />
          <div className="h-[1px] w-full bg-gray-300 mb-10"></div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="start writing your post here..."
            className="w-full mb-4 outline-none border-none placeholder-gray-300 "
            rows={10}
          />
          <div className="flex justify-center gap-10 border p-5 rounded-2xl border-gray-300 shadow-lg">
            <button className="hover:bg-indigo-400 hover:text-white rounded py-2 px-6 bg-white text-indigo-400 hover:border-indigo-400 border transition">
              <Link href="/"> Cancel</Link>
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-indigo-400 text-white py-2 px-6 rounded hover:bg-white hover:text-indigo-400 hover:border-indigo-400 border transition"
            >
              {loading ? "Creating..." : "Create Post"}
              <SendHorizontal className="w-4 h-4" />{" "}
              {/* Icon ka size thora chota karne ke liye */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
