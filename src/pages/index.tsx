import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Lato } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Navbar from "@/components/nav-bar/Navbar.component";
import HomePageTopHeadlines from "@/components/headlines/HomePageTopHeadlines.component";
import WeatherApp from "@/components/weatherApp/WeatherApp.component";
import LocalHeadlines from "@/components/localheadlines/LocalHeadlines.component";
import TopicsList from "@/components/topics/TopicsList";

export interface PositionType {
  position: GeolocationCoordinates | null;
}
const inter = Lato({
  weight: "400",
  subsets: ["latin"],
});


export interface Article {
  id: string;
  source: {
    id: string | number;
    name: string;
  };
  author?: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: Date;
  content: string;
}

export interface LocationDetail {
  country?: string;
  country_code: string;
  city: string;
}

export interface TopicType {
  topic: string
  isCategory: boolean
}

interface DAYS_TYPE {
  [key: number]: string;
}

export const DAYS: DAYS_TYPE = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};



export default function Home({ articles }: { articles: Article[] }) {
  const CountryName = new Intl.DisplayNames(['en'], { type: 'region' });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [position, setPosition] = useState<GeolocationCoordinates | null>(null);
  const [country, setCountry] = useState<LocationDetail | null>({
    country_code: "",
    city: "",
    country: ""
  });
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
  const [topicsList, setTopicsList] = useState<TopicType[]>([
    { topic: 'world', isCategory: false },
    { topic: 'sports', isCategory: true },
    { topic: 'business', isCategory: true },
    { topic: 'technology', isCategory: true },
    { topic: 'entertainment', isCategory: true }]);

    const [beginSearchFetch, setBeginSearchFetch] = useState<boolean>(false)

  const date = new Date();
  const day = date.getDay();
  const currentDay = DAYS[day];




  //geoLocation => fetch country details =>set country
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition(pos.coords);
          const lat = pos.coords.latitude;
          const long = pos.coords.longitude;
          const weather_api_key = process.env.WEATHER_API_KEY;
          fetch(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=${weather_api_key}`
          )
            .then((response) => response.json())
            .then((data) => {
              setCountry(
                {
                  city: data[0].name,
                  country_code: data[0].country.toLowerCase(),
                  country: CountryName.of(data[0].country)
                });
            })
            .catch((error) => console.error(error));
        },
        (error) => console.log(error)
      );
    }
  }, []);

  //add current country to topicsList
  useEffect(() => {
    const currentCountry = country?.country
    if (currentCountry && topicsList[0].topic != currentCountry) {
      setTopicsList([{ topic: currentCountry, isCategory: false }, ...topicsList])
    }
  }, [country])

  return (
    <>
      <Navbar country={country} 
      searchTerm={searchTerm} 
      setSearchTerm={setSearchTerm} 
      beginSearchFetch = {beginSearchFetch}
      setBeginSearchFetch = {setBeginSearchFetch}
      />
      <div className={styles.brefing}>
        <div className={styles.briefingTitle}>
          <h2 >Your breifing</h2>
          <p>{currentDay}</p>
        </div>
        <WeatherApp
          position={position}
          country={country}
          currentDay={currentDay}
          weatherLoading={weatherLoading}
          setWeatherLoading={setWeatherLoading}
        />
      </div>
      <div className={styles.articlesContainer}>
        <div className={styles.gridItem1}>
          <HomePageTopHeadlines topHeadLinesprops={articles} />
        </div>
        <div className={styles.gridItem2}>
          <LocalHeadlines country={country} />
        </div>
        <div className={styles.gridItem3}>
          <TopicsList topicsList={topicsList} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_KEY;
  const response = await fetch(
    `http://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${apiKey}`
  );
  const data = await response.json();

  if (!data || data.status !== "ok") {
    return {
      props: {
        articles: []
      }
    };
  }

  const articles = data.articles.map((item: any) => ({
    id: nanoid(),
    ...item,
  }));
  return {
    props: {
      articles,
    },
  };
};
