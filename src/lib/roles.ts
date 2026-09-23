import { z } from 'zod';

export const roleSchema = z.enum(['CUSTOMER', 'SELLER', 'ADMIN', 'OWNER']);

export const roleFromString = (value: string) => {
  const parsed = roleSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
};

export function canAccessResource(userRole: string | undefined | null, requiredRoles: string[]) {
  if (!userRole) return false;
  return requiredRoles.includes(userRole);
}
