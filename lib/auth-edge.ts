import { NextAuthConfig } from "next-auth";
import { getuserbyid } from "./server-utils";
import prisma from "./db";

export const NextAuthEdgeConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      const isloggedIn = Boolean(auth?.user);
      const tryingtoaccessapp = request.nextUrl.pathname.includes("/app");

      if (isloggedIn && tryingtoaccessapp && !auth?.user.hasAccess) {
        return Response.redirect(new URL("/payment", request.nextUrl));
      }

      if (isloggedIn && tryingtoaccessapp && auth?.user.hasAccess) {
        return true;
      }
      if (!isloggedIn && tryingtoaccessapp) {
        return false;
      }
      if (
        isloggedIn &&
        (request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")) &&
        auth?.user.hasAccess
      ) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }
      if (isloggedIn && !tryingtoaccessapp && !auth?.user.hasAccess) {
        if (
          request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")
        ) {
          return Response.redirect(new URL("/payment", request.nextUrl));
        }
        return true;
      }
      if (!isloggedIn && !tryingtoaccessapp) {
        return true;
      }
      return false;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user && user.id) {
        token.userid = user.id;
        token.email = user.email!;
        token.hasAccess = user.hasAccess;
      }

      if (trigger === "update") {
        const userfromdb = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        });
        if (userfromdb) {
          token.hasAccess = userfromdb?.hasAccess;
        }
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.userid;
      session.user.hasAccess = token.hasAccess;

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
