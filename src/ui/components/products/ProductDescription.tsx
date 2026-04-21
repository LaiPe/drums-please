import ReactMarkdown from "react-markdown"
import styles from "./ProductDetails.module.css"
import { Product } from "@/lib/db/schema"

export default function ProductDescription({ product }: { product: Product }) {
    return (
        <div className={styles.productDescription}>
            <h3>{product.name}</h3>
            <ReactMarkdown>{product.description}</ReactMarkdown>
        </div>
    )
}