import {NextApiRequest,NextApiResponse} from 'next'
import { json } from 'stream/consumers'

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    const {lattitude,longitude} = req.query
    const weather_api = process.env.WEATHER_API_KEY

    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${weather_api}`)
    const data =  await response.json()
    console.log(data)
    res.status(200).json(data)
}