import Link from "next/link"
import styles from "@/css/ErrorFullViewport.module.css"
import Button from "@/components/inputs/Button"

export default function EmptyProductDetails() {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>It's empty here!</h3>
            <p className={styles.message}>Hey administrator ! Please add some products to this category.</p>
            <Button type="link" href="/admin/products">Go to Admin Panel</Button>
        </div>
    )
}