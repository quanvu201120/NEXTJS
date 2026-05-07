/* eslint-disable @typescript-eslint/no-explicit-any */

import { envConfig } from "@/config";
import { redirect } from "next/navigation";

type CustomRequestInit = RequestInit & {
    baseUrl?: string | undefined;
};

export class HttpError extends Error {
    status: number;
    payload: {
        message: string;
        [key: string]: any;
    };
    constructor({ status, payload }: { status: number; payload: any }) {
        super("Http error");
        this.status = status;
        this.payload = payload;
    }
}

const ERROR_FORM_STATUS = 422;
const ERROR_AUTHENTICATION_STATUS = 401;
type ErrorFormType = {
    message: string;
    errors: {
        message: string;
        field: string;
    }[];
};

export class FormErrorApi extends HttpError {
    status: 422;
    payload: ErrorFormType;
    constructor({ status, payload }: { status: 422; payload: ErrorFormType }) {
        super({ status, payload });
        this.status = status;
        this.payload = payload;
    }
}

class ClientSessionToken {
    #value = "";
    #expiresAt = "";

    set Token(value: string) {
        if (typeof window !== "undefined") {
            this.#value = value;
        }
    }
    get Token() {
        return this.#value;
    }

    get Expires() {
        return this.#expiresAt;
    }

    set Expires(value: string) {
        if (typeof window !== "undefined") this.#expiresAt = value;
    }
}

export const clientSessionToken = new ClientSessionToken();

const request = async <Response>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    option?: CustomRequestInit,
) => {
    let body: any = undefined;
    if (option?.body instanceof FormData) {
        body = option.body;
    } else if (option?.body) {
        body = JSON.stringify(option.body);
    }
    const baseHeaders: any = {
        Authorization: clientSessionToken.Token
            ? `Bearer ${clientSessionToken.Token}`
            : "",
    };
    if (!(option?.body instanceof FormData)) {
        baseHeaders["Content-Type"] = "application/json";
    }
    const baseUrl =
        option?.baseUrl === undefined
            ? envConfig.NEXT_PUBLIC_API_ENDPOINT
            : option.baseUrl;

    const fullPath = url.startsWith("/")
        ? `${baseUrl}${url}`
        : `${baseUrl}/${url}`;
    try {
        const res = await fetch(fullPath, {
            ...option,
            headers: {
                ...baseHeaders,
                ...option?.headers,
            },
            body: body,
            method: method,
        });

        const payload: Response = await res.json();
        const data = {
            status: res.status,
            payload,
        };

        if (!res.ok) {
            if (res.status === ERROR_FORM_STATUS) {
                throw new FormErrorApi(
                    data as { status: 422; payload: ErrorFormType },
                );
            } else if (res.status === ERROR_AUTHENTICATION_STATUS) {
                if (typeof window !== "undefined") {
                    await fetch("/api/auth/logout");
                    clientSessionToken.Token = "";
                    clientSessionToken.Expires = new Date().toISOString();
                    window.location.href = "/login";
                } else {
                    const token = (
                        option?.headers as any
                    )?.Authorization?.split("Bearer ")[1];
                    redirect(`/logout?sesstionToken=${token}`);
                }
            } else {
                throw new HttpError(data);
            }
        }

        if (["/auth/login", "/auth/register"].includes(url)) {
            clientSessionToken.Token = (payload as any).data.token;
            clientSessionToken.Expires = (payload as any).data.expiresAt;
            const vnTime = new Date(
                (payload as any).data.expiresAt,
            ).toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh",
            });
        }

        return data;
    } catch (error: any) {
        // Nếu lỗi là do chủ động hủy request (signal) thì ta bỏ qua, không báo lỗi
        if (error.name === "AbortError") {
            return;
        }
        // Các lỗi khác thì mới ném ra tiếp
        throw error;
    }
};

export const http = {
    get<Response>(
        url: string,
        option?: Omit<CustomRequestInit, "body"> | undefined,
    ) {
        return request<Response>("GET", url, option);
    },
    post<Response>(
        url: string,
        body: any,
        option?: Omit<CustomRequestInit, "body"> | undefined,
    ) {
        return request<Response>("POST", url, { ...option, body });
    },
    put<Response>(
        url: string,
        body: any,
        option?: Omit<CustomRequestInit, "body"> | undefined,
    ) {
        return request<Response>("PUT", url, { ...option, body });
    },
    delete<Response>(
        url: string,
        option?: Omit<CustomRequestInit, "body"> | undefined,
    ) {
        return request<Response>("DELETE", url, option);
    },
};
