import styles from '@/styles/Search.module.scss'
import {useState,useEffect,Dispatch,SetStateAction} from 'react'
import { AiOutlineSearch } from "react-icons/ai";

interface SearchProps {
    searchTerm:string
    beginSearchFetch:boolean
    setBeginSearchFetch:Dispatch<SetStateAction<boolean>>
    setSearchTerm: Dispatch<SetStateAction<string>>
}
export default function Search({searchTerm,setSearchTerm,beginSearchFetch,setBeginSearchFetch}:SearchProps){

    const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        setBeginSearchFetch(true)
        
      }

    useEffect(() => {
        const fetchSearchArticles = async () => {
          const apiKey = process.env.NEXT_PUBLIC_NEWS_KEY;
          if (beginSearchFetch && searchTerm) {
            try {
              const today = new Date();
              const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
              const response = await fetch(`http://newsapi.org/v2/everything?q=${searchTerm}&from=${lastWeek}&sortBy=popularity&language=en&pageSize=10&apiKey=${apiKey}`)
              const data = await response.json()
              console.log(data)
              setSearchTerm('')
              setBeginSearchFetch(false)
            }
            catch (error) {
              console.log(error)
              setBeginSearchFetch(false)
            }
          }
        }
    
        fetchSearchArticles()
      }, [beginSearchFetch])

    return (
        <form className={styles.searchBar} onSubmit={(e: React.FormEvent<HTMLInputElement>) => handleSubmit(e)}>
          <input name='searchTerm'
            value={searchTerm}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} className={styles.searchInput} placeholder="Search"></input>
          <button type='submit' className={styles.searchButton}>
            <AiOutlineSearch />
          </button>
        </form>
    )
}