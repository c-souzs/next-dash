import NextAuth from "next-auth/next";
import { AuthUser } from "./authUser";

declare module "next-auth" {
    interface Session {
        user: AuthUser;
    }
}