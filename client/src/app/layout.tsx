import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./AppProvider";
import { cookies } from "next/headers";
import SlideSession from "@/components/slide-sessison";

export const metadata: Metadata = {
    title: {
        template: "%s | SHOP ABC",
        default: "SHOP ABC",
    },
    description: "Đây là mô tả mặc định của SHOP ABC",
};

const inter = Inter({
    subsets: ["vietnamese"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("sessionToken");
    const expiresAtSession = cookiesStore.get("expiresAtSession");

    return (
        <html
            suppressHydrationWarning
            lang="en"
            className={`${inter.className} h-full antialiased`}
        >
            <body className="min-h-full w-full flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
                <AppProvider
                    initSessionToken={token?.value || ""}
                    initExpires={expiresAtSession?.value || ""}
                >
                    {children}
                    <SlideSession />
                </AppProvider>
            </body>
        </html>
    );
}
