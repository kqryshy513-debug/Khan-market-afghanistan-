import { describe, expect, it } from 'vitest';

import { canAccessResource, roleFromString } from './roles';
import { validateLoginInput } from './validation';

describe('auth validation', () => {
  it('rejects invalid login payloads', () => {
    const result = validateLoginInput({ email: 'invalid', password: 'short' });
    expect(result.success).toBe(false);
  });

  it('accepts valid login payloads', () => {
    const result = validateLoginInput({ email: 'user@example.com', password: 'longsecurepassword' });
    expect(result.success).toBe(true);
  });
});

describe('role gating', () => {
  it('validates role strings', () => {
    expect(roleFromString('ADMIN')).toBe('ADMIN');
    expect(roleFromString('HACKER')).toBeNull();
  });

  it('allows authorized roles', () => {
    expect(canAccessResource('ADMIN', ['ADMIN', 'OWNER'])).toBe(true);
    expect(canAccessResource('CUSTOMER', ['ADMIN', 'OWNER'])).toBe(false);
  });
});
