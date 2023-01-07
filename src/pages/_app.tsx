import "../styles/globals.css"
import type { AppProps } from "next/app"
import { GlobalProvider } from "../contexts/Global"
import { SessionProvider } from "next-auth/react";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, PointElement, LineElement, Title, Tooltip, Legend);


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <GlobalProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </GlobalProvider>
  )
}
