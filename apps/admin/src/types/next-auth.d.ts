import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    role?: string;
    permissions?: string[];
  }

  interface user {
    access_token?: string;
    id: string;
    email: string;
    role: string;
    permissions: string[];
  }
}
