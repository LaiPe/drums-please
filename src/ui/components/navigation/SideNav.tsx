'use client'

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import styles from "./SideNav.module.css"

export type SideNavLink = {
    label: string
    path: string
    icon: React.ReactNode
}

type SideNavProps = {
    links: SideNavLink[]
}

export default function SideNav({ links }: SideNavProps) {
    const [expanded, setExpanded] = useState(false)
    const pathname = usePathname()

    return (
        <aside
            className={`${styles.sidenav} ${expanded ? styles.expanded : styles.collapsed}`}
            aria-label="Navigation admin"
        >
            <div className={styles.top}>
                <Link href="/" className={styles.logoLink} tabIndex={0}>
                    <picture>
                        <img
                            src="/img/logos/logo-mobile-drums-please.png"
                            alt="Drums Please"
                            className={styles.logo}
                        />
                    </picture>
                    <span className={styles.logoLabel}>← Accueil</span>
                </Link>
            </div>

            <button
                type="button"
                className={styles.toggleBtn}
                onClick={() => setExpanded(prev => !prev)}
                aria-label={expanded ? "Réduire la navigation" : "Développer la navigation"}
            >
                <span className={`${styles.toggleIcon} ${expanded ? styles.toggleIconExpanded : ""}`}>
                    <ChevronRight size={18} />
                </span>
            </button>

            <nav className={styles.nav}>
                <ul className={styles.list}>
                    {links.map(link => {
                        const isActive = pathname.startsWith(link.path)
                        return (
                            <li key={link.path}>
                                <Link
                                    href={link.path}
                                    className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                                    title={!expanded ? link.label : undefined}
                                >
                                    <span className={styles.icon}>{link.icon}</span>
                                    <span className={styles.label}>{link.label}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}
