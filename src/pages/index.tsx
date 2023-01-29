import Head from "next/head";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Home() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  return (
    <main>
      <h2>Login</h2>
      <button
        onClick={() =>
          supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: `http://localhost:3000/auth_callback`,
            },
          })
        }
      >
        Sign in with Google
      </button>
    </main>
  );
}
