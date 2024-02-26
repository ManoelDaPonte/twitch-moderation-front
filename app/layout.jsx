"use client";
import "@/styles/globals.css";
import { ReactQueryClientProvider } from "@/util/ReactQueryClientProvider";

export default function RootLayout({ children }) {
    return (
        <ReactQueryClientProvider>
            <html lang="en">
                <body>{children}</body>
            </html>
        </ReactQueryClientProvider>
    );
}
