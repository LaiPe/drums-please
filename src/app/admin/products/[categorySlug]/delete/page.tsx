import { notFound } from "next/navigation"
import { getCategoryBySlug } from "@/lib/data/data"
import DeleteCategoryForm from "@/ui/components/admin/forms/category/DeleteCategoryForm"

type PageProps = { params: Promise<{ categorySlug: string }> }

export default async function DeleteCategoryPage({ params }: PageProps) {
    const { categorySlug } = await params
    const category = await getCategoryBySlug(categorySlug)
    if (!category) notFound()

    return <DeleteCategoryForm category={category} />
}
