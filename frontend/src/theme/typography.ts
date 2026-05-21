import { createTheme, rem } from '@mantine/core';

const typographyTheme = createTheme({
  fontFamily: 'var(--font-geist-sans), Arial, Helvetica, sans-serif',
  fontFamilyMonospace: 'var(--font-geist-mono), monospace',

  headings: {
    fontFamily: 'var(--font-geist-sans), Arial, Helvetica, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: {
        fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
        lineHeight: '1.02',
      },
      h2: {
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        lineHeight: '1.08',
      },
      h3: {
        fontSize: 'clamp(1.35rem, 2.2vw, 1.8rem)',
        lineHeight: '1.16',
      },
      h4: {
        fontSize: rem(24),
        lineHeight: '1.2',
      },
      h5: {
        fontSize: rem(20),
        lineHeight: '1.3',
      },
      h6: {
        fontSize: rem(18),
        lineHeight: '1.4',
      },
    },
  },

  fontSizes: {
    xs: rem(13),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },

  lineHeights: {
    xs: '1.5',
    sm: '1.55',
    md: '1.6',
    lg: '1.6',
    xl: '1.5',
  },

  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  radius: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(20),
    xl: rem(24),
  },

  defaultRadius: 'md',

  shadows: {
    xs: '0 8px 20px rgba(41, 58, 47, 0.08)',
    sm: '0 14px 32px rgba(41, 58, 47, 0.10)',
    md: '0 22px 54px rgba(41, 58, 47, 0.12)',
  },
});

export default typographyTheme;
