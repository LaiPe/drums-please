'use client'

import { useActionState } from "react"
import { ChevronLeft } from "lucide-react"
import { updateCategory, ActionState } from "@/lib/actions/categoryActions"
import { ProductCategory } from "@/lib/db/schema"
import MediaPicker from "../../MediaPicker"
import Button from "@/ui/components/inputs/Button"
import Input from "@/ui/components/inputs/Input"
import styles from "../formPage.module.css"
import Link from "next/link"

type Props = { category: ProductCategory }

const EMPTY: ActionState = {}

export default function EditCategoryForm({ category }: Props) {
    const [state, formAction, isPending] = useActionState(updateCategory, EMPTY)

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link href="/admin/products" className={styles.back}>
                        <ChevronLeft size={12} strokeWidth={2} />
                        Produits
                    </Link>
                    <h1 className={styles.title}>Modifier « {category.name} »</h1>
                </div>
                <div className={styles.headerActions}>
                    <Button href="/admin/products" variant="secondary">Annuler</Button>
                    <Button type="submit" form="edit-category-form" variant="primary" disabled={isPending}>
                        {isPending ? "Enregistrement…" : "Enregistrer"}
                    </Button>
                </div>
            </div>

            <div className={styles.card}>
                <form id="edit-category-form" action={formAction} className="admin-form">
                    <input type="hidden" name="id" value={category.id} />

                    <div className="admin-field">
                        <label className="admin-label" htmlFor="cat-name">Nom</label>
                        <Input
                            id="cat-name"
                            name="name"
                            type="text"
                            variant="admin"
                            noWrap
                            placeholder="Ex : Batteries acoustiques"
                            defaultValue={category.name}
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
                            defaultValue={category.imageSrc}
                            folder="categories"
                        />
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
