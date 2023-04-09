import LoginPage from "../islands/Login.tsx";

import type { Handlers } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";

export default function Page() {
  return (
    <>
      <LoginPage />
    </>
  );
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    if (!cookies.token) {
      return ctx.render();
    } else {
      const url = new URL(req.url);
      url.pathname = "/";
      return Response.redirect(url);
    }
  },
};
