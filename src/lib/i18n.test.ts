import { describe, expect, it } from 'vitest';

import { getDirection, getLocaleFromPath } from './i18n';

describe('i18n', () => {
  it('resolves locale from path', () => {
    expect(getLocaleFromPath('/ps/dashboard')).toBe('ps');
    expect(getLocaleFromPath('/fa/admin')).toBe('fa');
    expect(getLocaleFromPath('/unknown')).toBe('en');
  });

  it('returns correct direction', () => {
    expect(getDirection('en')).toBe('ltr');
    expect(getDirection('fa')).toBe('rtl');
  });
});
