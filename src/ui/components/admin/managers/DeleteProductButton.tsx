'use client'

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Product } from "@/lib/db/schema"
import DeleteProductForm from "../forms/product/DeleteProductForm"
import styles from "./ProductManager.module.css"

type Props = {
    product: Product
    categorySlug: string
}

export default function DeleteProductButton({ product, categorySlug }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                type="button"
                className={`${styles.btnIcon} ${styles.btnDanger}`}
                aria-label="Supprimer"
                onClick={() => setOpen(true)}
            >
                <Trash2 size={14} strokeWidth={1.8} />
            </button>
            {open && (
                <DeleteProductForm
                    product={product}
                    categorySlug={categorySlug}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    )
}
