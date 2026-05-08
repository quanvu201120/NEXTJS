import Link from "next/link";
import type { Metadata } from "next";
import LogOutPage from "./login/logout";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Trang chủ | SHOP ABC",
    description: "Đây là trang chủ",
};

export default async function Home() {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("sessionToken");

    return (
        <div className="flex flex-col gap-2">
            {!token?.value ? (
                <>
                    <Link href="/register">Register</Link>
                    <Link href="/login">Login</Link>
                </>
            ) : (
                <>
                    <Link href="/me">Me</Link>
                    <Link href="/products">Products</Link>
                    <LogOutPage />
                </>
            )}
        </div>
    );
}
