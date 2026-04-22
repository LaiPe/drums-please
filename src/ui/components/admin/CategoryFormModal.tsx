'use client'

import { useActionState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Modal from "./Modal"
import MediaPicker from "./MediaPicker"
import { createCategory, updateCategory, ActionState } from "@/lib/actions/categoryActions"
import { ProductCategory } from "@/lib/db/schema"

type Props = {
    isOpen: boolean
    onClose: () => void
    category?: ProductCategory
}

const EMPTY: ActionState = {}

export default function CategoryFormModal({ isOpen, onClose, category }: Props) {
    const router = useRouter()
    const isEdit = !!category
    const action = isEdit ? updateCategory : createCategory
    const [state, formAction, isPending] = useActionState(action, EMPTY)
    const formRef = useRef<HTMLFormElement>(null)
    const handled = useRef(false)

    useEffect(() => {
        if (state.success && !handled.current) {
            handled.current = true
            onClose()
            router.refresh()
        }
    }, [state.success, router, onClose])

    useEffect(() => {
        if (isOpen) {
            handled.current = false
            formRef.current?.reset()
        }
    }, [isOpen, category])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEdit ? `Modifier « ${category.name} »` : "Nouvelle catégorie"}
        >
            <form ref={formRef} action={formAction} className="admin-form">
                {isEdit && <input type="hidden" name="id" value={category.id} />}

                <div className="admin-field">
                    <label className="admin-label" htmlFor="cat-name">Nom</label>
                    <input
                        id="cat-name"
                        name="name"
                        type="text"
                        className="admin-input"
                        placeholder="Ex : Batteries acoustiques"
                        defaultValue={category?.name}
                        required
                    />
                </div>

                <div className="admin-field">
                    <label className="admin-label" htmlFor="cat-slug">Slug</label>
                    <input
                        id="cat-slug"
                        name="slug"
                        type="text"
                        className="admin-input"
                        placeholder="Ex : batteries-acoustiques (auto si vide)"
                        defaultValue={category?.slug}
                    />
                    <span className="admin-hint">Laissez vide pour générer automatiquement depuis le nom.</span>
                </div>

                <div className="admin-field">
                    <label className="admin-label">Image</label>
                    <MediaPicker
                        mediaType="image"
                        name="imageSrc"
                        defaultValue={category?.imageSrc}
                        folder="categories"
                    />
                </div>

                {state.error && <p className="admin-error">{state.error}</p>}

                <div className="admin-form-actions">
                    <button type="button" className="admin-btn-cancel" onClick={onClose}>Annuler</button>
                    <button type="submit" className="admin-btn-submit" disabled={isPending}>
                        {isPending ? "Enregistrement…" : isEdit ? "Enregistrer" : "Créer"}
                    </button>
                </div>
            </form>
        </Modal>
    )
}
