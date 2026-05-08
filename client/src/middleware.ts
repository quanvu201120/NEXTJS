import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePath = ["/me"];
const authPath = ["/login", "/register"];

export async function middleware(request: NextRequest) {
    const cookiesStore = await cookies();
    const sessionToken = cookiesStore.get("sessionToken")?.value;
    const pathname = request.nextUrl.pathname;

    if (!sessionToken && privatePath.some((i) => pathname.startsWith(i))) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (sessionToken && authPath.some((i) => pathname.startsWith(i))) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/me", "/login", "/register"],
};
