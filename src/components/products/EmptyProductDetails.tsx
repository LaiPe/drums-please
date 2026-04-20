import Link from "next/link"
import styles from "./EmptyProductDetails.module.css"

export default function EmptyProductDetails() {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>It's empty here!</h3>
            <p className={styles.message}>Hey administrator ! Please add some products to this category.</p>
            <Link href="/admin" className={styles.adminLink}>Go to Admin Panel</Link>
        </div>
    )
}