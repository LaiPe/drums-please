'use client'

import { useActionState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { createProduct, ActionState } from "@/lib/actions/productActions"
import MediaPicker from "../../MediaPicker"
import RichTextEditor from "../../RichTextEditor"
import styles from "../formPage.module.css"

type Props = {
    categoryId: number
    categorySlug: string
}

const EMPTY: ActionState = {}

export default function CreateProductForm({ categoryId, categorySlug }: Props) {
    const [state, formAction, isPending] = useActionState(createProduct, EMPTY)

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Link href={`/admin/products/${categorySlug}`} className={styles.back}>
                    <ChevronLeft size={12} strokeWidth={2} />
                    Retour
                </Link>
                <h1 className={styles.title}>Nouveau produit</h1>
            </div>

            <div className={styles.card}>
                <form action={formAction} className="admin-form">
                    <input type="hidden" name="categoryId" value={categoryId} />
                    <input type="hidden" name="categorySlug" value={categorySlug} />

                    <div className="admin-field">
                        <label className="admin-label" htmlFor="prod-name">Nom</label>
                        <input
                            id="prod-name"
                            name="name"
                            type="text"
                            className="admin-input"
                            placeholder="Ex : Pearl Export 5 pièces"
                            required
                        />
                        {state.fieldErrors?.name && (
                            <span className="admin-field-error">{state.fieldErrors.name[0]}</span>
                        )}
                    </div>

                    <div className="admin-field">
                        <label className="admin-label">Image</label>
                        <MediaPicker mediaType="image" name="imageSrc" folder="products" />
                        {state.fieldErrors?.imageSrc && (
                            <span className="admin-field-error">{state.fieldErrors.imageSrc[0]}</span>
                        )}
                    </div>

                    <div className="admin-field">
                        <label className="admin-label">Description</label>
                        <RichTextEditor
                            name="description"
                            placeholder="Description du produit…"
                        />
                        {state.fieldErrors?.description && (
                            <span className="admin-field-error">{state.fieldErrors.description[0]}</span>
                        )}
                    </div>

                    {state.error && <p className="admin-error">{state.error}</p>}

                    <div className="admin-form-actions">
                        <Link href={`/admin/products/${categorySlug}`} className="admin-btn-cancel">Annuler</Link>
                        <button type="submit" className="admin-btn-submit" disabled={isPending}>
                            {isPending ? "Enregistrement…" : "Créer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
