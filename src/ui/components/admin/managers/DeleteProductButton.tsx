'use client'

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Product } from "@/lib/db/schema"
import DeleteProductForm from "../forms/product/DeleteProductForm"
import Button from "../../inputs/Button"

type Props = {
    product: Product
    categorySlug: string
}

export default function DeleteProductButton({ product, categorySlug }: Props) {
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
                <Trash2 size={14} strokeWidth={1.8} />
            </Button>
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
