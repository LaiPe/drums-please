'use client'

import { useActionState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import Modal from "./Modal"
import { ActionState } from "@/lib/actions/categoryActions"

type Props = {
    isOpen: boolean
    onClose: () => void
    title: string
    description: string
    action: (_: ActionState, formData: FormData) => Promise<ActionState>
    entityId: number
}

const EMPTY: ActionState = {}

export default function DeleteConfirmModal({ isOpen, onClose, title, description, action, entityId }: Props) {
    const router = useRouter()
    const [state, formAction, isPending] = useActionState(action, EMPTY)
    const handled = useRef(false)

    useEffect(() => {
        if (state.success && !handled.current) {
            handled.current = true
            onClose()
            router.refresh()
        }
    }, [state.success, router, onClose])

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="admin-form">
                <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                    {description}
                </p>

                {state.error && <p className="admin-error">{state.error}</p>}

                <form action={formAction}>
                    <input type="hidden" name="id" value={entityId} />
                    <div className="admin-form-actions">
                        <button type="button" className="admin-btn-cancel" onClick={onClose}>Annuler</button>
                        <button type="submit" className="admin-btn-danger" disabled={isPending}>
                            <Trash2 size={14} strokeWidth={2} />
                            {isPending ? "Suppression…" : "Supprimer"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
