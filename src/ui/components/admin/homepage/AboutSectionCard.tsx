'use client'

import { useActionState, useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { upsertAbout, deleteAbout, type ActionState } from '@/lib/actions/homepageActions'
import { HomepageAbout } from '@/lib/db/schema'
import MediaPicker from '@/ui/components/admin/MediaPicker'
import RichTextEditor from '@/ui/components/admin/RichTextEditor'
import Button from '@/ui/components/inputs/Button'
import styles from './SectionCard.module.css'

type Props = { about: HomepageAbout | null }

const EMPTY: ActionState = {}

export default function AboutSectionCard({ about }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [upsertState, upsertAction, isUpsertPending] = useActionState(upsertAbout, EMPTY)
    const [deleteState, deleteAction, isDeletePending] = useActionState(deleteAbout, EMPTY)

    useEffect(() => {
        if (upsertState.success) setIsOpen(false)
    }, [upsertState.success])

    return (
        <article className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.cardInfo}>
                    <h2 className={styles.cardTitle}>Section À propos</h2>
                    <p className={`${styles.cardStatus} ${about ? styles.cardStatusOk : styles.cardStatusEmpty}`}>
                        {about ? 'Configuré' : 'Masquée'}
                    </p>
                </div>
                <div className={styles.cardActions}>
                    {about ? (
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
                            <label className="admin-label">Image</label>
                            <MediaPicker
                                mediaType="image"
                                name="imageSrc"
                                defaultValue={about?.imageSrc ?? undefined}
                                folder="homepage"
                            />
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Contenu</label>
                            <RichTextEditor
                                name="content"
                                defaultValue={about?.content ?? undefined}
                                placeholder="Texte de présentation…"
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
