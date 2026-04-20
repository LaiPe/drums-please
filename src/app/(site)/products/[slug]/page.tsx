import { notFound } from "next/navigation"
import styles from "./product-page.module.css"
import BackgroundMedia from "@/components/backgrounds/BackgroundMedia"
import ProductDetails from "@/components/products/ProductDetails"

export const revalidate = 3600 // fallback every hour

export async function generateStaticParams() {
    const { productsCategories } = await import("@/data/placehorlder-data") // Simulate fetching data from an API or database
    // TODO : ORM : fetch object ProductCategory
    return productsCategories.map(category => ({
        slug: category.slug
    }))
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params
    const { productsCategories } = await import("@/data/placehorlder-data") // Simulate fetching data from an API or database
    // TODO : ORM : fetch object ProductCategory

    const category = productsCategories.find(p => p.slug === slug) 

    if (!category) notFound()

    const titleWordsNum = category.name.split(" ").length
    // Split the product name into two spans if it has more than 1 words, otherwise keep it in one span
    const titleSpans = titleWordsNum > 1 
        ? [
            category.name.split(" ").slice(0, Math.ceil(titleWordsNum / 2)).join(" "),
            category.name.split(" ").slice(Math.ceil(titleWordsNum / 2)).join(" ")
        ]
        : [category.name]

    return (
        <>
            <section className={styles.heroSection}>
                <BackgroundMedia 
                    mediaType="image" 
                    mediaSrc={category.imageSrc} 
                    childrenClassName={styles.heroGradient} 
                    key={`hero-${category.slug}`}
                >
                    <h2 className={styles.heroTitle}>
                        {titleWordsNum > 1 ? (
                            <>
                                <span>{titleSpans[0]}</span>
                                <span>{titleSpans[1]}</span>
                            </>
                        ) : (
                            <span>{titleSpans[0]}</span>
                        )}
                    </h2>
                </BackgroundMedia>
            </section>

            <section className={styles.contentSection}>
                <ProductDetails productCategoryId={category.id} />
            </section>
        </>
    )
}