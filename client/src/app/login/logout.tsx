"use client";
import { AuthApiRequest } from "@/apiRequest/auth";
import { useRouter } from "next/navigation";
export default function LogOutPage() {
    const router = useRouter();
    const handleLogout = async () => {
        const res = await AuthApiRequest.logoutFromClientToNextServer();

        if (res?.status === 200) {
            router.replace("/login");
            router.refresh();
        }
    };

    return (
        <button className="cursor-pointer" onClick={handleLogout}>
            Logout
        </button>
    );
}
