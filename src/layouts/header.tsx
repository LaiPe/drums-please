import Link from "next/link"
import styles from "./header.module.css"
import NavControls from "@/components/navigation/NavControls"

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/">
                <picture>
                    <source
                        srcSet="/img/logos/logo-large-drums-please.png"
                        media="(min-width: 769px)"
                    />
                    <img
                        className={styles.logo}
                        src="/img/logos/logo-mobile-drums-please.png"
                        alt="logo-drums-please"
                    />
                </picture>
            </Link>
            <NavControls />
        </header>
    )
}