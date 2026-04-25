import Link from "next/link"
import ContactForm from "@/ui/components/contact/ContactForm"
import styles from "./footer.module.css"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.contact}>
                <h3 className={styles.contactTitle}>Nous contacter</h3>
                <ContactForm />
            </div>
            <div className={styles.bottom}>
                <ul className={styles.links}>
                    <li><Link href="#">Mentions légales</Link></li>
                    <li><Link href="#">Cookies</Link></li>
                </ul>
                <span className={styles.credit}>
                    Site réalisé par
                    <a href="https://portfolio.leopeyronnet.fr">Léo Peyronnet</a>
                </span>
            </div>
        </footer>
    )
}
