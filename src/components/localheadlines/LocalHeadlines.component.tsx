import styles from '@/styles/LocalHeadlines.module.scss'
import { useState,useEffect } from 'react'
import { Article,DAYS,LocationDetail } from "@/pages"
import Loader from '@/components/loader/Loader.component'

interface LocalHeadlinesProps {
  
    country:LocationDetail | null
}



const LocalHeadlines = ({country}:LocalHeadlinesProps) =>{
    const [localHeadlines,setLocalHeadlines] = useState<Article[]>()
    const [localHeadlinesLoading,setLocalHeadlinesLoading] = useState<boolean>(false)
   
    //fetch and set localHeadlines
  useEffect(()=>{
    async function fetchLocalHeadlines(){
      setLocalHeadlinesLoading(true)
      if (country) {
        const today = new Date()
        const lastWeek = new Date(today.getTime()- 7 * 24 * 60 * 60 * 1000)
        const apiKey = process.env.NEXT_PUBLIC_NEWS_KEY; 
        const country_code = country.country_code
        const city = country.city
        console.log(`countryCode:${country_code} city:${city}`)
        const response = await fetch(`http://newsapi.org/v2/everything?q=${city}&from=${lastWeek}&to=${today}&language=en&pageSize=5&apiKey=${apiKey}`)
        const data = await response.json()
        setLocalHeadlines(data.articles)
        setLocalHeadlinesLoading(false)
      }
    }
    fetchLocalHeadlines()
    
  },[country])
    
    return(
        <main className={styles.articleContainer}>
            <h2>Whats happening in {country.city}</h2>
            { !localHeadlinesLoading && localHeadlines? 
            (
                localHeadlines?.map((article:Article)=>{
                    return (
                        <div className={styles.singleHeadlineContainer}>
                            <a href={article.url} target="_blank" rel="noopener noreferrer"><h3>{article.title}</h3></a>
                            <p>{article.publishedAt}</p>
                            <p>By {(article.author)?
                            (`${article.author}`)
                            :
                            article.source.name}</p>
                            {article.description? (<p>{article.description}</p>):(null)}
                        </div>    
                    )
                })
            ):(
                <Loader/>
            )}
        </main>
    )
}

export default LocalHeadlines