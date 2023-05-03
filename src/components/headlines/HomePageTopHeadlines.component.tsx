import styles from '@/styles/Headlines.module.scss'
import { useState } from "react"
import { Article } from '@/pages';
import moment from 'moment';

interface HomePageTopHeadlinesProps {
    topHeadLinesprops: Article[];

}

export default function HomePageTopHeadlines({ topHeadLinesprops }: HomePageTopHeadlinesProps) {
    const [topHeadLines, setTopHeadLines] = useState<Article[]>(topHeadLinesprops)

    function formatPublishedAt(date: string) {
        return moment(date).format('MMMM DD, YYYY');
    }

    return (
        <main className={styles.headlineMainContainer}>
            <h2>Top stories.</h2>
            <div className={styles.headlinesContainer}>
                {topHeadLines.map((topHeadLines: Article) => (

                    <div className={styles.singleHeadlineContainer} key={topHeadLines.id}>
                        <div className={styles.articleContainer}>

                            <a href={topHeadLines.url} target="_blank" rel="noopener noreferrer"><h4 className={styles.title}>{topHeadLines.title}</h4></a>
                            <p>{formatPublishedAt(topHeadLines.publishedAt)}</p>
                            {
                                topHeadLines.author ? (
                                    <p className={styles.author}>-By <em>{topHeadLines.author}</em></p>
                                ) : (
                                    <p className={styles.publication}>-published by <em>{topHeadLines.source.name}</em></p>)
                            }
                           
                            <p className={styles.articleDescription}>{topHeadLines.description}</p>
                        </div>
                        <span className={styles.imageContainer}>
                            <img className={styles.image} src={topHeadLines.urlToImage}></img>
                        </span>
                    </div>
                ))}
            </div>
            {/*
        <div className={styles.loclaNewsContainer}>
                <div className={styles.header}>
                    <h1>your location</h1>
                </div>
            </div>*/}
        </main>
    )

}

