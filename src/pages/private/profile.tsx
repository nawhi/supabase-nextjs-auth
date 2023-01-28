import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { router } from "next/client";
import { useRouter } from "next/router";

const Profile = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button
        onClick={async () => {
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
