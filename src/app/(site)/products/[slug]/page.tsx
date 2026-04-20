import { notFound } from "next/navigation"
import ProductDetails from "@/components/products/ProductDetails"
import ViewportHeroWithText from "@/components/hero/ViewportHeroWithText"

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

    return (
        <>
            <section>
                <ViewportHeroWithText
                    title={category.name}
                    mediaType="image" 
                    mediaSrc={category.imageSrc} 
                    key={`hero-${category.slug}`}
                />
            </section>

            <ProductDetails productCategoryId={category.id} />
        </>
    )
}