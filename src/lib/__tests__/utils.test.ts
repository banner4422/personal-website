import { describe, it, expect } from 'vitest';
import { classNames, getHoverBgClass, formatArticleDate, formatPostDate } from '../utils';

describe('classNames', () => {
  it('should join class names with spaces', () => {
    expect(classNames('foo', 'bar')).toBe('foo bar');
  });

  it('should filter out falsy values', () => {
    expect(classNames('foo', null, 'bar', undefined, false, '')).toBe('foo bar');
  });

  it('should return an empty string when no classes are provided', () => {
    expect(classNames()).toBe('');
  });

  it('should return an empty string when all values are falsy', () => {
    expect(classNames(null, false, undefined)).toBe('');
  });
});

describe('getHoverBgClass', () => {
  it('should return instagram-gradient-button for Instagram', () => {
    expect(getHoverBgClass('Instagram')).toBe('instagram-gradient-button');
  });

  it('should return hover-bg-{colour} for other colours', () => {
    expect(getHoverBgClass('Twitter')).toBe('hover-bg-Twitter');
    expect(getHoverBgClass('GitHub')).toBe('hover-bg-GitHub');
    expect(getHoverBgClass('LinkedIn')).toBe('hover-bg-LinkedIn');
  });
});

describe('formatArticleDate', () => {
  it('should format date in long format (weekday, month, day, year)', () => {
    // Using a fixed date for consistent testing
    const date = new Date('2023-01-15T12:00:00Z');
    
    // Note: The exact output might depend on the timezone where the test is run
    // This test assumes en-US locale as specified in the function
    const formattedDate = formatArticleDate(date);
    
    // Check that the format contains the expected parts
    expect(formattedDate).toContain('January');
    expect(formattedDate).toContain('15');
    expect(formattedDate).toContain('2023');
    
    // Alternative approach with a regex pattern
    expect(formattedDate).toMatch(/\w+, January 15, 2023/);
  });
});

describe('formatPostDate', () => {
  it('should format date in short format (day, short month, year)', () => {
    // Using a fixed date for consistent testing
    const date = new Date('2023-01-15T12:00:00Z');
    
    // Note: The exact output might depend on the timezone where the test is run
    // This test assumes en-GB locale as specified in the function
    const formattedDate = formatPostDate(date);
    
    // Check that the format contains the expected parts
    expect(formattedDate).toContain('15');
    expect(formattedDate).toContain('Jan');
    expect(formattedDate).toContain('2023');
    
    // Alternative approach with a regex pattern
    expect(formattedDate).toMatch(/15 Jan 2023/);
  });
});