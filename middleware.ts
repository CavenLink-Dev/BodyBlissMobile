import { type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

/*
  Refreshes the Supabase auth session on every request (so SSR reads a valid
  session) and guards the /account area. Static assets and image files are
  excluded for performance.
*/
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?)$).*)",
  ],
};
