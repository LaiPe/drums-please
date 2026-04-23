import { notFound } from "next/navigation"
import { getCategoryBySlug, getProductById } from "@/lib/data/data"
import DeleteProductForm from "@/ui/components/admin/forms/product/DeleteProductForm"

type PageProps = { params: Promise<{ categorySlug: string; productId: string }> }

export default async function DeleteProductPage({ params }: PageProps) {
    const { categorySlug, productId } = await params
    const id = parseInt(productId, 10)
    if (isNaN(id)) notFound()

    const [category, product] = await Promise.all([
        getCategoryBySlug(categorySlug),
        getProductById(id),
    ])

    if (!category || !product) notFound()

    return <DeleteProductForm product={product} categorySlug={category.slug} />
}
