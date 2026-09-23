import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
});

export const userUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().trim().email().optional()
});

export function validateLoginInput(payload: unknown) {
  return loginSchema.safeParse(payload);
}

export function safeErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred.';
}
