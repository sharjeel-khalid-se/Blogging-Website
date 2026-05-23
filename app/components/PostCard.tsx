"use client";

import Link from "next/link";
import {MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

type PostCardProps = {
  post: {
    id: string;
    title: string;
    content: string;
  };
};



const PostCard = ({ post }: PostCardProps) => {
   

  return (
    <div>
      <div className="p-10 border rounded-lg shadow-sm border-gray-300">
        <h3 className="text-2xl font-bold mb-3 text-gray-700">{post.title}</h3>
        <p className="text-gray-600 mt-2 line-clamp-2">{post.content}</p>
        <div className="flex gap-5 text-sm text-gray-500 justify-between mt-10" >
        <div className="flex items-center gap-2">
            <MessageSquare className="text-gray-500 text-lg" />
            <span className="ml-1">10 Comments</span>
        </div>
        <Link href={`/posts/${post.id}`} className="text-blue-500 hover:underline">
          ReadMore
        </Link>
      </div>
      </div>
      
    </div>
  );
};

export default PostCard;
