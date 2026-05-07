/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FormErrorApi } from "./http";
import { PayloadJwtType } from "@/schemaValidations/auth.schema";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const HandelErrorFormApi = (
    error: any,
    setError?: UseFormSetError<any>,
) => {
    if (error instanceof FormErrorApi && setError) {
        error.payload.errors.forEach(({ field, message }) => {
            setError(field, {
                type: "server",
                message,
            });
        });
    } else {
        console.error("HandelErrorFormApi:", error);
    }
};

// Bạn có thể để hàm này trong src/lib/utils.ts hoặc viết trực tiếp trong layout
export const decodePayloadJWT = <T = any>(token: string) => {
    if (!token) {
        return null;
    }
    const payload = token.split(".")[1];
    const decodedPayload = Buffer.from(payload, "base64").toString();
    return JSON.parse(decodedPayload) as T;
};

export const getExpireFromJWT = <T = any>(token: string) => {
    const decodedPayload = decodePayloadJWT<PayloadJwtType>(token);
    if (!decodedPayload) return "";
    const expiresDate = new Date(decodedPayload.exp * 1000);
    return expiresDate.toISOString();
};

export const checkExpireRefresh = (expiryDateString: string): boolean => {
    if (!expiryDateString) return false;
    const expireTime = new Date(expiryDateString).getTime();
    const currentTime = Date.now();
    const timeLeft = expireTime - currentTime;
    const SIX_HOURS_IN_MS = 6 * 60 * 60 * 1000;

    return timeLeft > 0 && timeLeft < SIX_HOURS_IN_MS;
};
