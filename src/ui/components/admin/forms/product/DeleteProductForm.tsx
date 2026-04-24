'use client'

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { deleteProduct, ActionState } from "@/lib/actions/productActions"
import { Product } from "@/lib/db/schema"
import Modal from "../../modal/Modal"
import styles from "../formPage.module.css"

type Props = {
    product: Product
    categorySlug: string
    onClose?: () => void
}

const EMPTY: ActionState = {}

export default function DeleteProductForm({ product, categorySlug, onClose }: Props) {
    const [state, formAction, isPending] = useActionState(deleteProduct, EMPTY)
    const router = useRouter()

    const handleClose = onClose ?? (() => router.back())

    return (
        <Modal
            isOpen={true}
            onClose={handleClose}
            title={`Supprimer « ${product.name} »`}
        >
            <p className={styles.description}>
                Cette action est irréversible. Le produit <strong>« {product.name} »</strong> sera
                définitivement supprimé.
            </p>

            <form action={formAction} className="admin-form">
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="categorySlug" value={categorySlug} />

                {state.error && <p className="admin-error">{state.error}</p>}

                <div className="admin-form-actions">
                    <button type="button" onClick={handleClose} className="admin-btn-cancel">
                        Annuler
                    </button>
                    <button type="submit" className="admin-btn-danger" disabled={isPending}>
                        <Trash2 size={14} strokeWidth={2} />
                        {isPending ? "Suppression…" : "Supprimer"}
                    </button>
                </div>
            </form>
        </Modal>
    )
}
