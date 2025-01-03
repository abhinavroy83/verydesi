import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface CallbacksOptions {
    signOut?: (params: { callbackUrl: string }) => Promise<string>;
  }
}
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("https://apiv2.verydesi.com/adminauth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if (res.ok && data) {
          return {
            id: data.user.id,
            email: data.user.email,
            role: data.user.role,
            permissions: data.user.permissions,
            access_token: data.access_token,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token;
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.permissions = token.permissions as string[];
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
    async signOut({ callbackUrl }) {
      const newurl = process.env.NEXTAUTH_URL;
      if (newurl) {
        return `${newurl}/sign-in`;
      }
      return callbackUrl;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
