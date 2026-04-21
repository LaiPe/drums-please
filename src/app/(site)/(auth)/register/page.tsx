import Input from "@/ui/components/inputs/Input";
import Button from "@/ui/components/inputs/Button";
import styles from "@/ui/css/AuthPage.module.css";

export default function Page() {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Register</h2>
            <form>     
                <Input type="email" label="Email :" placeholder="Enter your email" />
                <Input type="password" label="Password :" placeholder="Enter your password" />
                <Button>Register</Button>
            </form>
        </section>
    )
}