import { NextApiRequest, NextApiResponse } from "next";

interface weatherdata {
  main: string;
  description: string;
  icon: string;
  id: number;
}
interface WeatherMain {
  main:{
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  }

  weather: weatherdata[];
  dt_txt: Date;
}

interface WeatherDataType {
  id: number;
  name: string;
  list: WeatherMain[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { latitude, longitude } = req.query;
  const weather_api = process.env.WEATHER_API_KEY;


  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${weather_api}`
  );
  const data = await response.json();
  const cleaned_data: WeatherDataType = {
    id: data.city.id,
    name: data.city.name,
    list: data.list.map((item: WeatherMain) => {
      return {
        
        weather: item.weather.map((weather: weatherdata) => {
          return {
              main: weather.main,
                description: weather.description,
                icon: weather.icon,
                id: weather.id,
          }
        }),
        temp: item.main.temp,
        feels_like: item.main.feels_like,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        st_txt: item.dt_txt,
      };
    }),
  };

  res.json(cleaned_data);
}
