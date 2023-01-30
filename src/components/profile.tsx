import { router } from "next/client";
import { clearAuthCookies, SB_KEY, SB_URL } from "../cookie_helpers";
import { useEffect, useState } from "react";
import { createClient, Session } from "@supabase/supabase-js";

const Profile = () => {
  const [supabase] = useState(() => createClient(SB_URL, SB_KEY));

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(true);
    supabase.auth
      .getSession()
      .then((data) => setSession(data.data.session))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [supabase]);

  return loading ? (
    <>Loading...</>
  ) : (
    <div>
      <h1>Profile (Private Page)</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button
        onClick={async () => {
          clearAuthCookies();
          await supabase.auth.signOut();
          router.push("/");
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default Profile;
