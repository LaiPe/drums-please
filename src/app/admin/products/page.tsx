import Link from "next/link"
import { Pencil, Trash2, Plus, ChevronRight } from "lucide-react"
import { getAllProductCategories } from "@/lib/data/data"
import { ProductCategory } from "@/lib/db/schema"
import styles from "./products.module.css"

export default async function AdminProductsPage() {
    const categories: ProductCategory[] = await getAllProductCategories()

    return (
        <div className={styles.page}>
            <header className={styles.pageHeader}>
                <div>
                    <p className={styles.breadcrumb}>Administration</p>
                    <h1 className={styles.title}>Produits</h1>
                </div>
                <button type="button" className={styles.btnPrimary}>
                    <Plus size={16} strokeWidth={2} />
                    Nouvelle catégorie
                </button>
            </header>

            <section>
                <p className={styles.count}>{categories.length} catégorie{categories.length !== 1 ? "s" : ""}</p>
                <div className={styles.grid}>
                    {categories.map(category => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </section>
        </div>
    )
}

function CategoryCard({ category }: { category: ProductCategory }) {
    return (
        <article className={styles.card}>
            <div className={styles.cardImage}>
                <img src={category.imageSrc} alt={category.name} className={styles.cardImg} />
                <div className={styles.cardOverlay} />
                <h2 className={styles.cardTitle}>{category.name}</h2>
            </div>

            <div className={styles.cardFooter}>
                <div className={styles.cardMeta}>
                    <span className={styles.cardSlug}>{category.slug}</span>
                </div>
                <div className={styles.cardActions}>
                    <Link
                        href={`/admin/products/${category.slug}`}
                        className={styles.btnLink}
                    >
                        Gérer les produits
                        <ChevronRight size={14} strokeWidth={2} />
                    </Link>
                    <button type="button" className={styles.btnIcon} aria-label="Modifier la catégorie">
                        <Pencil size={15} strokeWidth={1.8} />
                    </button>
                    <button type="button" className={`${styles.btnIcon} ${styles.btnDanger}`} aria-label="Supprimer la catégorie">
                        <Trash2 size={15} strokeWidth={1.8} />
                    </button>
                </div>
            </div>
        </article>
    )
}
