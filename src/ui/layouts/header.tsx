import Link from "next/link"
import styles from "./header.module.css"
import NavControls from "@/ui/components/navigation/NavControls"
import { getAllProductCategories } from "@/lib/data/data"
import { getBrandIdentityLogo } from "@/lib/data/brandIdentity"
import { ProductCategory } from "@/lib/db/schema"
import { createStorageProvider } from "@/lib/data/storage"

const DEFAULT_DESKTOP = '/img/logos/logo-large-drums-please.png'
const DEFAULT_MOBILE  = '/img/logos/logo-mobile-drums-please.png'

export default async function Header() {
    const [productCategories, logo] = await Promise.all([
        getAllProductCategories() as Promise<ProductCategory[]>,
        getBrandIdentityLogo(),
    ])

    const productLinks = productCategories.map(cat => ({
        name: cat.name,
        path: `/products/${cat.slug}`,
    }))

    const imageProvider = createStorageProvider('images')
    const desktopSrc = logo?.logoDesktopSrc
        ? imageProvider.getUrl(logo.logoDesktopSrc)
        : DEFAULT_DESKTOP
    const mobileSrc = logo?.logoMobileSrc
        ? imageProvider.getUrl(logo.logoMobileSrc)
        : logo?.logoDesktopSrc
            ? imageProvider.getUrl(logo.logoDesktopSrc)
            : DEFAULT_MOBILE

    return (
        <header className={styles.header}>
            <Link href="/">
                <picture>
                    <source
                        srcSet={desktopSrc}
                        media="(min-width: 769px)"
                    />
                    <img
                        className={styles.logo}
                        src={mobileSrc}
                        alt="logo-drums-please"
                    />
                </picture>
            </Link>
            <NavControls productLinks={productLinks} />
        </header>
    )
}