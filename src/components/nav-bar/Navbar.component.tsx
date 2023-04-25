import styles from "@/styles/Navbar.module.scss";
import { Dispatch, SetStateAction } from 'react'
import Search from '@/components/search/Search.component'

interface NavBarProps {

  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
  beginSearchFetch: boolean
  setBeginSearchFetch: Dispatch<SetStateAction<boolean>>
}


export default function Navbar({ searchTerm, setSearchTerm, beginSearchFetch, setBeginSearchFetch }: NavBarProps) {


  return (
    <div className={styles.navBar}>
      <div className={styles.navTop}>
        <h2 className={styles.heading}>Title</h2>

        <Search searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          beginSearchFetch={beginSearchFetch}
          setBeginSearchFetch={setBeginSearchFetch}
        />

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
