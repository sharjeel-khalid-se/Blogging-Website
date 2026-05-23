import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";
import {prisma} from "@/lib/prisma"
import UserPosts from "./UserPosts";


const Page = async () => {

  
    const session = await getUserSession()
    if(!session){
        redirect("/login")
    }

    const rawSub = session.sub
    const userId = typeof rawSub === "function" ? Number(rawSub()) : Number(rawSub)
    const email = typeof session === "object" && "email" in session ? session.email : ""

    const userPosts = await prisma.post.findMany({
      where : {
        userId : userId
      }, 
      orderBy : {
         id : "desc"
      }
    })


  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      <div className="bg-indigo-50 p-8 rounded-2xl mb-8">
        <h1 className="text-3xl font-bold text-indigo-900">My Profile</h1>
        <p className="text-indigo-600 mt-2">Logged in as: {email}</p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">My Posts</h2>
      
      {/* Client component ko posts bhej dein */}
      <UserPosts posts={userPosts.map(p => ({ ...p, id: String(p.id) }))} />
    </div>
  )
}

export default Page