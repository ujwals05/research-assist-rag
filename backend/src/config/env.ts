
import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables
dotenv.config();

// Define environment schema
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce
    .number()
    .int()
    .positive()
    .default(5000),

  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required"),

//   GEMINI_API_KEY: z
//     .string()
//     .min(1, "GEMINI_API_KEY is required"),

  SUPABASE_URL: z
    .string()
    .url("Invalid Supabase URL"),

  SUPABASE_SECRET_KEY: z
    .string()
    .min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),
});

// Validate environment variables
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables:",
    z.treeifyError(parsedEnv.error)
  );

  process.exit(1);
}

// Export validated environment variables
export const env = parsedEnv.data;
