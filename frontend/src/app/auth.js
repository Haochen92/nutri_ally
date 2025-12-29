import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "prisma/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        authorization: {
            params: {
                prompt: "login", // Force login screen
            },
        },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Resend(
      {
        apiKey:process.env.AUTH_RESEND_KEY,
        from:'sign-in@liuhaochen.com'
      }
    )
],
  callbacks:{
    async jwt({ token, account, user, profile }) {
      // console.log("JWT Callback - Token:", token);
      // console.log("JWT Callback - Account:", account);
      // console.log("JWT Callback - User:", user);
      if (user) {
        token.id = user.id; // Attach the user ID
        token.name = profile?.name; // Attach the user Name
        token.role = user.role;
        token.image = user.image;
        token.gender = user.gender;
        token.birthday = user.birthday;
        token.height = user.height;
        token.weight = user.weight;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("Session Callback - Token:", token);
      session.user.id = token.id; // Attach the user ID to the session
      session.user.name = token.name;
      session.user.role = token.role;
      session.user.image = token.image;
      session.user.gender = token.gender;
      session.user.birthday = token.birthday;
      session.user.height = token.height;
      session.user.weight = token.weight;

      return session;
    },

    async signIn({user, account, profile}) {
      // console.log("Google profile", profile);
      const existingUser = await prisma.user.findUnique({
        where:{email: user.email}
      })
      if (existingUser) {
        // Check if this provider is already linked
        const existingAccount = await prisma.account.findFirst({
          where: {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          },
        });

        if (!existingAccount) {
          // Manually link the account
          await prisma.account.create({
            data: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              userId: existingUser.id,
              type: account.type,
            },
          });
        }
      }

      return true; // Allow sign-in
    }
  },
  pages: {
    signIn: "/auth/signin",
    // newUser: "/auth/welcome"
  },
  session: {
    strategy: "jwt"
  },
  debug: true, // Enable detailed debug logs

});
