import { getAllProductCategories } from "@/lib/data/data"
import CategoryManager from "@/ui/components/admin/CategoryManager"

export default async function AdminProductsPage() {
    const categories = await getAllProductCategories()
    return <CategoryManager categories={categories} />
}
