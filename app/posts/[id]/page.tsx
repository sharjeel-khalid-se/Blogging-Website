import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
const {id} = await params
const postId = parseInt(id)

if(isNaN(postId)){
    return notFound()
}

const post = await prisma.post.findUnique({
    where : { id : postId}
})

if(!post){
    return notFound()
}

  return (
    <div className="flex w-full h-screen px-48 flex-col items-center pt-10 ">
        <Link href={"/"} >Back</Link>
      <div className="w-full ">
        <h2 className="w-full p-2 mb-2 outline-none text-4xl font-bold">
            {post.title}
        </h2>
        <div className="h-[1px] w-full bg-gray-300 mb-10"></div>
        <p className="w-full mb-4 outline-none border-none placeholder-gray-300 ">
            {post.content}
        </p>
        
      </div>
    </div>
  )
}

export default page