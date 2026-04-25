import styles from "./Input.module.css"
import { JSX } from "react"

export type InputVariant = "default" | "admin"

type CommonProps = {
    variant?: InputVariant
    label?: string
    options?: string[]
    noWrap?: boolean
}

type InputProps = CommonProps & Omit<React.ComponentPropsWithoutRef<"input">, "type"> & {
    type?: "text" | "email" | "password" | "number" | "select" | "textarea"
}

export default function Input({ type, variant = "default", options, label, noWrap, ...rest }: InputProps) {
    const isAdmin = variant === "admin"

    let input: JSX.Element

    if (type === "select" && options) {
        const { defaultValue, ...selectRest } = rest as React.ComponentPropsWithoutRef<"select"> & { defaultValue?: string }
        input = (
            <select
                defaultValue={defaultValue}
                {...selectRest}
                className={isAdmin ? styles.adminSelect : styles.select}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        )
    } else if (type === "textarea") {
        input = (
            <textarea
                {...(rest as React.ComponentPropsWithoutRef<"textarea">)}
                className={isAdmin ? styles.adminTextarea : styles.textarea}
            />
        )
    } else {
        input = (
            <input
                type={type}
                {...rest}
                className={isAdmin ? styles.adminInput : styles.input}
            />
        )
    }

    if (noWrap) return input

    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            {input}
        </div>
    )
}
