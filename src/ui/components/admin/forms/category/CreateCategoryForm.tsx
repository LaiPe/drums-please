'use client'

import { useActionState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { createCategory, ActionState } from "@/lib/actions/categoryActions"
import MediaPicker from "../../MediaPicker"
import styles from "../formPage.module.css"

const EMPTY: ActionState = {}

export default function CreateCategoryForm() {
    const [state, formAction, isPending] = useActionState(createCategory, EMPTY)

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link href="/admin/products" className={styles.back}>
                        <ChevronLeft size={12} strokeWidth={2} />
                        Produits
                    </Link>
                    <h1 className={styles.title}>Nouvelle catégorie</h1>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/admin/products" className="admin-btn-cancel">Annuler</Link>
                    <button type="submit" form="create-category-form" className="admin-btn-submit" disabled={isPending}>
                        {isPending ? "Enregistrement…" : "Créer"}
                    </button>
                </div>
            </div>

            <div className={styles.card}>
                <form id="create-category-form" action={formAction} className="admin-form">
                    <div className="admin-field">
                        <label className="admin-label" htmlFor="cat-name">Nom</label>
                        <input
                            id="cat-name"
                            name="name"
                            type="text"
                            className="admin-input"
                            placeholder="Ex : Batteries acoustiques"
                            required
                        />
                        {state.fieldErrors?.name && (
                            <span className="admin-field-error">{state.fieldErrors.name[0]}</span>
                        )}
                    </div>

                    <div className="admin-field">
                        <label className="admin-label">Image</label>
                        <MediaPicker mediaType="image" name="imageSrc" folder="categories" />
                        {state.fieldErrors?.imageSrc && (
                            <span className="admin-field-error">{state.fieldErrors.imageSrc[0]}</span>
                        )}
                    </div>

                    {state.error && <p className="admin-error">{state.error}</p>}
                </form>
            </div>
        </div>
    )
}
