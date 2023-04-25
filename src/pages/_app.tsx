import '../styles/globals.scss'
import { useState, createContext } from 'react'
import SearchContext from '@/context/context'
import type { AppProps } from "next/app";
import { Lato } from "next/font/google";


const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [beginSearchFetch, setBeginSearchFetch] = useState<boolean>(false)

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, beginSearchFetch, setBeginSearchFetch }}>
      <main className={`${lato.className}`}>
        <Component {...pageProps} />

      </main>
    </SearchContext.Provider>
  );
}


