'use client';

import { Input, TextInput, Select, NumberInput, createTheme } from '@mantine/core';
import classes from './input.module.css';

const inputTheme = createTheme({
  components: {
    Input: Input.extend({
      defaultProps: { variant: 'filled' },
      classNames: { input: classes.customFilled },
    }),
    TextInput: TextInput.extend({
      defaultProps: { variant: 'filled' },
      classNames: { input: classes.customFilled },
    }),
    Select: Select.extend({
      defaultProps: { variant: 'filled' },
      classNames: { input: classes.customFilled },
    }),
    NumberInput: NumberInput.extend({
      defaultProps: { variant: 'filled' },
      classNames: { input: classes.customFilled },
    }),
  },
});

export default inputTheme;
