import localFont from "next/font/local";
import "./globals.css";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { SessionProvider } from "next-auth/react";
import { BasketProvider } from "@/components/context/BasketProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import Navbar from "@/components/navigation/NavBar";
import { Notifications } from "@mantine/notifications";
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Nutrition Recommendations",
  description: "A web app to recommend food based on nutrient deficiency in your diet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
        <head>
          <ColorSchemeScript />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <GoogleTagManager gtmId="GTM-TNCF4GJC"/>
          <SessionProvider>
            <MantineProvider withGlobalStyles withNormalizeCSS withCssVariables={true}>
              <Notifications/>
              <BasketProvider>
                <Navbar>
                { children }
                </Navbar>
              </BasketProvider>
            </MantineProvider>
          </SessionProvider>
        </body>
    </html>
  );
}

