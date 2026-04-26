import { getHomepageHero, getHomepageProducts, getHomepageAbout, getHomepageCta } from '@/lib/data/homepage'
import { getAllProductCategories } from '@/lib/data/data'
import HomepageManager from '@/ui/components/admin/homepage/HomepageManager'

export default async function AdminHomepagePage() {
    const [hero, products, about, cta, allCategories] = await Promise.all([
        getHomepageHero(),
        getHomepageProducts(),
        getHomepageAbout(),
        getHomepageCta(),
        getAllProductCategories(),
    ])

    return (
        <HomepageManager
            hero={hero}
            products={products}
            about={about}
            cta={cta}
            allCategories={allCategories}
        />
    )
}
