"use client";

import { clientSessionToken } from "@/lib/http";
import { useState } from "react";

export function AppProvider({
    children,
    initSessionToken = "",
    initExpires = "",
}: {
    children: React.ReactNode;
    initSessionToken: string;
    initExpires: string;
}) {
    useState(() => {
        clientSessionToken.Token = initSessionToken;
        clientSessionToken.Expires = initExpires;
    });

    return children;
}
