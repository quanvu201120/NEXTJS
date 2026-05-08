"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { HandleErrorFormApi } from "@/lib/utils";
import {
    CreateProductBody,
    CreateProductBodyType,
    ProductResType,
} from "@/schemaValidations/product.schema";
import { Textarea } from "../ui/textarea";
import { ProductApiRequest } from "@/apiRequest/product";
import { useState } from "react";
import Image from "next/image";

export function UpdateProductForm(detail: ProductResType["data"]) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const form = useForm<CreateProductBodyType>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(CreateProductBody) as any,
        defaultValues: {
            price: detail.price,
            description: detail.description,
            image: detail.image,
            name: detail.name,
        },
    });

    const router = useRouter();

    async function onSubmit(formData: CreateProductBodyType) {
        const isUnchanged =
            formData.name === detail.name &&
            formData.price === detail.price &&
            formData.description === detail.description &&
            formData.image === detail.image;
        if (isUnchanged) {
            return;
        }

        try {
            let imageUrl = "";
            if (formData.image !== detail.image) {
                const formDataImageUpload = new FormData();
                formDataImageUpload.append("file", imageFile as Blob);
                const resUploadImage =
                    await ProductApiRequest.uploadImage(formDataImageUpload);
                imageUrl = resUploadImage?.payload.data as string;
            } else {
                imageUrl = detail.image;
            }

            const result = await ProductApiRequest.update(detail.id, {
                ...formData,
                image: imageUrl,
            });

            console.log("update product ", result);
            router.refresh();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            HandleErrorFormApi(error, form.setError);
        }
    }

    return (
        <Card className="w-[70vw]">
            <CardHeader>
                <CardTitle>PRODUCT DETAIL</CardTitle>
            </CardHeader>
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-name">
                                        Name
                                    </FieldLabel>
                                    <Input
                                        type="text"
                                        {...field}
                                        id="form-rhf-demo-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter product name"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="price"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-price">
                                        Price
                                    </FieldLabel>
                                    <Input
                                        type="number"
                                        {...field}
                                        id="form-rhf-demo-price"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter product price"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="image"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-image">
                                        Image
                                    </FieldLabel>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onBlur={field.onBlur}
                                        name={field.name}
                                        ref={field.ref}
                                        id="form-rhf-demo-image"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter product price"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            const file = e.target?.files?.[0];
                                            if (file) {
                                                setImageFile(file);
                                                field.onChange(
                                                    "http://localhost:2999/" +
                                                        file.name,
                                                );
                                            }
                                        }}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Image
                            src={
                                imageFile
                                    ? URL.createObjectURL(imageFile)
                                    : detail.image
                            }
                            alt=""
                            width={200}
                            height={200}
                            className=" object-cover mt-4"
                            unoptimized
                        />

                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-des">
                                        Description
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="form-rhf-demo-des"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter product description"
                                        autoComplete="off"
                                        rows={3}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            form.reset();
                            setImageFile(null);
                        }}
                        disabled={form.formState.isSubmitting}
                    >
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        form="form-rhf-demo"
                        disabled={form.formState.isSubmitting}
                    >
                        Cập nhật
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}
