import {NextApiRequest,NextApiResponse} from 'next'



export default async function handler (req:NextApiRequest,res:NextApiResponse){
    const {city} = req.query
    const today = new Date()
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const apiKey = process.env.NEXT_PUBLIC_NEWS_KEY;
    
    
        const response = await fetch(`http://newsapi.org/v2/everything?q=${city}&from=${lastWeek}&to=${today}&language=en&pageSize=5&apiKey=${apiKey}`)
        const data = await response.json()
       
    return res.json(data.articles)
}