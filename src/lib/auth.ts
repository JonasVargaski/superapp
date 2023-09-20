import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { env } from "./env";

export const authOptions: NextAuthOptions = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password)
          throw new Error("credentials not provided");

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            user_account: {
              select: {
                account_id: true,
                roles: true,
                time_zone: true,
                verified: true,
              },
            },
          },
        });

        console.log(user);
        if (!user || !(await compare(credentials.password, user.password_hash)))
          throw new Error("invalid credentials");

        return {
          id: user.id,
          email: user.email,
          name: user.full_name,
          roles: user.user_account[0].roles.reduce((acc, cur) => {
            acc[cur] = true;
            return acc;
          }, {} as Record<string, boolean>),
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          roles: token.roles,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          roles: user.roles,
        };
      }
      return token;
    },
  },
};
