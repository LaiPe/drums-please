import ReactMarkdown from "react-markdown"
import styles from "./ProductDetails.module.css"

type Product = {
    id: string
    slug: string
    name: string
    imageSrc: string
    description: string
}

export default function ProductDescription({ product }: { product: Product }) {
    return (
        <div className={styles.productDescription}>
            <h3>{product.name}</h3>
            <ReactMarkdown>{product.description}</ReactMarkdown>
        </div>
    )
}