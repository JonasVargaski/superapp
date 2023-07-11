import { z } from "@/lib/zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXTAUTH_SECRET: z.string().nonempty(),
  NEXTAUTH_URL: z.string().nonempty(),
  POSTGRES_HOST: z.string().nonempty(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_USER: z.string().nonempty(),
  POSTGRES_PASSWORD: z.string().nonempty(),
  POSTGRES_DB: z.string().nonempty(),
  DATABASE_URL: z.string().nonempty(),
  GOOGLE_CLIENT_ID: z.string().nonempty(),
  GOOGLE_CLIENT_SECRET: z.string().nonempty(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    "\n\n🚨🚨🚨 Invalid environment variables: ",
    _env.error.format(),
    "\n\n\n"
  );

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
