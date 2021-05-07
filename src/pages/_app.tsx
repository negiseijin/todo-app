import { AuthProvider, useAuthCtx } from '@/lib/authContext'

import { AppProps } from 'next/app'
import Head from 'next/head'

import '@/styles/globals.css'

const MyApp = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props
  const auth = useAuthCtx()

  return (
    <>
      <Head>
        <title>{pageProps.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AuthProvider value={auth}>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp
