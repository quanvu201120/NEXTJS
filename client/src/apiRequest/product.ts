import { http } from "@/lib/http";
import {
    CreateProductBodyType,
    ProductListResType,
    ProductResType,
    UpdateProductBodyType,
} from "@/schemaValidations/product.schema";

export const ProductApiRequest = {
    get: () => http.get<ProductListResType>("/products"),
    create: (body: CreateProductBodyType) =>
        http.post<ProductResType>("/products", body),
    uploadImage: (formData: FormData) =>
        http.post<{ data: string; message: string }>("/media/upload", formData),
    getDetail: (id: number) => http.get<ProductResType>(`/products/${id}`),
    update: (id: number, body: UpdateProductBodyType) =>
        http.put<ProductResType>(`/products/${id}`, body),
    delete: (id: number) => http.delete<{ message: string }>(`/products/${id}`),
};
