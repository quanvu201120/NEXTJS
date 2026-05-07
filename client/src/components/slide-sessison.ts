"use client";

import { AuthApiRequest } from "@/apiRequest/auth";
import { clientSessionToken } from "@/lib/http";
import { checkExpireRefresh } from "@/lib/utils";
import { SlideSessionResType } from "@/schemaValidations/auth.schema";
import { useEffect } from "react";

export default function SlideSession() {
    useEffect(() => {
        const handleCheckRefresh = async () => {
            if (checkExpireRefresh(clientSessionToken.Expires)) {
                try {
                    const res =
                        await AuthApiRequest.slideSessionFormClientToServer();
                    const payload = res?.payload as SlideSessionResType;
                    clientSessionToken.Expires = payload?.data?.expiresAt;
                } catch (error) {}
            }
        };
        handleCheckRefresh();
        const intervalCheckRefresh = setInterval(
            () => {
                handleCheckRefresh();
            },
            1000 * 60 * 60 * 2,
        ); // 2 giờ
        return () => clearInterval(intervalCheckRefresh);
    }, []);
    return null;
}
