import { ProductApiRequest } from "@/apiRequest/product";
import { UpdateProductForm } from "@/components/product/update-product.form";
import { ProductResType } from "@/schemaValidations/product.schema";
import { notFound } from "next/navigation";

export default async function ProductDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    if (isNaN(Number(id))) {
        notFound();
    }
    let product: ProductResType["data"] | null = null;
    try {
        const res = await ProductApiRequest.getDetail(Number(id));
        product = res?.payload.data as ProductResType["data"];
    } catch {
        notFound();
    }

    if (!product) {
        notFound();
    }

    return <UpdateProductForm {...product} />;
}
