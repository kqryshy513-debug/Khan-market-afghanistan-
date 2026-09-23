import { describe, expect, it } from 'vitest';

import { safeErrorMessage } from './validation';

describe('safe error handling', () => {
  it('returns the underlying message for errors', () => {
    expect(safeErrorMessage(new Error('Server failure'))).toBe('Server failure');
  });

  it('returns a general message for unknown values', () => {
    expect(safeErrorMessage({ some: 'value' })).toBe('An unexpected error occurred.');
  });
});
