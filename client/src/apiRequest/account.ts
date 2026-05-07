import { http } from "@/lib/http";
import { UpdateMeBodyType } from "@/schemaValidations/account.schema";

export const AccountApiRequest = {
    me: (sesstionToken: string, signal?: AbortSignal | null | undefined) =>
        http.get("/account/me", {
            headers: {
                Authorization: `Bearer ${sesstionToken}`,
            },
            signal,
        }),
    updateMe: (formData: UpdateMeBodyType) => http.put("/account/me", formData),
};
