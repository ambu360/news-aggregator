import styles from '@/styles/Headlines.module.scss'
import { useState } from "react"
import { GetStaticProps,NextPage } from "next";


export default function HomePageTopHeadlines({articles}:any){

   

    return (
        <>
        <div className={styles.headlinesContainer}>
           {articles.map((article:any) =>(
            //const {author,title,publishedAt} = article
            <div className={styles.singleHeadlineContainer}>
                <div className={styles.articleContainer}>
                <h3>{article.title}</h3>
                <p>By {article.author}</p>
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

