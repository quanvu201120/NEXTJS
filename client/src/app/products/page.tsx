// src/app/products/page.tsx

import { ProductApiRequest } from "@/apiRequest/product";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteProduct from "../../components/product/delete-product";

export default async function ProductPage() {
    const res = await ProductApiRequest.get();
    const list = res?.payload.data;
    console.log("products ", list);

    return (
        <div className="space-y-8 w-full max-w-5xl mx-auto py-8 px-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-center">
                    Danh sách sản phẩm
                </h1>
                <Button>
                    <Link href="/products/add">Thêm sản phẩm</Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {list?.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-xl p-4 flex flex-col space-y-3 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="aspect-square relative overflow-hidden rounded-lg">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 space-y-1">
                            <h3 className="font-semibold text-lg line-clamp-1">
                                {product.name}
                            </h3>
                            <p className="text-sm text-zinc-500 line-clamp-2 italic">
                                {product.description}
                            </p>
                        </div>
                        <p className="text-blue-600 font-bold text-lg">
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(product.price)}
                        </p>
                        <div className="flex justify-end gap-2 pt-2 border-t mt-auto">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/products/${product.id}`}>
                                    Sửa
                                </Link>
                            </Button>
                            <DeleteProduct id={product.id} />
                        </div>
                    </div>
                ))}
            </div>

            {list?.length === 0 && (
                <p className="text-center text-zinc-500 italic">
                    Hệ thống chưa có sản phẩm nào.
                </p>
            )}
        </div>
    );
}
