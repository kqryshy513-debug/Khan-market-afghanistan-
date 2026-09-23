import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  SESSION_SECRET: z.string().min(16),
  APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: z.string().default('Khan Market Afghanistan'),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.enum(['en', 'ps', 'fa']).default('en'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_RATE_LIMIT_PER_MINUTE: z.coerce.number().default(60),
  STORAGE_PROVIDER: z.string().default('NOT_CONFIGURED'),
  PAYMENT_PROVIDER: z.string().default('NOT_CONFIGURED'),
  DELIVERY_PROVIDER: z.string().default('NOT_CONFIGURED'),
  EMAIL_PROVIDER: z.string().default('NOT_CONFIGURED')
});

export const env = envSchema.parse(process.env);
