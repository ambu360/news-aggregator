import styles from '@/styles/weatherApp.module.scss'
import {useEffect, useState} from 'react'
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



interface WeatherAppProps {
   position:GeolocationCoordinates | null
   country:string | null
   currentDay:string
}
interface WeatherMain {
    temp:number
    feels_like:number 
    temp_min:number 
    temp_max:number 
    humidity: number
    pressure:number 
    weather:{
        main:string
        description:string
    }
    st_txt:Date
}
interface WeatherDataType {
    id:number
    name:string
    list:WeatherMain[]
}
interface WEATHER_DESCRIPTION_TYPE{
    [key:string]:React.ReactElement
}

const WEATHER_DESCRIPTION:WEATHER_DESCRIPTION_TYPE = {
    'clear sky': <WiDaySunny className={styles.weatherIcon}/>,
    'few clouds':<WiDaySunnyOvercast className={styles.weatherIcon}/>,
    'scattered clouds':<WiCloud className={styles.weatherIcon}/>,
    'broken clouds':<WiCloudy  className={styles.weatherIcon}/>,
    'shower rain':<WiDayShowers className={styles.weatherIcon}/>,
    'rain':<WiDayRain className={styles.weatherIcon}/>,
    'thunderstorm':<WiDayThunderstorm className={styles.weatherIcon}/>,
    'snow':<WiDaySnow className={styles.weatherIcon}/>,
    'mist':<WiDayFog className={styles.weatherIcon}/>
}
export default function WeatherApp({position,country,currentDay}:WeatherAppProps){
    
    const [weatherData,setWeatherData] = useState<WeatherDataType | null>()
    useEffect(()=>{
        const fetchWeatherData = async()=>{
           
            if(position){
                const {latitude,longitude}:{latitude:number,longitude:number} = position
                const weather_api = process.env.WEATHER_API_KEY
        
                const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${weather_api}`)
                const data = await response.json()
                const weatherList = data.list.map((item:any) =>{
                    return({
                        temp:item.main.temp,
                        feels_like:item.main.feels_like, 
                        temp_min:item.main.temp_min,
                        temp_max:item.main.temp_max ,
                        humidity: item.main.humidity,
                        pressure:item.main.pressure ,
                        weather:{
                            main:item.weather[0].main,
                            description:item.weather[0].description
                        },
                        st_txt:item.dt_txt
                    })
                })
                const cleanedData = {
                    id:data.id,
                    name:data.city.name,
                    list:weatherList
                }
                setWeatherData(cleanedData)
            }
        }
        fetchWeatherData()
    },[position])
    
    return(
        <div className={styles.weatherContainer}>
            {weatherData?(
            <>
            <span className={styles.imageContainer}>
                {WEATHER_DESCRIPTION[weatherData.list[0].weather.description]}
                </span>
                <div className={styles.infoContainer}>
                    <p className={styles.name}>{weatherData.name}</p>
                    <h4 className={styles.temp}>{weatherData.list[0].temp}&deg;C</h4>
                </div>
                </>
                ):(
                    <h1>Loadings</h1>
                )}
            
        </div>
    )
}