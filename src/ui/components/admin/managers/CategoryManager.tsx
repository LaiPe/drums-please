import Link from "next/link"
import { Pencil, Plus, ChevronRight } from "lucide-react"
import { ProductCategory } from "@/lib/db/schema"
import { createStorageProvider } from "@/lib/data/storage"
import DeleteCategoryButton from "./DeleteCategoryButton"
import styles from "./CategoryManager.module.css"

export default function CategoryManager({ categories }: { categories: ProductCategory[] }) {
    const imageProvider = createStorageProvider('images')

    return (
        <>
            <div className={styles.header}>
                <div>
                    <p className={styles.breadcrumb}>Administration</p>
                    <h1 className={styles.title}>Produits</h1>
                </div>
                <Link href="/admin/products/create" className={styles.btnPrimary}>
                    <Plus size={16} strokeWidth={2} />
                    Nouvelle catégorie
                </Link>
            </div>

            <p className={styles.count}>{categories.length} catégorie{categories.length !== 1 ? "s" : ""}</p>

            <div className={styles.grid}>
                {categories.map(category => (
                    <article key={category.id} className={styles.card}>
                        <div className={styles.cardImage}>
                            <img src={imageProvider.getUrl(category.imageSrc)} alt={category.name} className={styles.cardImg} />
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
                                <Link
                                    href={`/admin/products/${category.slug}/edit`}
                                    className={styles.btnIcon}
                                    aria-label="Modifier"
                                >
                                    <Pencil size={15} strokeWidth={1.8} />
                                </Link>
                                <DeleteCategoryButton category={category} />
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </>
    )
}
