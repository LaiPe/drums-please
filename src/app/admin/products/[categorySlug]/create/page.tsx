import { notFound } from "next/navigation"
import { getCategoryBySlug } from "@/lib/data/data"
import CreateProductForm from "@/ui/components/admin/forms/product/CreateProductForm"

type PageProps = { params: Promise<{ categorySlug: string }> }

export default async function CreateProductPage({ params }: PageProps) {
    const { categorySlug } = await params
    const category = await getCategoryBySlug(categorySlug)
    if (!category) notFound()

    return <CreateProductForm categoryId={category.id} categorySlug={category.slug} />
}
