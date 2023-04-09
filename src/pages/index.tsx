import { GetServerSideProps } from "next";
import { useState,useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { nanoid } from "nanoid";
import { Lato } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Navbar from "@/components/nav-bar/Navbar.component";
import HomePageTopHeadlines from "@/components/headlines/HomePageTopHeadlines.component";
import WeatherApp from "@/components/weatherApp/WeatherApp.component";

export interface Props {
  position:GeolocationCoordinates | null
}
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
  publishedAt:Date | string;
  content:string;
}

export default function Home({articles}:{articles:Article[]}) {
  const [searchTerm,setSearchTerm] = useState<string>('')
  const [position,setPosition] = useState<GeolocationCoordinates | null>(null)
  const [country,setCountry] = useState<String>('')
  //console.log(position)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition(pos.coords)
          const lat = pos.coords.latitude
          const long = pos.coords.longitude
          const username = process.env.GEOCODE_API
          
          fetch(`http://api.geonames.org/countryCodeJSON?lat=${lat}&lng=${long}&username=${username}`)
          .then(response => response.json())
          .then(data=> setCountry(data.countryName))
          .catch(error => console.error(error))

        },
        (error) => console.log(error)
      )
    }
  }, [])
  console.log(country)
  return <>
   <Navbar position={position}/>
    <WeatherApp position={position}/>
      <HomePageTopHeadlines articles={articles}/>
      
  </>;
}


export const  getServerSideProps:GetServerSideProps = async () => {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_KEY; 
  const response = await fetch(`http://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
  const data = await response.json();

  if (!data || data.status !== 'ok') {
    return {
      notFound: true,
    }
  }
 
 const articles = data.articles.map((item:any) => ({id:nanoid(), ...item}))
  return {
    props: {
      articles
    },
  }
}