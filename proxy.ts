import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Request se cookie get karein
  const token = request.cookies.get('auth_token')?.value

  // Agar user ke paas token hai aur wo login ya signup page par jana chah raha hai
  if (token) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

// Yeh config batata hai ke yeh proxy kin pages par chalna chahiye
export const config = {
  matcher: ['/login', '/signup']
}