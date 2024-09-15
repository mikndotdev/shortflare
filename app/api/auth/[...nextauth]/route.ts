import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                password: { label: "Password", type: "password" },
            },
            //@ts-ignore
            async authorize(credentials) {
                if (credentials?.password === process.env.PASSWORD) {
                    return { id: 1, name: "Admin" };
                }
                return null;
            },
        }) as any,
    ],
});

export { handler as GET, handler as POST };
