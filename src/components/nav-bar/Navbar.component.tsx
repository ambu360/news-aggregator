import styles from "@/styles/Navbar.module.scss";
import { useEffect, useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { LocationDetail } from "@/pages/index";
import { Dispatch, SetStateAction } from 'react'

interface NavBarProps {
  country: LocationDetail | null
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}


export default function Navbar({ country, searchTerm, setSearchTerm }: NavBarProps) {
  const [beginSearchFetch, setBeginSearchFetch] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setBeginSearchFetch(true)
  }

  useEffect(() => {
    const fetchSearchArticles = async () => {
      const apiKey = process.env.NEXT_PUBLIC_NEWS_KEY;
      if (beginSearchFetch) {
        try {
          const today = new Date();
          const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          const response = await fetch(`http://newsapi.org/v2/everything?q=${searchTerm}&from=${lastWeek}&to=${today}&language=en&pageSize=5&apiKey=${apiKey}`)
          const data = await response.json()
          console.log(data)
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
    <div className={styles.navBar}>
      <div className={styles.navTop}>
        <h2 className={styles.heading}>Title</h2>

        <form className={styles.searchBar} onSubmit={(e: React.FormEvent<HTMLInputElement>) => handleSubmit(e)}>
          <input name='searchTerm'
            value={searchTerm}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} className={styles.searchInput} placeholder="Search"></input>
          <button type='submit' className={styles.searchButton}>
            <AiOutlineSearch />
          </button>
        </form>

        <div className={styles.authenticationContainer}>
          <h4>Sign In</h4>
        </div>
      </div>
      <div className={styles.navBot}>
        <ul className={styles.navList}>
          <li className={styles.navListItem}>Home</li>
          <li className={styles.navListItem}>For you</li>
          <li className={styles.navListItem}>Following</li>
          <li className={styles.navListItem}>News showcase</li>
        </ul>
      </div>
    </div>
  );
}
