import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    hasAccess: Boolean;
  }

  interface Session {
    user: User & {
      id: string;
      hasAccess: Boolean;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    userid: string;
    hasAccess: Boolean;
  }
}
