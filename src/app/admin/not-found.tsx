import Button from "@/ui/components/inputs/Button";
import styles from "@/ui/css/ErrorFullViewport.module.css"

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.title}>404</h2>
                <p className={styles.message}>Page not found</p>
                <Button type="link" href="/admin">Go back to admin overview</Button>
            </div>
        </div>
    );
}