'use client'

import { useActionState } from "react"
import Link from "next/link"
import { ChevronLeft, Trash2 } from "lucide-react"
import { deleteProduct, ActionState } from "@/lib/actions/productActions"
import { Product } from "@/lib/db/schema"
import styles from "../formPage.module.css"

type Props = {
    product: Product
    categorySlug: string
}

const EMPTY: ActionState = {}

export default function DeleteProductForm({ product, categorySlug }: Props) {
    const [state, formAction, isPending] = useActionState(deleteProduct, EMPTY)

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Link href={`/admin/products/${categorySlug}`} className={styles.back}>
                    <ChevronLeft size={12} strokeWidth={2} />
                    Retour
                </Link>
                <h1 className={styles.title}>Supprimer « {product.name} »</h1>
            </div>

            <div className={styles.card}>
                <p className={styles.description}>
                    Cette action est irréversible. Le produit <strong>« {product.name} »</strong> sera
                    définitivement supprimé.
                </p>

                <form action={formAction} className="admin-form">
                    <input type="hidden" name="id" value={product.id} />
                    <input type="hidden" name="categorySlug" value={categorySlug} />

                    {state.error && <p className="admin-error">{state.error}</p>}

                    <div className="admin-form-actions">
                        <Link href={`/admin/products/${categorySlug}`} className="admin-btn-cancel">Annuler</Link>
                        <button type="submit" className="admin-btn-danger" disabled={isPending}>
                            <Trash2 size={14} strokeWidth={2} />
                            {isPending ? "Suppression…" : "Supprimer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
