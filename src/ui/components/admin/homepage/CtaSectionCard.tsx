'use client'

import { useActionState, useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { upsertCta, deleteCta, type ActionState } from '@/lib/actions/homepageActions'
import { HomepageCta } from '@/lib/db/schema'
import MediaTypePicker from '@/ui/components/admin/MediaTypePicker'
import Button from '@/ui/components/inputs/Button'
import Input from '@/ui/components/inputs/Input'
import styles from './SectionCard.module.css'

type Props = { cta: HomepageCta | null }

const EMPTY: ActionState = {}

export default function CtaSectionCard({ cta }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [upsertState, upsertAction, isUpsertPending] = useActionState(upsertCta, EMPTY)
    const [deleteState, deleteAction, isDeletePending] = useActionState(deleteCta, EMPTY)

    useEffect(() => {
        if (upsertState.success) setIsOpen(false)
    }, [upsertState.success])

    return (
        <article className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.cardInfo}>
                    <h2 className={styles.cardTitle}>Section CTA</h2>
                    <p className={`${styles.cardStatus} ${cta ? styles.cardStatusOk : styles.cardStatusEmpty}`}>
                        {cta ? 'Configuré' : 'Masquée'}
                    </p>
                </div>
                <div className={styles.cardActions}>
                    {cta ? (
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
                            <label className="admin-label">Média de fond</label>
                            <MediaTypePicker
                                defaultMediaType={(cta?.mediaType as 'image' | 'video') ?? 'video'}
                                defaultMediaSrc={cta?.mediaSrc ?? undefined}
                                folder="homepage"
                            />
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Titre</label>
                            <Input
                                variant="admin"
                                name="title"
                                noWrap
                                placeholder="Ex : Alors n'hésitez plus !"
                                defaultValue={cta?.title ?? undefined}
                            />
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Sous-titre</label>
                            <Input
                                variant="admin"
                                name="subtitle"
                                noWrap
                                placeholder="Ex : Profitez de la réduction de 50% pour votre première location."
                                defaultValue={cta?.subtitle ?? undefined}
                            />
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Libellé du bouton</label>
                            <Input
                                variant="admin"
                                name="ctaLabel"
                                noWrap
                                placeholder="Ex : Inscrivez-vous !"
                                defaultValue={cta?.ctaLabel ?? undefined}
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
