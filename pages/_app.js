import Head from 'next/head'
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import "../styles/tailwind.css";

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    // Google Analytics
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, []);

  return (
    <>
      <Head>
        <title>Scaas - 簡単・便利なスクリーションショットAPIサービス</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Scaas(スキャース)は、URLを指定するだけで画面キャプチャを使えるシンプルなスクリーンショット作成サービスです" />
        <meta name="keywords" content="Scaas,スキャース,スクリーンショット,画面キャプチャ,縦長画面,日本語フォント,API" />
        <meta property="og:title" content="Scaas - 簡単・便利なスクリーションショットAPIサービス" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://scaas.vercel.app" />
        <meta property="og:image" content="https://scaas.vercel.app/api?url=https://scaas.vercel.app&viewportWidth=1200&viewportHeight=600&maxAge=2592000" />
        <meta property="og:site_name" content="Scaas - 簡単・便利なスクリーションショットAPIサービス" />
        <meta property="og:description" content="Scaas(スキャース)は、URLを指定するだけで画面キャプチャを使えるシンプルなスクリーンショット作成サービスです" />
        <meta property="og:locale" content="ja_JP" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content="Scaas(スキャース)は、URLを指定するだけで画面キャプチャを使えるシンプルなスクリーンショット作成サービスです" />
        <meta name="twitter:image:src" content="https://scaas.vercel.app/api?url=https://scaas.vercel.app&viewportWidth=1200&viewportHeight=600&maxAge=2592000" />
        <link rel="canonical" href="https://scaas.vercel.app" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App
