import styles from '@/styles/LocalHeadlines.module.scss'
import { useState, useEffect } from 'react'
import { Article, DAYS, LocationDetail } from "@/pages"
import Loader from '@/components/loader/Loader.component'
import moment from 'moment';
interface LocalHeadlinesProps {

    country: LocationDetail | null
}

const LocalHeadlines = ({ country }: LocalHeadlinesProps) => {
    const [localHeadlines, setLocalHeadlines] = useState<Article[]>()
    const [localHeadlinesLoading, setLocalHeadlinesLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    //fetch and set localHeadlines
    useEffect(() => {
        async function fetchLocalHeadlines() {
            setLocalHeadlinesLoading(true)
            if (country) {
                const today = new Date()
                const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
                const apiKey = process.env.NEXT_PUBLIC_NEWS_KEY;
                const city = country.city
                try {
                    const response = await fetch(`http://newsapi.org/v2/everything?q=${city}&from=${lastWeek}&to=${today}&language=en&pageSize=5&apiKey=${apiKey}`)
                    const data = await response.json()
                    setLocalHeadlines(data.articles)
                } catch (error) {
                    setErrorMessage('Error fetching Local headlines ')
                }
                setLocalHeadlinesLoading(false)
            }
        }
        fetchLocalHeadlines()

    }, [country])

    function formatPublishedAt(date: string) {
        return moment(date).format('MMMM DD, YYYY');
    }

    return (
        <main className={styles.articleContainer}>
            <h2>Whats happening in {country ? country.city : 'your selected country'}</h2>
            { localHeadlinesLoading ? (
                <Loader />
            ) : errorMessage ? (
                <p>{errorMessage}</p>
            ) : localHeadlines?.map((article: Article) => (
                <div key={article.title} className={styles.singleHeadlineContainer}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <h3>{article.title}</h3>
                    </a>
                    <p>{formatPublishedAt(article.publishedAt)}</p>
                    <p>By {article.author || article.source.name}</p>
                    {article.description && <p>{article.description}</p>}
                </div>
            ))}
        </main>
    )
}

export default LocalHeadlines