import localFont from 'next/font/local';
import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';

import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { GoogleTagManager } from '@next/third-parties/google';
import Providers from './Providers';
import Navbar from '@/components/navigation/NavBar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'Nutrition Recommendations',
  description: 'A web app to recommend food based on nutrient deficiency in your diet',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GoogleTagManager gtmId="GTM-TNCF4GJC" />
        <Providers>
          <Navbar>{children}</Navbar>
        </Providers>
      </body>
    </html>
  );
}
