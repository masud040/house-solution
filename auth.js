import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectMongo from "./db/connectMongo";
import clientPromise from "./db/mongoClientPromise";
import { UserModel } from "./models/users-model";
export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.ENVIRONMENT,
  }),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;
        try {
          await connectMongo();
          const user = await UserModel.findOne({
            email: credentials.email,
          }).lean();

          if (user) {
            const isMatch = credentials.password === user.password;
            if (isMatch) {
              return user;
            } else {
              throw new Error("Password is not valid");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (e) {
          throw new Error("User not found");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
