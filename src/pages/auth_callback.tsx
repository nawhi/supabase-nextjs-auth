import React, {useEffect} from "react";
import {useRouter} from "next/router";

interface AuthCallbackProps {}

const AuthCallback = ({}: AuthCallbackProps): JSX.Element => {
  const router = useRouter();
  useEffect(() => {
    // setTimeout(() => {
      router.push("/private/profile");
    // }, 500);
  }, []);
  return <>Redirecting you...</>;
};

export default AuthCallback;
