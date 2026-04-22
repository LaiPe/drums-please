'use client'

import { useState } from "react"
import Link from "next/link"
import { Pencil, Trash2, Plus, ChevronRight } from "lucide-react"
import { ProductCategory } from "@/lib/db/schema"
import { deleteCategory } from "@/lib/actions/categoryActions"
import CategoryFormModal from "./CategoryFormModal"
import DeleteConfirmModal from "./DeleteConfirmModal"
import styles from "./CategoryManager.module.css"

type ModalState =
    | { type: 'create' }
    | { type: 'edit'; category: ProductCategory }
    | { type: 'delete'; category: ProductCategory }
    | null

export default function CategoryManager({ categories }: { categories: ProductCategory[] }) {
    const [modal, setModal] = useState<ModalState>(null)

    return (
        <>
            <div className={styles.header}>
                <div>
                    <p className={styles.breadcrumb}>Administration</p>
                    <h1 className={styles.title}>Produits</h1>
                </div>
                <button type="button" className={styles.btnPrimary} onClick={() => setModal({ type: 'create' })}>
                    <Plus size={16} strokeWidth={2} />
                    Nouvelle catégorie
                </button>
            </div>

            <p className={styles.count}>{categories.length} catégorie{categories.length !== 1 ? "s" : ""}</p>

            <div className={styles.grid}>
                {categories.map(category => (
                    <article key={category.id} className={styles.card}>
                        <div className={styles.cardImage}>
                            <img src={category.imageSrc} alt={category.name} className={styles.cardImg} />
                            <div className={styles.cardOverlay} />
                            <h2 className={styles.cardTitle}>{category.name}</h2>
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.cardSlug}>{category.slug}</span>
                            <div className={styles.cardActions}>
                                <Link href={`/admin/products/${category.slug}`} className={styles.btnLink}>
                                    Gérer les produits
                                    <ChevronRight size={14} strokeWidth={2} />
                                </Link>
                                <button
                                    type="button"
                                    className={styles.btnIcon}
                                    aria-label="Modifier"
                                    onClick={() => setModal({ type: 'edit', category })}
                                >
                                    <Pencil size={15} strokeWidth={1.8} />
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.btnIcon} ${styles.btnDanger}`}
                                    aria-label="Supprimer"
                                    onClick={() => setModal({ type: 'delete', category })}
                                >
                                    <Trash2 size={15} strokeWidth={1.8} />
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <CategoryFormModal
                isOpen={modal?.type === 'create'}
                onClose={() => setModal(null)}
            />

            {modal?.type === 'edit' && (
                <CategoryFormModal
                    isOpen
                    onClose={() => setModal(null)}
                    category={modal.category}
                />
            )}

            {modal?.type === 'delete' && (
                <DeleteConfirmModal
                    isOpen
                    onClose={() => setModal(null)}
                    title={`Supprimer « ${modal.category.name} »`}
                    description={`Cette action est irréversible. La catégorie « ${modal.category.name} » et tous ses produits associés seront définitivement supprimés.`}
                    action={deleteCategory}
                    entityId={modal.category.id}
                />
            )}
        </>
    )
}
