import Head from 'next/head'
import { AppProps } from 'next/app'

const MyApp = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props
  return (
    <>
      <Head>
        <title>{pageProps.title}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
