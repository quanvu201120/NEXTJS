import { AuthApiRequest } from "@/apiRequest/auth";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const sesstionToken = cookieStore.get("sessionToken")?.value;

    try {
        const result_logout = await AuthApiRequest.logoutFromNextServerToServer(
            sesstionToken as string,
        );
    } catch (error) {
    } finally {
        cookieStore.delete("sessionToken");
        cookieStore.delete("expiresAtSession");
        return Response.json({ success: true }, { status: 200 });
    }
}
