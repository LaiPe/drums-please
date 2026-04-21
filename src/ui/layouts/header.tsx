import Link from "next/link"
import styles from "./header.module.css"
import NavControls from "@/ui/components/navigation/NavControls"
import { getAllProductCategories } from "@/lib/data/data"
import { ProductCategory } from "@/lib/db/schema"

export default async function Header() {
    const productCategories : ProductCategory[] = await getAllProductCategories()
    const productLinks = productCategories.map(cat => ({
        name: cat.name,
        path: `/products/${cat.slug}`,
    }))

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
            <NavControls productLinks={productLinks} />
        </header>
    )
}