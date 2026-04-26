'use client'

import { useActionState, useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { upsertLogo, deleteLogo, type ActionState } from '@/lib/actions/brandIdentityActions'
import { BrandIdentityLogo } from '@/lib/db/schema'
import MediaPicker from '@/ui/components/admin/MediaPicker'
import Button from '@/ui/components/inputs/Button'
import cardStyles from '@/ui/components/admin/homepage/SectionCard.module.css'
import styles from './LogoSectionCard.module.css'

const DEFAULT_DESKTOP = '/img/logos/logo-large-drums-please.png'
const DEFAULT_MOBILE  = '/img/logos/logo-mobile-drums-please.png'

type Props = { logo: BrandIdentityLogo | null }

const EMPTY: ActionState = {}

export default function LogoSectionCard({ logo }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [upsertState, upsertAction, isUpsertPending] = useActionState(upsertLogo, EMPTY)
    const [deleteState, deleteAction, isDeletePending] = useActionState(deleteLogo, EMPTY)

    useEffect(() => {
        if (upsertState.success) setIsOpen(false)
    }, [upsertState.success])

    return (
        <article className={cardStyles.card}>
            <div className={cardStyles.cardHeader}>
                <div className={cardStyles.cardInfo}>
                    <h2 className={cardStyles.cardTitle}>Logo</h2>
                    <p className={`${cardStyles.cardStatus} ${logo ? cardStyles.cardStatusOk : cardStyles.cardStatusEmpty}`}>
                        {logo ? 'Configuré' : 'Affiche le logo par défaut'}
                    </p>
                </div>
                <div className={cardStyles.cardActions}>
                    {logo ? (
                        <>
                            <Button type="button" variant="secondary" size="small" onClick={() => setIsOpen(o => !o)}>
                                <Pencil size={13} strokeWidth={1.8} />
                                {isOpen ? 'Fermer' : 'Modifier'}
                            </Button>
                            <form action={deleteAction}>
                                <Button type="submit" variant="secondary" size="icon" danger disabled={isDeletePending} aria-label="Réinitialiser">
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

            {!isOpen && !logo && (
                <div className={styles.logoPreview}>
                    <div className={styles.logoPreviewItem}>
                        <span className={styles.logoPreviewLabel}>Desktop</span>
                        <div className={styles.logoPreviewBox}>
                            <img src={DEFAULT_DESKTOP} alt="Logo desktop par défaut" className={styles.logoPreviewImg} />
                        </div>
                    </div>
                    <div className={styles.logoPreviewItem}>
                        <span className={styles.logoPreviewLabel}>Mobile</span>
                        <div className={styles.logoPreviewBox}>
                            <img src={DEFAULT_MOBILE} alt="Logo mobile par défaut" className={styles.logoPreviewImg} />
                        </div>
                    </div>
                </div>
            )}

            {isOpen && (
                <div className={cardStyles.cardForm}>
                    <form action={upsertAction} className="admin-form">
                        <div className="admin-field">
                            <label className="admin-label">Logo desktop</label>
                            <MediaPicker
                                mediaType="image"
                                name="logoDesktopSrc"
                                defaultValue={logo?.logoDesktopSrc ?? undefined}
                                folder="brand-identity"
                            />
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">
                                Logo mobile
                                <span className={styles.optionalTag}>optionnel</span>
                            </label>
                            <MediaPicker
                                mediaType="image"
                                name="logoMobileSrc"
                                defaultValue={logo?.logoMobileSrc ?? undefined}
                                folder="brand-identity"
                            />
                        </div>
                        {upsertState.error && <p className="admin-error">{upsertState.error}</p>}
                        {deleteState.error && <p className="admin-error">{deleteState.error}</p>}
                        <div className={cardStyles.formActions}>
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
