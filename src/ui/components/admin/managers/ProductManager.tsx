import Link from "next/link"
import { Pencil, Trash2, Plus, ChevronLeft, Package } from "lucide-react"
import { Product, ProductCategory } from "@/lib/db/schema"
import { createStorageProvider } from "@/lib/data/storage"
import styles from "./ProductManager.module.css"

type Props = {
    category: ProductCategory
    products: Product[]
}

export default function ProductManager({ category, products }: Props) {
    const imageProvider = createStorageProvider('images')

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
                    <Link
                        href={`/admin/products/${category.slug}/edit`}
                        className={styles.btnSecondary}
                    >
                        <Pencil size={14} strokeWidth={1.8} />
                        Modifier la catégorie
                    </Link>
                    <Link
                        href={`/admin/products/${category.slug}/create`}
                        className={styles.btnPrimary}
                    >
                        <Plus size={16} strokeWidth={2} />
                        Nouveau produit
                    </Link>
                </div>
            </div>

            <div className={styles.categoryBanner}>
                <img src={imageProvider.getUrl(category.imageSrc)} alt={category.name} className={styles.bannerImg} />
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
                                <th className={`${styles.th} ${styles.thActions}`}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} className={styles.tr}>
                                    <td className={styles.td}>
                                        <div className={styles.thumbWrapper}>
                                            <img src={imageProvider.getUrl(product.imageSrc)} alt={product.name} className={styles.thumb} />
                                        </div>
                                    </td>
                                    <td className={styles.td}>
                                        <span className={styles.productName}>{product.name}</span>
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
                                            <Link
                                                href={`/admin/products/${category.slug}/${product.id}/edit`}
                                                className={styles.btnIcon}
                                                aria-label="Modifier"
                                            >
                                                <Pencil size={14} strokeWidth={1.8} />
                                            </Link>
                                            <Link
                                                href={`/admin/products/${category.slug}/${product.id}/delete`}
                                                className={`${styles.btnIcon} ${styles.btnDanger}`}
                                                aria-label="Supprimer"
                                            >
                                                <Trash2 size={14} strokeWidth={1.8} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}
