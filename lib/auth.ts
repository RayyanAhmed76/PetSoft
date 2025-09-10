import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";
import { getuserbyid } from "./server-utils";
import { authformschema } from "./validation";

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedauthdata = authformschema.safeParse(credentials);
        if (!validatedauthdata.success) {
          return null;
        }
        const { email, password } = validatedauthdata.data;

        const user = await getuserbyid(email);
        if (!user) {
          console.log("user not found!");
          return null;
        }

        const passwordmatch = await bcrypt.compare(password, user.Hashpassword);

        if (!passwordmatch) {
          console.log("Invalid");
          return null;
        }

        return user;
      },
    }),
  ],
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
      if (isloggedIn && !tryingtoaccessapp) {
        if (
          request.nextUrl.pathname.includes("/login") ||
          (request.nextUrl.pathname.includes("/signup") &&
            !auth?.user.hasAccess)
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
    jwt: ({ token, user }) => {
      if (user && user.id) {
        token.userid = user.id;
        token.hasAccess = user.hasAccess;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.userid;
      session.user.hasAccess = token.hasAccess;

      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
