import { Html, Head, Main, NextScript } from 'next/document';
import { AppConfig } from '../utils/AppConfig';
import Script from 'next/script';
import Link from 'next/link';

export default function Document() {
  return (
    <Html className="bg-gray-900 scroll-smooth" lang={AppConfig.locale}>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
