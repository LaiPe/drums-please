'use client'

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import ProductNavButton from '@/ui/components/navigation/buttons/ProductNavButton'
import AccountNavButton from '@/ui/components/navigation/buttons/AccountNavButton'
import NavModal from '@/ui/components/navigation/modal/NavModal'
import styles from "@/ui/layouts/header.module.css"

type NavLink = { name: string; path: string }

const ACCOUNT_LINKS: NavLink[] = [
    { name: "Se Connecter", path: "/login" },
    { name: "S'inscrire", path: "/register" },
]

export default function NavControls({ productLinks }: { productLinks: NavLink[] }) {
    const [activeNav, setActiveNav] = useState<'products' | 'account' | null>(null)
    const pathname = usePathname()

    useEffect(() => {
        setActiveNav(null)
    }, [pathname])

    const toggleNav = (nav: 'products' | 'account') => {
        setActiveNav(prev => prev === nav ? null : nav)
    }

    const handleSelfClick = () => {
        setActiveNav(null)
    }

    return (
        <nav className={styles.nav}>
            <div id="nav-produits" className={styles.subNav}>
                <ProductNavButton onClick={() => toggleNav('products')} isActive={activeNav === 'products'} />
                <NavModal isOpen={activeNav === 'products'} links={productLinks} pathname={pathname} onSelfClick={handleSelfClick} />
            </div>
            <div id="nav-compte" className={styles.subNav}>
                <AccountNavButton onClick={() => toggleNav('account')} isActive={activeNav === 'account'} />
                <NavModal isOpen={activeNav === 'account'} links={ACCOUNT_LINKS} pathname={pathname} onSelfClick={handleSelfClick} />
            </div>
        </nav>
    )
}
