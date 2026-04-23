import { notFound } from "next/navigation"
import { getCategoryBySlug, getProductsByCategorySlug } from "@/lib/data/data"
import ProductManager from "@/ui/components/admin/forms/ProductManager"

type PageProps = { params: Promise<{ categorySlug: string }> }

export default async function AdminCategoryPage({ params }: PageProps) {
    const { categorySlug } = await params
    const [category, products] = await Promise.all([
        getCategoryBySlug(categorySlug),
        getProductsByCategorySlug(categorySlug),
    ])

    if (!category) notFound()

    return <ProductManager category={category} products={products} />
}
