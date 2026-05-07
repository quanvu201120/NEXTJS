import { AuthApiRequest } from "@/apiRequest/auth";
import { decodePayloadJWT } from "@/lib/utils";
import {
    PayloadJwtType,
    SlideSessionResType,
} from "@/schemaValidations/auth.schema";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("sessionToken");
    const expiresAtSession = cookieStore.get("expiresAtSession");

    /* Lấy thời gian hết hạn của token từ JWT */

    if (!token) {
        return Response.json(
            { message: "Không tìm thấy token" },
            { status: 401 },
        );
    }

    try {
        const res = await AuthApiRequest.slideSessionFormNextServerToServer(
            token.value,
        );
        const payload = res?.payload as SlideSessionResType;
        (await cookies()).set("sessionToken", payload.data.token, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: new Date(payload.data.expiresAt),
        });
        (await cookies()).set("expiresAtSession", payload.data.expiresAt, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: new Date(payload.data.expiresAt),
        });

        return Response.json({ ...payload }, { status: 200 });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return Response.json({}, { status: error?.status || 500 });
    }
}
