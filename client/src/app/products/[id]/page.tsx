import { ProductApiRequest } from "@/apiRequest/product";
import { UpdateProductForm } from "@/components/product/update-product.form";
import { ProductResType } from "@/schemaValidations/product.schema";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const res = await ProductApiRequest.getDetail(Number(id));
    const product = res?.payload.data as ProductResType["data"];

    return {
        title: product?.name,
        description: product?.description,
    };
}

export default async function ProductDetail({ params }: Props) {
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
