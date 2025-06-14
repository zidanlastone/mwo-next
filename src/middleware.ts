// import { auth } from "@/auth"
// export { auth as middleware } from "@/auth"

import { auth } from "@/auth"
 
const exluded = ['/', '/authenticate', '/register', '/verify'];
export default auth((req) => {
  if (!req.auth && !exluded.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/authenticate", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: [
        '/((?!api|.*\\..*|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}

