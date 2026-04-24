'use client'

import { useActionState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { updateProduct, ActionState } from "@/lib/actions/productActions"
import { Product } from "@/lib/db/schema"
import MediaPicker from "../../MediaPicker"
import RichTextEditor from "../../RichTextEditor"
import styles from "../formPage.module.css"

type Props = {
    product: Product
    categorySlug: string
}

const EMPTY: ActionState = {}

export default function EditProductForm({ product, categorySlug }: Props) {
    const [state, formAction, isPending] = useActionState(updateProduct, EMPTY)

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link href={`/admin/products/${categorySlug}`} className={styles.back}>
                        <ChevronLeft size={12} strokeWidth={2} />
                        Retour
                    </Link>
                    <h1 className={styles.title}>Modifier « {product.name} »</h1>
                </div>
                <div className={styles.headerActions}>
                    <Link href={`/admin/products/${categorySlug}`} className="admin-btn-cancel">Annuler</Link>
                    <button type="submit" form="edit-product-form" className="admin-btn-submit" disabled={isPending}>
                        {isPending ? "Enregistrement…" : "Enregistrer"}
                    </button>
                </div>
            </div>

            <div className={styles.card}>
                <form id="edit-product-form" action={formAction} className="admin-form">
                    <input type="hidden" name="id" value={product.id} />
                    <input type="hidden" name="categoryId" value={product.categoryId} />
                    <input type="hidden" name="categorySlug" value={categorySlug} />

                    <div className="admin-field">
                        <label className="admin-label" htmlFor="prod-name">Nom</label>
                        <input
                            id="prod-name"
                            name="name"
                            type="text"
                            className="admin-input"
                            placeholder="Ex : Pearl Export 5 pièces"
                            defaultValue={product.name}
                            required
                        />
                        {state.fieldErrors?.name && (
                            <span className="admin-field-error">{state.fieldErrors.name[0]}</span>
                        )}
                    </div>

                    <div className="admin-field">
                        <label className="admin-label">Image</label>
                        <MediaPicker
                            mediaType="image"
                            name="imageSrc"
                            defaultValue={product.imageSrc}
                            folder="products"
                        />
                        {state.fieldErrors?.imageSrc && (
                            <span className="admin-field-error">{state.fieldErrors.imageSrc[0]}</span>
                        )}
                    </div>

                    <div className="admin-field">
                        <label className="admin-label">Description</label>
                        <RichTextEditor
                            name="description"
                            defaultValue={product.description}
                            placeholder="Description du produit…"
                        />
                        {state.fieldErrors?.description && (
                            <span className="admin-field-error">{state.fieldErrors.description[0]}</span>
                        )}
                    </div>

                    {state.error && <p className="admin-error">{state.error}</p>}
                </form>
            </div>
        </div>
    )
}
