import {createClient} from "@supabase/supabase-js";
import {SB_KEY, SB_URL} from "../cookie_helpers";
import {useState} from "react";

export default function Home() {
  const [supabase] = useState(() => createClient(SB_URL, SB_KEY));
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
