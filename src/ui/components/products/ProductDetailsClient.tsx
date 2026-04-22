'use client'

import styles from "./ProductDetails.module.css"
import { useState, useEffect, useMemo, useRef } from "react"
import ProductDescription from "./ProductDescription"
import { Product } from "@/lib/db/schema"
import { createStorageProvider } from "@/lib/data/storage"

export default function ProductDetailsClient({ products }: { products: Product[] }) {
    const imageProvider = useMemo(() => createStorageProvider('images'), [])
    const [selectedProduct, setSelectedProduct] = useState(products[0])
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const slug = window.location.hash.slice(1)
        if (!slug) return
        const match = products.find(p => p.slug === slug)
        if (match) {
            setSelectedProduct(match)
            sectionRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [products])

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product)
        history.replaceState(null, "", `#${product.slug}`)
    }

    return (
        <section ref={sectionRef} className={styles.container}>
            <div className={styles.selector}>
                {products.map(item => (
                    <button key={item.id} className={`${styles.productButton} ${item.id === selectedProduct.id ? styles.selected : ""}`} onClick={() => handleProductClick(item)}>
                        <img src={imageProvider.getUrl(item.imageSrc)} alt={item.name} className={styles.productImage} />
                        <span className={styles.productName}>{item.name}</span>
                    </button>
                ))}
            </div>
            <hr className={styles.divider} />
            <ProductDescription product={selectedProduct} />
        </section>
    )
}
