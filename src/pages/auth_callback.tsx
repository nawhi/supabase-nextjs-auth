import React, { useEffect, useState } from "react";
import { setAuthCookies } from "../cookie_helpers";
import Link from "next/link";

interface AuthCallbackProps {}

const AuthCallback = ({}: AuthCallbackProps): JSX.Element => (
  <>
    <h3>Logged in successfully</h3>
    <Link href={"/private/profile"}>Continue</Link>
  </>
);

export default AuthCallback;
