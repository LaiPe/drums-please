'use client'

import { useActionState, useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { upsertProducts, deleteProducts, type ActionState } from '@/lib/actions/homepageActions'
import { HomepageProducts, ProductCategory } from '@/lib/db/schema'
import CategorySorter from './CategorySorter'
import Button from '@/ui/components/inputs/Button'
import styles from './SectionCard.module.css'

type Props = {
    section: HomepageProducts | null
    allCategories: ProductCategory[]
}

const EMPTY: ActionState = {}

export default function ProductsSectionCard({ section, allCategories }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [upsertState, upsertAction, isUpsertPending] = useActionState(upsertProducts, EMPTY)
    const [deleteState, deleteAction, isDeletePending] = useActionState(deleteProducts, EMPTY)

    useEffect(() => {
        if (upsertState.success) setIsOpen(false)
    }, [upsertState.success])

    const count = section?.categoryIds?.length ?? 0

    return (
        <article className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.cardInfo}>
                    <h2 className={styles.cardTitle}>Section Produits</h2>
                    <p className={`${styles.cardStatus} ${section && count > 0 ? styles.cardStatusOk : styles.cardStatusEmpty}`}>
                        {section && count > 0
                            ? `${count} catégorie${count !== 1 ? 's' : ''} affichée${count !== 1 ? 's' : ''}`
                            : 'Masquée'}
                    </p>
                </div>
                <div className={styles.cardActions}>
                    {section ? (
                        <>
                            <Button type="button" variant="secondary" size="small" onClick={() => setIsOpen(o => !o)}>
                                <Pencil size={13} strokeWidth={1.8} />
                                {isOpen ? 'Fermer' : 'Modifier'}
                            </Button>
                            <form action={deleteAction}>
                                <Button type="submit" variant="secondary" size="icon" danger disabled={isDeletePending} aria-label="Supprimer">
                                    <Trash2 size={13} strokeWidth={1.8} />
                                </Button>
                            </form>
                        </>
                    ) : (
                        <Button type="button" variant="primary" size="small" onClick={() => setIsOpen(o => !o)}>
                            <Plus size={13} strokeWidth={2} />
                            {isOpen ? 'Fermer' : 'Configurer'}
                        </Button>
                    )}
                </div>
            </div>

            {isOpen && (
                <div className={styles.cardForm}>
                    <form action={upsertAction} className="admin-form">
                        <div className="admin-field">
                            <label className="admin-label">Catégories à afficher</label>
                            <CategorySorter
                                allCategories={allCategories}
                                defaultSelected={section?.categoryIds ?? []}
                            />
                        </div>
                        {upsertState.error && <p className="admin-error">{upsertState.error}</p>}
                        {deleteState.error && <p className="admin-error">{deleteState.error}</p>}
                        <div className={styles.formActions}>
                            <Button type="button" variant="secondary" size="small" onClick={() => setIsOpen(false)}>
                                Annuler
                            </Button>
                            <Button type="submit" variant="primary" size="small" disabled={isUpsertPending}>
                                {isUpsertPending ? 'Enregistrement…' : 'Enregistrer'}
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </article>
    )
}
