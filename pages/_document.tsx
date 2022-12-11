import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="favicon.ico" rel="shortcut icon" as="" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link href="site.webmanifest" rel="manifest" />
        <link rel="preload" as="image" href="/avatar.jpg" />
        <meta
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          name="robots"
        />
      </Head>
      <body className="bg-gray-50 dark:bg-zinc-900 text-gray-50 dark:text-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}