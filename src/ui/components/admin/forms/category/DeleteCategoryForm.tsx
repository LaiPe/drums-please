'use client'

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { deleteCategory, ActionState } from "@/lib/actions/categoryActions"
import { ProductCategory } from "@/lib/db/schema"
import Modal from "../../modal/Modal"
import styles from "../formPage.module.css"

type Props = {
    category: ProductCategory
    onClose?: () => void
}

const EMPTY: ActionState = {}

export default function DeleteCategoryForm({ category, onClose }: Props) {
    const [state, formAction, isPending] = useActionState(deleteCategory, EMPTY)
    const router = useRouter()

    const handleClose = onClose ?? (() => router.back())

    return (
        <Modal
            isOpen={true}
            onClose={handleClose}
            title={`Supprimer « ${category.name} »`}
        >
            <p className={styles.description}>
                Cette action est irréversible. La catégorie <strong>« {category.name} »</strong> et
                tous ses produits associés seront définitivement supprimés.
            </p>

            <form action={formAction} className="admin-form">
                <input type="hidden" name="id" value={category.id} />

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
