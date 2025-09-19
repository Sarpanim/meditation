import { cookies } from "next/headers";

export const AUTH_COOKIE_NAME = "demo-auth";

export function isDemoAuthenticated(): boolean {
  return cookies().get(AUTH_COOKIE_NAME)?.value === "true";
}

export function setDemoAuthCookie() {
  cookies().set(AUTH_COOKIE_NAME, "true", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
}

export function clearDemoAuthCookie() {
  cookies().delete(AUTH_COOKIE_NAME);
}
