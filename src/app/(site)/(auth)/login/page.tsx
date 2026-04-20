import Input from "@/components/inputs/Input";
import Button from "@/components/inputs/Button";
import styles from "@/css/AuthPage.module.css";

export default function Page() {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Log In</h2>
            <form>
                <Input type="email" label="Email :" placeholder="Enter your email" />
                <Input type="password" label="Password :" placeholder="Enter your password" />
                <Button>Log In</Button>
            </form>
        </section>
    )
}