import { http } from "@/lib/http";
import {
    CreateProductBodyType,
    ProductListResType,
    ProductResType,
} from "@/schemaValidations/product.schema";

export const ProductApiRequest = {
    get: () => http.get<ProductListResType>("/products"),
    create: (body: CreateProductBodyType) =>
        http.post<ProductResType>("/products", body),
    uploadImage: (formData: FormData) =>
        http.post<{ data: string; message: string }>("/media/upload", formData),
};
