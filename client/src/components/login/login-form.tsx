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
import {
    LoginBody,
    LoginBodyType,
    LoginResType,
} from "@/schemaValidations/auth.schema";
import { http } from "@/lib/http";
import { useRouter } from "next/navigation";
import { HandleErrorFormApi } from "@/lib/utils";
import { AuthApiRequest } from "@/apiRequest/auth";

export function LoginForm() {
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter();

    async function onSubmit(formData: LoginBodyType) {
        try {
            const result = await AuthApiRequest.login(formData);
            const { token, expiresAt } = (result?.payload as LoginResType).data;
            const result_api_cookie = await AuthApiRequest.auth(
                token,
                expiresAt,
            );

            // eslint-disable-next-line react-hooks/immutability
            router.replace("/");
            router.refresh();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            HandleErrorFormApi(error, form.setError);
        }
    }

    return (
        <Card className=" sm:max-w-md">
            <CardHeader>
                <CardTitle>LOGIN</CardTitle>
            </CardHeader>
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        type="email"
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your email"
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
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        type="password"
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your password"
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
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                        disabled={form.formState.isSubmitting}
                    >
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        form="form-rhf-demo"
                        disabled={form.formState.isSubmitting}
                    >
                        Login
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}
