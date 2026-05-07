import z from "zod";

const configSchema = z.object({
    NEXT_PUBLIC_API_ENDPOINT: z.string(),
});

const parsedConfig = configSchema.safeParse({
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

if (!parsedConfig.success) {
    console.error(
        "❌ parsedConfig Invalid environment variables:",
        parsedConfig.error.issues,
    );
    throw new Error("Invalid environment variables");
}

export const envConfig = parsedConfig.data;
