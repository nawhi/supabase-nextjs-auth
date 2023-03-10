import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY, SB_KEY, SB_URL,
} from "./cookie_helpers";
import {createClient} from "@supabase/supabase-js";

const supabase = createClient(SB_URL, SB_KEY);

export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();
  // Create authenticated Supabase Client.

  const token = req.cookies.get(ACCESS_TOKEN_COOKIE_KEY);
  const refresh = req.cookies.get(REFRESH_TOKEN_COOKIE_KEY);

  if (token && refresh) {
    try {
      await supabase.auth.setSession({
        access_token: token.value,
        refresh_token: refresh.value,
      });
      // auth successful
      return res;
    } catch (e) {
      // auth not successful... fall through
      console.error("setSession error", e);
    }
  }

  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/";
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: "/private/:path*",
};
