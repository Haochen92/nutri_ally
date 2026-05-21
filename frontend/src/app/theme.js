import { createTheme } from "@mantine/core";

export const appTheme = createTheme({
  primaryColor: "leaf",
  primaryShade: 6,
  defaultRadius: "md",
  white: "#fffdf8",
  black: "#203127",
  colors: {
    leaf: [
      "#edf6f0",
      "#deebe2",
      "#bdd7c6",
      "#98c1a8",
      "#78af8d",
      "#5b9c74",
      "#4b9068",
      "#3c7b58",
      "#316849",
      "#29553c",
    ],
    sand: [
      "#faf5eb",
      "#f1e6d1",
      "#e8d3af",
      "#deb f8c",
      "#d4ab6d",
      "#cb984d",
      "#be893f",
      "#a77533",
      "#91652b",
      "#7b5422",
    ],
    coral: [
      "#fff1e7",
      "#ffe0cf",
      "#fcc0a0",
      "#f89e6f",
      "#f68145",
      "#f46d2a",
      "#e85f1d",
      "#ce4f13",
      "#b7460d",
      "#9f3b04",
    ],
  },
  fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
  fontFamilyMonospace: "var(--font-geist-mono), monospace",
  headings: {
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
    fontWeight: "700",
    sizes: {
      h1: {
        fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
        lineHeight: "1.02",
      },
      h2: {
        fontSize: "clamp(2rem, 4vw, 3rem)",
        lineHeight: "1.08",
      },
      h3: {
        fontSize: "clamp(1.35rem, 2.2vw, 1.8rem)",
        lineHeight: "1.16",
      },
    },
  },
  shadows: {
    xs: "0 8px 20px rgba(41, 58, 47, 0.08)",
    sm: "0 14px 32px rgba(41, 58, 47, 0.10)",
    md: "0 22px 54px rgba(41, 58, 47, 0.12)",
  },
});
