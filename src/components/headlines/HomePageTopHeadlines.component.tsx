import styles from '@/styles/Headlines.module.scss'
import { useState } from "react"
import { GetStaticProps,NextPage } from "next";
import { Article } from '@/pages';


interface HomePageTopHeadlinesProps {
    articles: Article[];
  }

export default function HomePageTopHeadlines({articles}:HomePageTopHeadlinesProps){

    
const [topHeadLines,setTopHeadLines] = useState<Article[]>(articles)
   
    return (
        <>
        <div className={styles.headlinesContainer}>
           {topHeadLines.map((article:Article) =>(
            
            <div className={styles.singleHeadlineContainer} key={article.id}>
                <div className={styles.articleContainer}>
                <h2 className={styles.title}>{article.title}</h2>
                {
                    article.author?(
                <p className={styles.author}>-By <em>{article.author}</em></p>
                    ):(
                    <p className={styles.publication}>-published by <em>{article.source.name}</em></p>)
                }
                <p className = {styles.articleDescription}>{article.description}</p>
                </div>
                <span className={styles.imageContainer}>
                    <img className={styles.image}src={article.urlToImage}></img>
                </span>
            </div>
           ))}
        </div>
        </>
    )
    
}

