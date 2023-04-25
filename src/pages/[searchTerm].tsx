import {useRouter} from 'next/router'
import {useState,useEffect,useContext} from 'react'
import {Article} from '@/pages/index'
import styles from '@/styles/SearchTerm.module.scss'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import SearchContext from '@/context/context'
import Navbar from "@/components/nav-bar/Navbar.component";

interface SearchArticleProps {
    searchTerm:string
    searchResults:Article[]
}

export default function SearchArticle({searchTerm,searchResults}:SearchArticleProps) {
    const context = useContext(SearchContext)
    const router= useRouter();
    const[searchedArticles,SetSearchedArticles] = useState<Article[]>([]);

    useEffect(() =>{
        if(searchResults){
            SetSearchedArticles(searchResults)
        }
    },[searchResults])

    if (router.isFallback) {
        return <div>Loading...</div>;
      }
      return (
          <>
        <Navbar 
            searchTerm={context.searchTerm}
            setSearchTerm={context.setSearchTerm}
            beginSearchFetch = {context.beginSearchFetch}
      setBeginSearchFetch = {context.setBeginSearchFetch}
        />

        
        <main className={styles.headlineMainContainer}>
            <h2>Stories about {searchTerm}</h2>
        <div className={styles.headlinesContainer}>
           {searchedArticles.map((article:Article) =>(
            
            <div className={styles.singleHeadlineContainer} key={article.id}>
                <div className={styles.articleContainer}>
                
                <a href={article.url} target="_blank" rel="noopener noreferrer"><h4  className={styles.title}>{article.title}</h4></a>
                
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
        {/*
        <div className={styles.loclaNewsContainer}>
                <div className={styles.header}>
                    <h1>your location</h1>
                </div>
            </div>*/}
        </main>
        </>
      );
}

export const getServerSideProps:GetServerSideProps = async (context:GetServerSidePropsContext)=> {

    const apiKey = process.env.NEXT_PUBLIC_NEWS_KEY;
    const searchTerm = context.query.query as string;
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    try{
        const response = await fetch(`http://newsapi.org/v2/everything?q=${searchTerm}&from=${lastWeek}&sortBy=popularity&language=en&pageSize=10&apiKey=${apiKey}`)
        const data = await response.json();

        return {
            props:{
                searchTerm,
                searchResults:data.articles
            }
        }
    }catch(e){
        console.log(e);
        return{
            props:{
                searchTerm:[],
                searchResults:[]
            }
        }
    }
}