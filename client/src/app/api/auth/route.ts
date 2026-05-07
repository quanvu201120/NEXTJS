import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { token, expiresAt } = await req.json();

    if (typeof token !== "string" || !token.trim()) {
        return Response.json(
            { success: false, message: "Invalid session token" },
            { status: 400 },
        );
    }
    /* Lấy thời gian hết hạn của token từ JWT */

    (await cookies()).set("sessionToken", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(expiresAt),
    });
    (await cookies()).set("expiresAtSession", expiresAt, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(expiresAt),
    });

    return Response.json({ success: true }, { status: 200 });
}
