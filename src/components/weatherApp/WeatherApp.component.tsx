
interface WeatherAppProps {
   position:GeolocationCoordinates | null
}
export default function WeatherApp({position}:WeatherAppProps){
    const {latitude,longitude}:{latitude:number , longitude:number  } = position
    console.log(latitude,longitude)
    return(
        <h1>{latitude} {longitude}</h1>
    )
}