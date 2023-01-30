import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { setAuthCookies } from "../cookie_helpers";

interface AuthCallbackProps {}

const AuthCallback = ({}: AuthCallbackProps): JSX.Element => {
  const router = useRouter();

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

  // this needs to be a separate useEffect otherwise it breaks
  useEffect(() => {

    router.push("/private/profile1");
  }, []);

  return <>Redirecting you...</>;
};

export default AuthCallback;
