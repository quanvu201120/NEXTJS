"use client";

import { AuthApiRequest } from "@/apiRequest/auth";
import { clientSessionToken, http } from "@/lib/http";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
    const searchParams = useSearchParams();
    const sesstionToken = searchParams.get("sesstionToken");
    const router = useRouter();
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (clientSessionToken.Token === sesstionToken) {
            const a = async () => {
                await AuthApiRequest.logoutFromClientToNextServer(signal);
                clientSessionToken.Token = "";
                clientSessionToken.Expires = new Date().toISOString();
                // eslint-disable-next-line react-hooks/rules-of-hooks
                router.replace("/login");
                router.refresh();
            };
            a();
        }
        return () => {
            controller.abort();
        };
    }, []);
    return <></>;
}
