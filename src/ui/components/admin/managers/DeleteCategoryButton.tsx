'use client'

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { ProductCategory } from "@/lib/db/schema"
import DeleteCategoryForm from "../forms/category/DeleteCategoryForm"
import styles from "./CategoryManager.module.css"

export default function DeleteCategoryButton({ category }: { category: ProductCategory }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                type="button"
                className={`${styles.btnIcon} ${styles.btnDanger}`}
                aria-label="Supprimer"
                onClick={() => setOpen(true)}
            >
                <Trash2 size={15} strokeWidth={1.8} />
            </button>
            {open && (
                <DeleteCategoryForm
                    category={category}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    )
}
