"use client";

import { Button } from "@/components/ui/button";
import { ProductApiRequest } from "@/apiRequest/product";
import { useRouter } from "next/navigation";

export default function DeleteProduct({ id }: { id: number }) {
    const router = useRouter();
    const handleDelete = async () => {
        const isConfirmed = window.confirm(
            "Bạn có chắc chắn muốn xóa sản phẩm này không?",
        );
        if (isConfirmed) {
            try {
                await ProductApiRequest.delete(id);
                router.refresh();
            } catch (error) {
                console.error("Lỗi khi xóa:", error);
            }
        }
    };

    return (
        <Button variant="destructive" size="sm" onClick={handleDelete}>
            Xóa
        </Button>
    );
}
