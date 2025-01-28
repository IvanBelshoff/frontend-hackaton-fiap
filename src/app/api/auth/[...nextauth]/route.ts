
import { Api } from "@/app/services/Api";
import { IActionLogin, ILoginAction } from "@/shared/server-actions/actions";

import { isAxiosError } from "axios";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials, _req) {
                try {
                    const login = await Api().post('/entrar', { email: credentials?.email, senha: credentials?.password });

                    // Verifica se o login foi bem-sucedido
                    if (login.status === 200) {
                        return login.data; // Retorna o usuário para ser armazenado no token
                    }

                    return null;

                } catch (error) {
                    // Identifica se o erro veio do Axios
                    if (isAxiosError(error)) {

                        const errors = (error as IActionLogin).response?.data.errors;

                        const response: ILoginAction = {
                            errors: errors
                        };

                        throw new Error(JSON.stringify(response));

                    }

                }
            }

        })
    ],
    pages: {
        signIn: '/login',
        error: "/login",
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {

            if (user) {
                token.user = {
                    accessToken: user.accessToken,
                    id: user.id,
                    typeUser: user.typeUser,
                    api_key: user.api_key,
                    foto: user.foto
                };
            }

            if (trigger === "update" && session) {
                token.user = {
                    ...session.user // Atualiza apenas os campos enviados no update
                };
            }

            return token;

        },
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user as Session["user"];
            }
            return session;
        }
    }

};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };