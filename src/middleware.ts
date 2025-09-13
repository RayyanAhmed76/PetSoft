import { NextAuthEdgeConfig } from "@/lib/auth-edge";
import { auth } from "@/lib/auth-no-edge";
import NextAuth from "next-auth";

export default NextAuth(NextAuthEdgeConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
