import styles from "@/styles/SingleTopic.module.scss";
import { useEffect, useState } from "react";
import { Article } from "@/pages";
import { TopicType } from "@/pages";
interface SingleTopicProps {
  topic: TopicType;
}
export default function SingleTopic({ topic }: SingleTopicProps) {
  const [topicHeadlines, setTopicHeadlines] = useState<Article[]>();
  useEffect(() => {
    const fetchTopicHealines = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_NEWS_KEY;
        if (topic.isCategory) {
          const response = await fetch(
            `http://newsapi.org/v2/top-headlines?language=en&category=${topic.topic}&pageSize=4&apiKey=${apiKey}`
          );
          const data = await response.json();
          setTopicHeadlines(data.articles);
        } else {
          const today = new Date();
          const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          const response = await fetch(
            `http://newsapi.org/v2/everything?q=${topic.topic}&from=${lastWeek}&to=${today}&language=en&pageSize=5&apiKey=${apiKey}`
          );
          const data = await response.json();
          setTopicHeadlines(data.articles);
        }
      } catch (error) {
        console.error("Error fetching headlines", error);
      }
    };
    fetchTopicHealines();
  }, [topic]);
  return (
    <article className={styles.topicContainer}>
      <h4>{topic.topic}</h4>
      <div className={styles.headlinesContainer}>
        {topicHeadlines?.map((article: Article) => {

          return (
            <a key={article.title} href={article.url} target="_blank" rel="noopener noreferrer">
              <h5 key={article.title}>{article.title}</h5>
            </a>
          )
        })}
      </div>
    </article>
  );
}
