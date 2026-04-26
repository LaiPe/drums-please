'use client'

import { useActionState, useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { upsertHero, deleteHero, type ActionState } from '@/lib/actions/homepageActions'
import { HomepageHero } from '@/lib/db/schema'
import MediaTypePicker from '@/ui/components/admin/MediaTypePicker'
import Button from '@/ui/components/inputs/Button'
import Input from '@/ui/components/inputs/Input'
import styles from './SectionCard.module.css'

type Props = { hero: HomepageHero | null }

const EMPTY: ActionState = {}

export default function HeroSectionCard({ hero }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [upsertState, upsertAction, isUpsertPending] = useActionState(upsertHero, EMPTY)
    const [deleteState, deleteAction, isDeletePending] = useActionState(deleteHero, EMPTY)

    useEffect(() => {
        if (upsertState.success) setIsOpen(false)
    }, [upsertState.success])

    return (
        <article className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.cardInfo}>
                    <h2 className={styles.cardTitle}>Section Héro</h2>
                    <p className={`${styles.cardStatus} ${hero ? styles.cardStatusOk : styles.cardStatusEmpty}`}>
                        {hero ? 'Configuré' : 'Affiche le contenu par défaut'}
                    </p>
                </div>
                <div className={styles.cardActions}>
                    {hero ? (
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

            {!isOpen && !hero && (
                <div
                    className={styles.emptyPlaceholder}
                    style={{ backgroundImage: 'url(/img/placeholder-homepage-hero.jpg)' }}
                >
                    <p className={styles.emptyPlaceholderText}>Votre slogan ici</p>
                </div>
            )}

            {isOpen && (
                <div className={styles.cardForm}>
                    <form action={upsertAction} className="admin-form">
                        <div className="admin-field">
                            <label className="admin-label">Média de fond</label>
                            <MediaTypePicker
                                defaultMediaType={(hero?.mediaType as 'image' | 'video') ?? 'video'}
                                defaultMediaSrc={hero?.mediaSrc ?? undefined}
                                folder="homepage"
                            />
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Texte du héro</label>
                            <Input
                                variant="admin"
                                name="text"
                                noWrap
                                placeholder="Ex : Louez votre matériel à un prix imbattable !"
                                defaultValue={hero?.text ?? undefined}
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
