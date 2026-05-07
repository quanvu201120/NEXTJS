import { cookies } from "next/headers";
import { AccountApiRequest } from "../../apiRequest/account";
import { AccountResType } from "@/schemaValidations/account.schema";
import { MeProfile } from "./me-profile";

export default async function MePage() {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("sessionToken");

    const res = await AccountApiRequest.me(token?.value as string);
    const payload = res?.payload as AccountResType;

    return (
        <div>
            <MeProfile profile={payload.data} />
        </div>
    );
}
