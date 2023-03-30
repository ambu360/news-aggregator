import Head from "next/head";
import Image from "next/image";

import { Lato } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Navbar from "@/components/nav-bar/Navbar.component";
import HomePageTopHeadlines from "@/components/headlines/HomePageTopHeadlines.component";
const inter = Lato({
  weight: "400",
  subsets: ["latin"],
});

export default function Home({articles}:any) {
  
  

  return <>
   <Navbar />
      <HomePageTopHeadlines articles={articles}/>
  </>;
}


export async function getServerSideProps() {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_KEY; 
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
  const data = await response.json();
  //console.log(data)
  if (!data || data.status !== 'ok') {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      articles: data.articles,
    },
  }
}