import { createTheme } from '@mantine/core';

const colorTheme = createTheme({

  primaryColor: 'leaf',
  primaryShade: 6,

  white: '#fffdf8',
  black: '#203127',

  colors: {
    leaf: [
      '#edf6f0',
      '#deebe2',
      '#bdd7c6',
      '#98c1a8',
      '#78af8d',
      '#5b9c74',
      '#4b9068',
      '#3c7b58',
      '#316849',
      '#29553c',
    ],
    sand: [
      '#faf5eb',
      '#f1e6d1',
      '#e8d3af',
      '#debf8c',
      '#d4ab6d',
      '#cb984d',
      '#be893f',
      '#a77533',
      '#91652b',
      '#7b5422',
    ],
    coral: [
      '#fff1e7',
      '#ffe0cf',
      '#fcc0a0',
      '#f89e6f',
      '#f68145',
      '#f46d2a',
      '#e85f1d',
      '#ce4f13',
      '#b7460d',
      '#9f3b04',
    ],
  },

  other: {
    background: '#f4efe5',
    backgroundStrong: '#eadfce',
    surface: 'rgba(255, 251, 244, 0.88)',
    surfaceStrong: '#fffdf8',
    surfaceMuted: 'rgba(245, 239, 229, 0.94)',
    border: 'rgba(76, 98, 84, 0.18)',
    text: '#213127',
    muted: '#667868',
    primary: '#4b9068',
    primaryStrong: '#316849',
    accent: '#cb984d',
    accentSoft: '#f1e6d1',
    successSoft: '#edf6f0',
  },
});

export default colorTheme;
