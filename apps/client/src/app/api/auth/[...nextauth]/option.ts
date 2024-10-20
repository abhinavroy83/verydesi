import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface CallbacksOptions {
    signOut?: (params: { callbackUrl: string }) => Promise<string>;
  }
}
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch("http://apiv2.verydesi.com/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const user = await res.json();
          console.log(user);
          if (res.ok && user) {
            return user; // Return user data if login is successful
          }
          return null;
        } catch (error) {
          console.error("Error during user authentication", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const response = await fetch(
            "http://apiv2.verydesi.com/auth/google",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                token: account.id_token,
              }),
            }
          );

          const user = await response.json();
          console.log(user);
          if (response.ok && user) {
            return user; // Return user data if login is successful
          }
          return null;
        } catch (error) {
          console.error("Error during Google authentication", error);
        }
        return false;
      }
      return true;
    },
    async jwt({ token, user }) {
      // If user exists (successful login), add JWT token to session
      if (user) {
        token.accessToken = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
    async redirect({ url, baseUrl }) {
      const nextAuthUrl = process.env.NEXTAUTH_URL || baseUrl;
      if (url.startsWith("/")) return `${nextAuthUrl}${url}`;
      if (new URL(url).origin === nextAuthUrl) return url;
      return nextAuthUrl;
    },
    async signOut({ callbackUrl }) {
      const nextAuthUrl = process.env.NEXTAUTH_URL;
      if (nextAuthUrl) {
        return `${nextAuthUrl}/auth/signin`;
      }
      return callbackUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
