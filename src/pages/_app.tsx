import type { AppProps } from "next/app";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
  setAuthCookies,
} from "../cookie_helpers";

export default function App({ Component, pageProps }: AppProps) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    if (window.location.hash) {
      const url = new URLSearchParams(window.location.hash.slice(1));
      const token = url.get("access_token");
      const refresh = url.get("refresh_token");
      if (token && refresh) {
        setAuthCookies(token, refresh);
      }
    }
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
