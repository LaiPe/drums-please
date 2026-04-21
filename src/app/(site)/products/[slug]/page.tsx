import { notFound } from "next/navigation"
import ProductDetails from "@/ui/components/products/ProductDetails"
import ViewportHeroWithText from "@/ui/components/hero/ViewportHeroWithText"
import { getAllProductCategories } from "@/lib/data/data"
import { ProductCategory } from "@/lib/db/schema"

export const revalidate = 3600 // fallback every hour

export async function generateStaticParams() {
    const productsCategories : ProductCategory[] = await getAllProductCategories()
    return productsCategories.map(category => ({
        slug: category.slug
    }))
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params
    const productsCategories : ProductCategory[] = await getAllProductCategories()

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