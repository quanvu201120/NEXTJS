import { LoginForm } from "@/components/login/login-form";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Đăng nhập",
    description: "Đây là trang Đăng nhập",
};

export default function Login() {
    return (
        <div>
            <LoginForm />
        </div>
    );
}
