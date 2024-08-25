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
});

type ENVIRONMENT = z.infer<typeof envSchema>;
export const ENV: ENVIRONMENT = envSchema.parse(process.env);
