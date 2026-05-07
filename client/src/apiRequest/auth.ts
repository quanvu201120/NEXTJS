import { http } from "@/lib/http";
import {
    LoginBodyType,
    RegisterBodyType,
} from "@/schemaValidations/auth.schema";

export const AuthApiRequest = {
    login: (formData: LoginBodyType) => http.post("/auth/login", formData),
    register: (formData: RegisterBodyType) =>
        http.post("/auth/register", formData),
    auth: (token: string, expiresAt: string) =>
        http.post(
            "/api/auth",
            { token, expiresAt },
            {
                baseUrl: "",
            },
        ),
    logoutFromClientToNextServer: (signal?: AbortSignal | null | undefined) =>
        http.get("/api/auth/logout", { baseUrl: "", signal }),
    logoutFromNextServerToServer: (sessionToken: string) =>
        http.post(
            "/auth/logout",
            {},
            {
                headers: { Authorization: `Bearer ${sessionToken}` },
            },
        ),
    slideSessionFormClientToServer: () =>
        http.get("/api/auth/slide-session", { baseUrl: "" }),
    slideSessionFormNextServerToServer: (sessionToken: string) =>
        http.post(
            "/auth/slide-session",
            {},
            {
                headers: { Authorization: `Bearer ${sessionToken}` },
            },
        ),
};
