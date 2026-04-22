import Link from "next/link"
import { notFound } from "next/navigation"
import { Pencil, Trash2, Plus, ChevronLeft, Package } from "lucide-react"
import { getCategoryBySlug, getProductsByCategorySlug } from "@/lib/data/data"
import { Product } from "@/lib/db/schema"
import styles from "./category.module.css"

type PageProps = { params: Promise<{ categorySlug: string }> }

export default async function AdminCategoryPage({ params }: PageProps) {
    const { categorySlug } = await params
    const [category, products] = await Promise.all([
        getCategoryBySlug(categorySlug),
        getProductsByCategorySlug(categorySlug),
    ])

    if (!category) notFound()

    return (
        <div className={styles.page}>
            <header className={styles.pageHeader}>
                <div>
                    <Link href="/admin/products" className={styles.back}>
                        <ChevronLeft size={14} strokeWidth={2} />
                        Produits
                    </Link>
                    <h1 className={styles.title}>{category.name}</h1>
                    <p className={styles.slug}>{category.slug}</p>
                </div>
                <div className={styles.headerActions}>
                    <button type="button" className={styles.btnSecondary}>
                        <Pencil size={14} strokeWidth={1.8} />
                        Modifier la catégorie
                    </button>
                    <button type="button" className={styles.btnPrimary}>
                        <Plus size={16} strokeWidth={2} />
                        Nouveau produit
                    </button>
                </div>
            </header>

            <div className={styles.categoryBanner}>
                <img src={category.imageSrc} alt={category.name} className={styles.bannerImg} />
                <div className={styles.bannerOverlay} />
            </div>

            <section>
                <p className={styles.count}>
                    {products.length} produit{products.length !== 1 ? "s" : ""}
                </p>

                {products.length === 0 ? (
                    <EmptyState categoryName={category.name} />
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
                                    <ProductRow key={product.id} product={product} categorySlug={categorySlug} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    )
}

function ProductRow({ product, categorySlug }: { product: Product; categorySlug: string }) {
    return (
        <tr className={styles.tr}>
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
                    <Link href={`/products/${categorySlug}#${product.slug}`} className={styles.btnLink} target="_blank">
                        Voir
                    </Link>
                    <button type="button" className={styles.btnIcon} aria-label="Modifier le produit">
                        <Pencil size={14} strokeWidth={1.8} />
                    </button>
                    <button type="button" className={`${styles.btnIcon} ${styles.btnDanger}`} aria-label="Supprimer le produit">
                        <Trash2 size={14} strokeWidth={1.8} />
                    </button>
                </div>
            </td>
        </tr>
    )
}

function EmptyState({ categoryName }: { categoryName: string }) {
    return (
        <div className={styles.empty}>
            <Package size={40} strokeWidth={1} className={styles.emptyIcon} />
            <p className={styles.emptyTitle}>Aucun produit dans <em>{categoryName}</em></p>
            <p className={styles.emptyHint}>Commencez par ajouter un premier produit à cette catégorie.</p>
        </div>
    )
}
