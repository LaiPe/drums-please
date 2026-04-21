import Button from "@/ui/components/inputs/Button";
import styles from "@/ui/css/ErrorFullViewport.module.css"
import Footer from "@/ui/layouts/footer";
import Header from "@/ui/layouts/header";

export default function NotFound() {
    return (
        <>
            <Header />
            <main>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>404</h2>
                        <p className={styles.message}>Page not found</p>
                        <Button type="link" href="/">Go back to homepage</Button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}