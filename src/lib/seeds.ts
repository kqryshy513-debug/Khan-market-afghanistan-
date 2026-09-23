import { z } from 'zod';

export const userSeedSchema = z.object({
  email: z.string().trim().email(),
  name: z.string().min(2).max(80).optional(),
  role: z.enum(['CUSTOMER', 'SELLER', 'ADMIN', 'OWNER']).default('CUSTOMER')
});

export function validateSeedUser(payload: unknown) {
  return userSeedSchema.safeParse(payload);
}
