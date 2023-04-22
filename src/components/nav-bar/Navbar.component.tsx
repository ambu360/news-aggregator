import styles from "@/styles/Navbar.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { Props } from "@/pages/index";

export default function Navbar({ position }: Props) {
  return (
    <div className={styles.navBar}>
      <div className={styles.navTop}>s
        <h2 className={styles.heading}>Title</h2>

        <form className={styles.searchBar}>
          <input className={styles.searchInput} placeholder="Search"></input>
          <button className={styles.searchButton}>
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
