import Link from "next/link"
import styles from "./Button.module.css"

export type ButtonVariant = "primary" | "secondary"
export type ButtonSize = "large" | "medium" | "small" | "icon"

type LinkButtonProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string
    variant?: ButtonVariant
    size?: ButtonSize
    danger?: boolean
}

type NativeButtonProps = React.ComponentPropsWithoutRef<"button"> & {
    href?: never
    variant?: ButtonVariant
    size?: ButtonSize
    danger?: boolean
}

export type ButtonProps = LinkButtonProps | NativeButtonProps

export default function Button(props: ButtonProps) {
    const variant = props.variant ?? "secondary"
    const size = props.size ?? "medium"
    const cls = [styles[size], styles[variant], props.danger && styles.danger, props.className].filter(Boolean).join(" ")

    if (props.href !== undefined) {
        const { href, variant: _v, size: _s, danger: _d, ...anchorProps } = props as LinkButtonProps
        return <Link href={href} {...anchorProps} className={cls} />
    }

    const { variant: _v, size: _s, danger: _d, className: _c, ...buttonProps } = props as NativeButtonProps
    return <button {...buttonProps} className={cls} />
}
