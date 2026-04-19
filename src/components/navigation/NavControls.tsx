'use client'

import { useState } from "react"
import ProductNavButton from '@/components/navigation/buttons/ProductNavButton'
import AccountNavButton from '@/components/navigation/buttons/AccountNavButton'
import NavModal from '@/components/navigation/modal/NavModal'
import styles from "@/layouts/header.module.css"

export const NAVLINKS = {
    "products-nav": [
        { name: "Batteries Acoustiques", path: "/produits/bat-acoustiques" },
        { name: "Batteries Électroniques", path: "/produits/bat-electroniques" },
        { name: "Classiques", path: "/produits/classiques" },
        { name: "Traditionnelles", path: "/produits/traditionnelles" },
    ],
    "account-nav": [
        { name: "Se Connecter", path: "/login" },
        { name: "S'inscrire", path: "/register" },
    ],
}

export default function NavControls() {
    const [activeNav, setActiveNav] = useState<'products' | 'account' | null>(null)

    const toggleNav = (nav: 'products' | 'account') => {
        setActiveNav(prev => prev === nav ? null : nav)
    }

    return (
        <nav className={styles.nav}>
            <div id="nav-produits" className={styles.subNav}>
                <ProductNavButton onClick={() => toggleNav('products')} isActive={activeNav === 'products'} />
                <NavModal isOpen={activeNav === 'products'} links={NAVLINKS["products-nav"]} />
            </div>
            <div id="nav-compte" className={styles.subNav}>
                <AccountNavButton onClick={() => toggleNav('account')} isActive={activeNav === 'account'} />
                <NavModal isOpen={activeNav === 'account'} links={NAVLINKS["account-nav"]} />
            </div>
        </nav>
    )
}
