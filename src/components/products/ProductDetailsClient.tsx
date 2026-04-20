'use client'

import styles from "./ProductDetails.module.css"
import { useState } from "react"
import ProductDescription from "./ProductDescription"

type Subproduct = {
    id: string
    slug: string
    name: string
    imageSrc: string
    description: string
}

export default function ProductDetailsClient({ products }: { products: Subproduct[] }) {
    const [selectedProduct, setSelectedProduct] = useState(products[0])

    const handleProductClick = (productId: string) => {
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
