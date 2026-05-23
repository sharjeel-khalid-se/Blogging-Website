"use client";
import PostCard from "./components/PostCard";
import { useEffect, useState } from "react";

type Post = {
  id: string | number;
  [key: string]: unknown;
  title: string;
    content: string;
};

const getPosts = async ()=>{
    try {
        const response = await fetch("/api/post", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};

const Home = () => {

  const [posts, setPosts] = useState<Post[]>([]);

    useEffect(()=>{
        const fetchPosts = async () => {
            const fetchedPosts = await getPosts();
            setPosts(fetchedPosts.posts);
        }
        fetchPosts();
    }, []);

  return (
    <div className="h-screen w-full px-48">
      <h2 className="text-4xl font-bold text-gray-800">Your Feed</h2>
      {posts.length > 0 ? (
        <div className="flex flex-col gap-5 mt-5">
        {posts.map((post)=>{
          return (
            <PostCard key={post.id} post={post} />
          )
        })}
      </div>
      ) : (<p className="text-gray-500 mt-5">No posts available.</p>)}
    </div>
  )
}

export default Home