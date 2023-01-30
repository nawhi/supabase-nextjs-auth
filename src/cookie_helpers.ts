import { createClient, SupabaseClient } from "@supabase/supabase-js";

const nonnull = <T>(value: T | null | undefined, name: string): T => {
  if (value === undefined || value === null) {
    throw new Error(`${name} must be defined and non-null`);
  }
  return value;
};

export const SB_URL = nonnull(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  "process.env.NEXT_PUBLIC_SUPABASE_URL"
);

export const SB_KEY = nonnull(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  "process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY"
);

export const ACCESS_TOKEN_COOKIE_KEY = "sb-access-token";
export const REFRESH_TOKEN_COOKIE_KEY = "sb-refresh-token";

const ONE_HUNDRED_YEARS = 100 * 365 * 24 * 60 * 60;
const BEGINNING_OF_TIME = new Date(0).toUTCString();

export const setAuthCookies = (
  accessToken: string,
  refreshToken: string
): void => {
  document.cookie = `${ACCESS_TOKEN_COOKIE_KEY}=${accessToken}; path=/; max-age=${ONE_HUNDRED_YEARS}; SameSite=Lax; secure`;
  document.cookie = `${REFRESH_TOKEN_COOKIE_KEY}=${refreshToken}; path=/; max-age=${ONE_HUNDRED_YEARS}; SameSite=Lax; secure`;
};

export const clearAuthCookies = (): void => {
  document.cookie = `${ACCESS_TOKEN_COOKIE_KEY}=; path=/; expires=${BEGINNING_OF_TIME}; SameSite=Lax; secure`;
  document.cookie = `${REFRESH_TOKEN_COOKIE_KEY}=; path=/; expires=${BEGINNING_OF_TIME}; SameSite=Lax; secure`;
};
