import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";
import { getuserbyid } from "./server-utils";
import { authformschema } from "./validation";
import { NextAuthEdgeConfig } from "./auth-edge";

const config = {
  ...NextAuthEdgeConfig,
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
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
