import { notFound } from "next/navigation"
import { getCategoryBySlug } from "@/lib/data/data"
import EditCategoryForm from "@/ui/components/admin/forms/category/EditCategoryForm"

type PageProps = { params: Promise<{ categorySlug: string }> }

export default async function EditCategoryPage({ params }: PageProps) {
    const { categorySlug } = await params
    const category = await getCategoryBySlug(categorySlug)
    if (!category) notFound()

    return <EditCategoryForm category={category} />
}
