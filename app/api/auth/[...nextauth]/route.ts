import { connectToDatabase } from '@/lib/database/db';
import UserModel from '@/lib/database/models/User';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                await connectToDatabase();

                const user = await UserModel.findOne({ email });

                if (!user) {
                    throw Error('Email not registered');
                }

                const passwordMatch = await user.comparePassword(password);

                if (!passwordMatch) {
                    throw Error("Email and password doesn't match");
                }

                return {
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    id: user._id,
                };
            },
        }),
    ],
    callbacks: {
        jwt(params: any) {
            if (params.user?.role) {
                params.token.role = params.user.role;
                params.token.username = params.user.username;
                params.token.id = params.user.id;
            }
            return params.token;
        },
        session({ session, token }) {
            if (session.user) {
                (session.user as { id: string }).id = token.id as string;
                (session.user as { role: string }).role = token.role as string;
            }
            return session;
        },
    },
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
