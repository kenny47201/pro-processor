import { describe, it, expect } from 'vitest';
import { defectGuides } from '../defectGuides';

describe('defectGuides', () => {
  it('should be sorted alphabetically by title', () => {
    const titles = defectGuides.map((g) => g.title);
    const sorted = [...titles].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
    expect(titles).toEqual(sorted);
  });

  it('should be sorted alphabetically by slug', () => {
    const slugs = defectGuides.map((g) => g.slug);
    const sorted = [...slugs].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
    expect(slugs).toEqual(sorted);
  });
});
