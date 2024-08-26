import z from 'zod';
import { config } from 'dotenv';

config();

const envSchema = z.object({
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DATABASE_URL: z.string(),
  SALT: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number(),
  EMAIL_SERVER: z.string(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
});

type ENVIRONMENT = z.infer<typeof envSchema>;
export const ENV: ENVIRONMENT = envSchema.parse(process.env);
