import { createTheme, Text } from '@mantine/core';
import classes from './text.module.css';

const textTheme = createTheme({
  components: {
    Text: Text.extend({
      classNames: {
        root: classes.root,
      },
    }),
  },
});

export default textTheme;
