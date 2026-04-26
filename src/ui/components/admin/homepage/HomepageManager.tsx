import { HomepageHero, HomepageProducts, HomepageAbout, HomepageCta, ProductCategory } from '@/lib/db/schema'
import HeroSectionCard from './HeroSectionCard'
import ProductsSectionCard from './ProductsSectionCard'
import AboutSectionCard from './AboutSectionCard'
import CtaSectionCard from './CtaSectionCard'
import styles from './HomepageManager.module.css'

type Props = {
    hero: HomepageHero | null
    products: HomepageProducts | null
    about: HomepageAbout | null
    cta: HomepageCta | null
    allCategories: ProductCategory[]
}

export default function HomepageManager({ hero, products, about, cta, allCategories }: Props) {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <p className={styles.breadcrumb}>Administration</p>
                    <h1 className={styles.title}>Page d&apos;accueil</h1>
                </div>
            </div>
            <div className={styles.sections}>
                <HeroSectionCard hero={hero} />
                <ProductsSectionCard section={products} allCategories={allCategories} />
                <AboutSectionCard about={about} />
                <CtaSectionCard cta={cta} />
            </div>
        </div>
    )
}
