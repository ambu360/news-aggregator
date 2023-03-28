import  '../styles/globals.scss'
import type { AppProps } from "next/app";
import { GetStaticProps } from 'next';
import { Lato } from "next/font/google";
import Navbar from "@/components/nav-bar/Navbar.component";
import Headlines from '@/components/headlines/Headlines.component';

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }:AppProps) {
  return (
    <main className={`${lato.className}`}>
      <Component {...pageProps}/>
      
    </main>
  );
}


