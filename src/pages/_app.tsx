import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GlobalProvider } from '../contexts/Global'
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <GlobalProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </GlobalProvider>
  )
}
