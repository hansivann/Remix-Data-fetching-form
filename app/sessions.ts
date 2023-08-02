import { createCookieSessionStorage } from "@remix-run/node";

const {getSession, commitSession, destroySession} = createCookieSessionStorage({
  cookie: {
    name: "formSession",
    path: "/",
    maxAge: 60 * 60 * 24,
    secrets: ["mochi"],
  },
})

export {getSession, commitSession, destroySession}
