'use client'

import styles from "./ProductDetails.module.css"
import { useState } from "react"

type Subproduct = {
    id: string
    slug: string
    name: string
    imageSrc: string
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
        <>
            <div className={styles.selector}>
                {products.map(item => (
                    <button key={item.id} className={styles.productButton} onClick={() => handleProductClick(item.id)}>
                        <img src={item.imageSrc} alt={item.name} className={styles.productImage} />
                        <h3 className={styles.productName}>{item.name}</h3>
                    </button>
                ))}
            </div>
            <hr />
            <div className={styles.productDescription}>
                <h3 className={styles.productNameDescription}>{selectedProduct.name}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </>
    )
}
