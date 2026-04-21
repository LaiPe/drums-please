import ProductDetailsClient from "./ProductDetailsClient"
import EmptyProductDetails from "./EmptyProductDetails"
import { getAllProductsByCategoryId } from "@/lib/data/data"
import { Product } from "@/lib/db/schema"

export default async function ProductDetails({ productCategoryId }: { productCategoryId: string | number }) {
    const products : Product[] = await getAllProductsByCategoryId(Number(productCategoryId))

    if (products.length === 0) {
        return <EmptyProductDetails />
    }

    return <ProductDetailsClient products={products}/>
}