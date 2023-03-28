import styles from '@/styles/Headlines.module.scss'
import { useState } from "react"
import { GetStaticProps,NextPage } from "next";


export default function Headlines({articles}:any){

   console.log(articles)

    return (
        <>
        <div>
           {articles.map((article:any) =>(
            //const {author,title,publishedAt} = article
            <div className={styles.ArticleTitle}>
                <h2>{article.title}</h2>
                <p>By {article.author}</p>
            </div>
           ))}
        </div>
        </>
    )
    
}

