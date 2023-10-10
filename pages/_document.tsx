import { Html, Head, Main, NextScript } from 'next/document';
import { AppConfig } from '../utils/AppConfig';
import Script from 'next/script';
import Link from 'next/link';

export default function Document() {
  return (
    <Html className="bg-gray-900 scroll-smooth" lang={AppConfig.locale}>
      <Head>
        <Link
          rel="stylesheet"
          href="https://unpkg.com/flowbite@1.4.5/dist/flowbite.min.css"
        />
        <Script async src="https://js.stripe.com/v3/"></Script>
      </Head>
      <body>
        <Script src="https://unpkg.com/flowbite@1.4.5/dist/flowbite.js"></Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
