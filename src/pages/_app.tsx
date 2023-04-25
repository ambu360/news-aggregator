import  '../styles/globals.scss'
import {useState,createContext} from 'react'
import SearchContext from '@/context/context'
import type { AppProps } from "next/app";
import { GetStaticProps } from 'next';
import { Lato } from "next/font/google";
import Navbar from "@/components/nav-bar/Navbar.component";
import Headlines from '@/components/headlines/HomePageTopHeadlines.component';

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }:AppProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
    const [beginSearchFetch, setBeginSearchFetch] = useState<boolean>(false)

  return (
    <SearchContext.Provider value={{searchTerm,setSearchTerm,beginSearchFetch,setBeginSearchFetch}}>
    <main className={`${lato.className}`}>
      <Component {...pageProps}/>
      
    </main>
    </SearchContext.Provider>
  );
}


