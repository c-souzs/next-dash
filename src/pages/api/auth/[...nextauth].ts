import { NextAuthOptions, SessionStrategy } from "next-auth";
import NextAuth from "next-auth";
import CredentitalsProvider from "next-auth/providers/credentials";

import { getUserFromEmail } from "../../../lib/user/getUserFromEmail";
import { comparePassword } from "../../../utils/bcrypt";
import { AuthUser } from "../../../types/user";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentitalsProvider({
            id: "credentials",
            credentials: {
                email: {label: "E-mail", type: "email"},
                password: { label: "Senha", type: "password" }
            },
            authorize: async (credentials) => {
                if(credentials && credentials.email && credentials.password){
                    const { email, password } = credentials;

                    const dataUser = await getUserFromEmail(email);

                    if(dataUser){
                        const { user } = dataUser;
                        const { login } = user as AuthUser;
                        const { password: p } = login!;
                        
                        const correctPassword = comparePassword(password, p);

                        if(correctPassword) return user as any;
                    }
                }
                
                return null;
            },
        }),
    ],
    callbacks: {
        jwt: async ({token, user}) => {
            if(user) token.user = user;
            
            return token;
        },
        session: async ({session, token}) => {
            if(token) session.user = token.user as AuthUser;
            
            return session;
        }
    },
    session: {
		strategy: "jwt" as SessionStrategy,
		maxAge: 3600,
	},
	jwt: {
		maxAge: 3600,
	}
}

export default NextAuth(authOptions);