'use client'

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { ProductCategory } from "@/lib/db/schema"
import DeleteCategoryForm from "../forms/category/DeleteCategoryForm"
import Button from "../../inputs/Button"

export default function DeleteCategoryButton({ category }: { category: ProductCategory }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button
                type="button"
                variant="secondary"
                size="icon"
                danger
                aria-label="Supprimer"
                onClick={() => setOpen(true)}
            >
                <Trash2 size={15} strokeWidth={1.8} />
            </Button>
            {open && (
                <DeleteCategoryForm
                    category={category}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    )
}
