"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme="dark">
                    <ToastContainer hideProgressBar />
                    <NextTopLoader />
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </SessionProvider>
    );
}
