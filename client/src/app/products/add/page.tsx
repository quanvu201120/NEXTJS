import { AddProductForm } from "@/components/product/add-product.form";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Thêm sản phẩm",
    description: "Đây là trang thêm sản phẩm",
};
export default async function AddProduct() {
    return (
        <div>
            <AddProductForm />
        </div>
    );
}
