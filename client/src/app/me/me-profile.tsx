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
import { LoginResType } from "@/schemaValidations/auth.schema";
import { useRouter } from "next/navigation";
import { HandleErrorFormApi } from "@/lib/utils";
import { AuthApiRequest } from "@/apiRequest/auth";
import {
    AccountResType,
    UpdateMeBody,
    UpdateMeBodyType,
} from "@/schemaValidations/account.schema";
import { AccountApiRequest } from "@/apiRequest/account";

type UpdateProfileType = {
    profile: AccountResType["data"];
};

export function MeProfile({ profile }: UpdateProfileType) {
    const form = useForm<UpdateMeBodyType>({
        resolver: zodResolver(UpdateMeBody),
        defaultValues: {
            name: profile.name,
        },
    });

    const router = useRouter();

    async function onSubmit(formData: UpdateMeBodyType) {
        try {
            const result = await AccountApiRequest.updateMe(formData);
            router.refresh();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            HandleErrorFormApi(error, form.setError);
        }
    }

    return (
        <Card className="w-[70vw]">
            <CardHeader className="text-center">
                <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="form-rhf-demo-title">
                                Email
                            </FieldLabel>
                            <Input
                                type="text"
                                id="form-rhf-demo-title"
                                value={profile.email}
                                disabled
                            />
                        </Field>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        type="text"
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
            <CardFooter className="text-center">
                <Button
                    className="ml-auto mr-auto"
                    type="submit"
                    form="form-rhf-demo"
                    disabled={form.formState.isSubmitting}
                >
                    Update
                </Button>
            </CardFooter>
        </Card>
    );
}
