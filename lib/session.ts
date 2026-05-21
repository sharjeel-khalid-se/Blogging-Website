
import { cookies, } from "next/headers"
import jwt from 'jsonwebtoken'

export async function getUserSession(){
    const token = (await cookies()).get("auth_token")?.value
    if(!token){
        return null
    }

    return await jwt.verify(token, process.env.JWT_SECRET!)
}