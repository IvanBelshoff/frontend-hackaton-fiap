import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "./globals.css";
import { DrawerProvider } from "@/shared/contexts/DrawerContext";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import { CountTimerProvider } from "@/shared/contexts/CountTimerContext";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AulaPronta IA",
    description: "Gerador de planos de aula com inteligência artificial",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pt-br">
            <body className={nunito.className}>
                <NextAuthSessionProvider>
                    <DrawerProvider>
                        <CountTimerProvider>
                            {children}
                        </CountTimerProvider>
                    </DrawerProvider>
                </NextAuthSessionProvider>
            </body>
        </html>
    );
}