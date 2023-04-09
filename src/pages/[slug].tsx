import { GetServerSideProps } from "next"
import { Article } from "."

interface ArticlePageProps {
    article:Article
}

export default function SingleArticle({article}:ArticlePageProps){

    return (
    <div>
        <article>
            <h2>{article.title}</h2>
            <p>By {article.author}</p>
            <span>
                {article.content}
            </span>
        </article>
    </div>)
}

export const getServerSideProps:GetServerSideProps = async ({params}) =>{
    const apiKey = process.env.NEXT_PUBLIC_NEWS_KEY;
    const {title} = params as {title:string}
    const response = await fetch(`https://newsapi.org/v2/everything?q=${title}&apiKey=${apiKey}`);
  const data = await response.json();
  return {
    props: {
      article: data.articles[0],
    },
  };
}