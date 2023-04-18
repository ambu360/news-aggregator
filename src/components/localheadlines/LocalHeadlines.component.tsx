import styles from '@/styles/LocalHeadlines.module.scss'
import { Article } from "@/pages"
import { DAYS } from '@/pages'

interface LocalHeadlinesProps {
    localHeadlines:Article[] | undefined
    city:string | undefined
    localHeadlinesLoading:boolean
}

const LocalHeadlines = ({localHeadlines,city,localHeadlinesLoading}:LocalHeadlinesProps) =>{

    return(
        <main className={styles.articleContainer}>
            <h2>Whats happening in {city}</h2>
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
                <h1>Loading</h1>
            )}
        </main>
    )
}

export default LocalHeadlines