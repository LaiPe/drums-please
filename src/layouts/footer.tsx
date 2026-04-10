import { Link } from "gatsby"
import * as React from "react"
import * as styles from "./Footer.module.css"

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <ul>
                <li><Link to="#">Mentions légales</Link></li>
                <li><Link to="#">Cookies</Link></li>
                <li><Link to="#">Contact</Link></li>
            </ul>
            <span>
                Site réalisé par
                <a href="https://portfolio.leopeyronnet.fr">Léo Peyronnet</a>
            </span>
        </footer>
    )
}

export default Footer