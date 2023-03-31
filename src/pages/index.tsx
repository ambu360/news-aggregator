import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { nanoid } from "nanoid";
import { Lato } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Navbar from "@/components/nav-bar/Navbar.component";
import HomePageTopHeadlines from "@/components/headlines/HomePageTopHeadlines.component";

const inter = Lato({
  weight: "400",
  subsets: ["latin"],
});

export interface Article {
  id:string;
  source:{
      id:string | number;
      name:string
  }
  author?: string;
  title:string;
  description:string;
  url:string;
  urlToImage?:string;
  publishedAt:Date;
  content:string;
}

export default function Home({articles}:{articles:Article[]}) {
  
  
  

  return <>
   <Navbar />
      <HomePageTopHeadlines articles={articles}/>
  </>;
}


export const  getServerSideProps:GetServerSideProps = async () => {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_KEY; 
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
  const data = await response.json();

  if (!data || data.status !== 'ok') {
    return {
      notFound: true,
    }
  }

 data.articles.map((item:any) => ({id:nanoid(), ...item}))
  return {
    props: {
      articles: data.articles,
    },
  }
}