import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { config } from "./config";

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Username",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const username = credentials?.username;
                const password = credentials?.password;
                if (!username || !password) return null;

                if (
                    username.toLowerCase() !== config.userName.toLowerCase() ||
                    password !== config.userPassword
                )
                    return null;

                return {
                    id: config.userId,
                    name: config.userName,
                    email: config.userEmail,
                } as User;
            },
        }),
    ],
};

export default authOptions;
