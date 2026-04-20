import { products } from "@/data/placehorlder-data"
import ProductDetailsClient from "./ProductDetailsClient"

export default async function ProductDetails({ productCategoryId }: { productCategoryId: string }) {
    // TODO : ORM : fetch object Product (product list corresponding to the category)
    const data = await import("@/data/placehorlder-data")
    const products = data.products.filter(product => product.categoryId === productCategoryId)

    if (products.length === 0) {
        return <p>It's empty here !</p>
    }

    return <ProductDetailsClient products={products} />
}