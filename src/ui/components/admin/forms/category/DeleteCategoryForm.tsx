'use client'

import { useActionState } from "react"
import Link from "next/link"
import { ChevronLeft, Trash2 } from "lucide-react"
import { deleteCategory, ActionState } from "@/lib/actions/categoryActions"
import { ProductCategory } from "@/lib/db/schema"
import styles from "../formPage.module.css"

type Props = { category: ProductCategory }

const EMPTY: ActionState = {}

export default function DeleteCategoryForm({ category }: Props) {
    const [state, formAction, isPending] = useActionState(deleteCategory, EMPTY)

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Link href="/admin/products" className={styles.back}>
                    <ChevronLeft size={12} strokeWidth={2} />
                    Produits
                </Link>
                <h1 className={styles.title}>Supprimer « {category.name} »</h1>
            </div>

            <div className={styles.card}>
                <p className={styles.description}>
                    Cette action est irréversible. La catégorie <strong>« {category.name} »</strong> et
                    tous ses produits associés seront définitivement supprimés.
                </p>

                <form action={formAction} className="admin-form">
                    <input type="hidden" name="id" value={category.id} />

                    {state.error && <p className="admin-error">{state.error}</p>}

                    <div className="admin-form-actions">
                        <Link href="/admin/products" className="admin-btn-cancel">Annuler</Link>
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
