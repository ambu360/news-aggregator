import styles from '@/styles/weatherApp.module.scss'
import { WeatherDataType } from '@/pages'
import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import {
    WiDaySunny,
    WiCloud,
    WiDaySunnyOvercast,
    WiCloudy,
    WiDayRain,
    WiDayShowers,
    WiDayThunderstorm,
    WiDaySnow,
    WiDayFog,
} from 'react-icons/wi'
import { LocationDetail } from '@/pages'



interface WeatherAppProps {
  data:WeatherDataType
 
}


interface WEATHER_DESCRIPTION_TYPE {
    [key: string]: React.ReactElement
}


export default function WeatherApp({ data }: WeatherAppProps) {
    
    const [weatherData, setWeatherData] = useState<WeatherDataType | null>()
    /*useEffect(() => {
        const fetchWeatherData = async () => {

            if (position) {
                setWeatherLoading(true)
                const { latitude, longitude }: { latitude: number, longitude: number } = position
               const data = await response.json()

                const weatherList = data.list.map((item: any) => {
                    return ({
                        temp: item.main.temp,
                        feels_like: item.main.feels_like,
                        temp_min: item.main.temp_min,
                        temp_max: item.main.temp_max,
                        humidity: item.main.humidity,
                        pressure: item.main.pressure,
                        weather: {
                            main: item.weather[0].main,
                            description: item.weather[0].description,
                            icon: item.weather[0].icon
                        },
                        st_txt: item.dt_txt

                    })
                })
                const cleanedData = {
                    id: data.id,
                    name: data.city.name,
                    list: weatherList
                }
                setWeatherData(cleanedData)
                setWeatherLoading(false)
            }
        }
        fetchWeatherData()
    }, [position])
    */
    return (
             <div className={styles.weatherContainer}>
    {(data) ? (data &&
                <>
                    <span className={styles.imageContainer}>
                        <p>{data.list[0].weather[0].description}</p>
                        <img className={styles.weatherIcon} src={`http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`}></img>
                    </span>

                    <div className={styles.infoContainer}>
                        <p className={styles.name}>{data.name}</p>
                        <h4 className={styles.temp}>{data.list[0].temp}&deg;C</h4>
                    </div>
                </>
            ) : (
                <h1>Loadings</h1>
            )}

        </div>
    )
}