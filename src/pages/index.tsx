import { GetServerSideProps } from "next";
import { useState, useEffect, useContext } from "react";
import { nanoid } from "nanoid";
import useSWR from 'swr';
import { Lato } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Navbar from "@/components/nav-bar/Navbar.component";
import HomePageTopHeadlines from "@/components/headlines/HomePageTopHeadlines.component";
import WeatherApp from "@/components/weatherApp/WeatherApp.component";
import LocalHeadlines from "@/components/localheadlines/LocalHeadlines.component";
import TopicsList from "@/components/topics/TopicsList";
import SearchContext from '@/context/context'
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
  publishedAt: Date | string;
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
  const context = useContext(SearchContext)
  const CountryName = new Intl.DisplayNames(['en'], { type: 'region' });
  //const [position, setPosition] = useState<GeolocationCoordinates | null>(null);
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


  const date = new Date();
  const day = date.getDay();
  const currentDay = DAYS[day];

  function positionFetcher() {
    return new Promise((resolve, reject) => {
      function onSuccess({ coords }) {
        resolve([coords.latitude, coords.longitude])
      }
      navigator.geolocation.getCurrentPosition(onSuccess, reject)
    });
  }

  function weatherFetcher(){

  }

  const { data: position, error, isLoading } = useSWR("geolocation", positionFetcher)
  //const { data, error, isloading } = useSWR(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=${weather_api_key}`)


  return <h1>s</h1>
}

/*//geoLocation => fetch country details =>set country
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
              setCountry( //ad county!!!!!!!!
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
  https://newsapi.org/v2/everything?q=&from=Wed%20Apr%2019%202023%2018:57:56%20GMT-0400%20(Eastern%20Daylight%20Time)&to=Wed%20Apr%2026%202023%2018:57:56%20GMT-0400%20(Eastern%20Daylight%20Time)&language=en&pageSize=5&apiKey=b62019e53671452798bdad0655743680
  //add current country to topicsList

  useEffect(() => {
    const currentCountry = country?.country
    if (currentCountry && topicsList[0].topic != currentCountry) {
      setTopicsList([{ topic: currentCountry, isCategory: false }, ...topicsList])
    }
  }, [country])


  return (
    <>
      <Navbar
      searchTerm={context.searchTerm}
      setSearchTerm={context.setSearchTerm}
      beginSearchFetch = {context.beginSearchFetch}
      setBeginSearchFetch = {context.setBeginSearchFetch}
      />
      <div className={styles.brefing}>
        <div className={styles.briefingTitle}>
          <h2 >Your breifing</h2>
          <p>{currentDay}</p>
        </div>
        <WeatherApp
          position={position}
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
*/
