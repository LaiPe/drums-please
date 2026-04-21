import Link from "next/link"
import styles from "./footer.module.css"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <ul>
                <li><Link href="#">Mentions légales</Link></li>
                <li><Link href="#">Cookies</Link></li>
                <li><Link href="#">Contact</Link></li>
            </ul>
            <span>
                Site réalisé par
                <a href="https://portfolio.leopeyronnet.fr">Léo Peyronnet</a>
            </span>
        </footer>
    )
}