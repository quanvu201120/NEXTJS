import { RegisterForm } from "@/components/register/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng ký",
    description: "Đây là trang Đăng ký",
};
export default function Register() {
    return <RegisterForm />;
}
