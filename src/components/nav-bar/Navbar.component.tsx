import styles from "@/styles/Navbar.module.scss";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Title</h2>

      <ul className={styles.navItemsList}>
        <li className={styles.navItem}>
          <p>Home</p>
        </li>
        <li className={styles.navItem}>
          <p>About</p>
        </li>
        <li className={styles.navItem}>
          <p>Contact</p>
        </li>
      </ul>
      
      <div className={styles.authenticationContainer}>
        <h4>Sign In</h4>
      </div>
    </div>
  );
}
