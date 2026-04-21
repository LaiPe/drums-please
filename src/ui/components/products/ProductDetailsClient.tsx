'use client'

import styles from "./ProductDetails.module.css"
import { useState } from "react"
import ProductDescription from "./ProductDescription"
import { Product } from "@/lib/db/schema"

export default function ProductDetailsClient({ products }: { products: Product[] }) {
    const [selectedProduct, setSelectedProduct] = useState(products[0])

    const handleProductClick = (productId: number | string) => {
        const product = products.find(p => p.id === productId)
        if (product) {
            setSelectedProduct(product)
        }
    }

    return (
        <section className={styles.container}>
            <div className={styles.selector}>
                {products.map(item => (
                    <button key={item.id} className={styles.productButton} onClick={() => handleProductClick(item.id)}>
                        <img src={item.imageSrc} alt={item.name} className={styles.productImage} />
                        <span className={styles.productName}>{item.name}</span>
                    </button>
                ))}
            </div>
            <hr className={styles.divider} />
            <ProductDescription product={selectedProduct} />
        </section>
    )
}
