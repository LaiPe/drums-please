import styles from "@/ui/css/ErrorFullViewport.module.css"
import Button from "@/ui/components/inputs/Button"

export default function EmptyProductDetails() {
    return (
        <div className={styles.container}>
            <h3 className={`${styles.title} ${styles.lineHeight}`}>It's empty here!</h3>
            <p className={styles.message}>Hey administrator ! Please add some products to this category.</p>
            <Button type="link" href="/admin/products">Go to Admin Panel</Button>
        </div>
    )
}