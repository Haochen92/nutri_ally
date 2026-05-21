'use client';

import { mergeThemeOverrides } from '@mantine/core';
import colorTheme from './colors';
import typographyTheme from './typography';
import componentsTheme from './components/index';

const customTheme = mergeThemeOverrides(
  typographyTheme,
  colorTheme,
  componentsTheme,
);

export default customTheme;
