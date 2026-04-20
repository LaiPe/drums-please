import Link from "next/link"
import styles from "./Button.module.css"

interface ButtonProps {
    type?: "button" | "submit" | "reset" | "link"
    href?: string
    children?: React.ReactNode
    onClick?: () => void
}

export default function Button({ type, href, children, onClick }: ButtonProps) {
    if (type === "link") {
        return (
            <Link href={href || "#"} className={styles.button} onClick={onClick}>
                {children}
            </Link>
        )
    }

    return (
        <button type={type} className={styles.button} onClick={onClick}>
            {children}
        </button>
    )
}