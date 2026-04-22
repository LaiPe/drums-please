'use client'

import { useState } from "react"
import Link from "next/link"
import { Pencil, Trash2, Plus, ChevronLeft, Package } from "lucide-react"
import { Product, ProductCategory } from "@/lib/db/schema"

import { deleteProduct } from "@/lib/actions/productActions"
import ProductFormModal from "./ProductFormModal"
import DeleteConfirmModal from "./DeleteConfirmModal"
import styles from "./ProductManager.module.css"

type ModalState =
    | { type: 'create' }
    | { type: 'edit'; product: Product }
    | { type: 'delete'; product: Product }
    | null

type Props = {
    category: ProductCategory
    products: Product[]
}

export default function ProductManager({ category, products }: Props) {
    const [modal, setModal] = useState<ModalState>(null)

    return (
        <>
            <div className={styles.pageHeader}>
                <div>
                    <Link href="/admin/products" className={styles.back}>
                        <ChevronLeft size={14} strokeWidth={2} />
                        Produits
                    </Link>
                    <h1 className={styles.title}>{category.name}</h1>
                    <p className={styles.slug}>{category.slug}</p>
                </div>
                <div className={styles.headerActions}>
                    <button type="button" className={styles.btnSecondary} onClick={() => { /* ouvre modal edit catégorie via prop si besoin */ }}>
                        <Pencil size={14} strokeWidth={1.8} />
                        Modifier la catégorie
                    </button>
                    <button type="button" className={styles.btnPrimary} onClick={() => setModal({ type: 'create' })}>
                        <Plus size={16} strokeWidth={2} />
                        Nouveau produit
                    </button>
                </div>
            </div>

            <div className={styles.categoryBanner}>
                <img src={category.imageSrc} alt={category.name} className={styles.bannerImg} />
                <div className={styles.bannerOverlay} />
            </div>

            <p className={styles.count}>
                {products.length} produit{products.length !== 1 ? "s" : ""}
            </p>

            {products.length === 0 ? (
                <div className={styles.empty}>
                    <Package size={40} strokeWidth={1} className={styles.emptyIcon} />
                    <p className={styles.emptyTitle}>Aucun produit dans <em>{category.name}</em></p>
                    <p className={styles.emptyHint}>Commencez par ajouter un premier produit à cette catégorie.</p>
                </div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Image</th>
                                <th className={styles.th}>Nom</th>
                                <th className={styles.th}>Slug</th>
                                <th className={`${styles.th} ${styles.thActions}`}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} className={styles.tr}>
                                    <td className={styles.td}>
                                        <div className={styles.thumbWrapper}>
                                            <img src={product.imageSrc} alt={product.name} className={styles.thumb} />
                                        </div>
                                    </td>
                                    <td className={styles.td}>
                                        <span className={styles.productName}>{product.name}</span>
                                    </td>
                                    <td className={styles.td}>
                                        <code className={styles.productSlug}>{product.slug}</code>
                                    </td>
                                    <td className={`${styles.td} ${styles.tdActions}`}>
                                        <div className={styles.rowActions}>
                                            <Link
                                                href={`/products/${category.slug}#${product.slug}`}
                                                className={styles.btnLink}
                                                target="_blank"
                                            >
                                                Voir
                                            </Link>
                                            <button
                                                type="button"
                                                className={styles.btnIcon}
                                                aria-label="Modifier"
                                                onClick={() => setModal({ type: 'edit', product })}
                                            >
                                                <Pencil size={14} strokeWidth={1.8} />
                                            </button>
                                            <button
                                                type="button"
                                                className={`${styles.btnIcon} ${styles.btnDanger}`}
                                                aria-label="Supprimer"
                                                onClick={() => setModal({ type: 'delete', product })}
                                            >
                                                <Trash2 size={14} strokeWidth={1.8} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ProductFormModal
                isOpen={modal?.type === 'create'}
                onClose={() => setModal(null)}
                categoryId={category.id}
            />

            {modal?.type === 'edit' && (
                <ProductFormModal
                    isOpen
                    onClose={() => setModal(null)}
                    product={modal.product}
                    categoryId={category.id}
                />
            )}

            {modal?.type === 'delete' && (
                <DeleteConfirmModal
                    isOpen
                    onClose={() => setModal(null)}
                    title={`Supprimer « ${modal.product.name} »`}
                    description={`Cette action est irréversible. Le produit « ${modal.product.name} » sera définitivement supprimé.`}
                    action={deleteProduct}
                    entityId={modal.product.id}
                />
            )}
        </>
    )
}
