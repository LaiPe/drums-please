'use client'

import { useActionState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Modal from "./Modal"
import MediaPicker from "./MediaPicker"
import { createProduct, updateProduct, ActionState } from "@/lib/actions/productActions"
import { Product } from "@/lib/db/schema"

type Props = {
    isOpen: boolean
    onClose: () => void
    product?: Product
    categoryId: number
}

const EMPTY: ActionState = {}

export default function ProductFormModal({ isOpen, onClose, product, categoryId }: Props) {
    const router = useRouter()
    const isEdit = !!product
    const action = isEdit ? updateProduct : createProduct
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
    }, [isOpen, product])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEdit ? `Modifier « ${product.name} »` : "Nouveau produit"}
        >
            <form ref={formRef} action={formAction} className="admin-form">
                {isEdit && <input type="hidden" name="id" value={product.id} />}

                <div className="admin-field">
                    <label className="admin-label" htmlFor="prod-name">Nom</label>
                    <input
                        id="prod-name"
                        name="name"
                        type="text"
                        className="admin-input"
                        placeholder="Ex : Pearl Export 5 pièces"
                        defaultValue={product?.name}
                        required
                    />
                </div>

                <div className="admin-field">
                    <label className="admin-label" htmlFor="prod-slug">Slug</label>
                    <input
                        id="prod-slug"
                        name="slug"
                        type="text"
                        className="admin-input"
                        placeholder="Ex : pearl-export-5-pieces (auto si vide)"
                        defaultValue={product?.slug}
                    />
                    <span className="admin-hint">Laissez vide pour générer automatiquement depuis le nom.</span>
                </div>

                <input type="hidden" name="categoryId" value={product?.categoryId ?? categoryId} />

<div className="admin-field">
                    <label className="admin-label">Image</label>
                    <MediaPicker
                        mediaType="image"
                        name="imageSrc"
                        defaultValue={product?.imageSrc}
                        folder="products"
                    />
                </div>

                <div className="admin-field">
                    <label className="admin-label" htmlFor="prod-desc">Description</label>
                    <textarea
                        id="prod-desc"
                        name="description"
                        className="admin-textarea"
                        placeholder="Description du produit (Markdown supporté)"
                        defaultValue={product?.description}
                        required
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
