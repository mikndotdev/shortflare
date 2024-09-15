"use client";

import type React from "react";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

export default function Template({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SessionProvider>
                <Toaster richColors={true} position="bottom-center" />
                {children}
            </SessionProvider>
        </>
    );
}
