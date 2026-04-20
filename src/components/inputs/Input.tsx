import styles from "./Input.module.css"
import { JSX } from "react"

interface InputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea'
    options?: string[] // Only for select type
    placeholder?: string
    value?: string
    label?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

export default function Input({ type, options, placeholder, value, label, onChange }: InputProps) {
    let input: JSX.Element;

    if (type === 'select' && options) {
        input = (
            <select value={value} onChange={onChange} className={styles.select}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    }
    else if (type === 'textarea') {
        input = (
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={styles.textarea}
            />
        );
    }
    else {
        input = (
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={styles.input}
            />
        );
    }

    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            {input}
        </div>
    );
}