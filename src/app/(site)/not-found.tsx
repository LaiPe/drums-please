import Button from "@/ui/components/inputs/Button";
import styles from "@/ui/css/ErrorFullViewport.module.css"

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.title}>404</h2>
                <p className={styles.message}>Page not found</p>
                <Button href="/" variant="primary" size="large">Go back to homepage</Button>
            </div>
        </div>
    );
}