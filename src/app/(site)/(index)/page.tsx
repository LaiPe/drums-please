import styles from "./index.module.css"
import BackgroundMedia from "@/ui/components/backgrounds/BackgroundMedia"
import ProductCard from "@/ui/components/index/ProductCard"
import ViewportHeroWithText from "@/ui/components/hero/ViewportHeroWithText"
import { getAllProductCategories } from "@/lib/data/data"
import { getHomepageHero, getHomepageProducts, getHomepageAbout, getHomepageCta } from "@/lib/data/homepage"
import { createStorageProvider } from "@/lib/data/storage"
import Button from "@/ui/components/inputs/Button"
import ReactMarkdown from "react-markdown"

const imageProvider = createStorageProvider('images')
const videoProvider = createStorageProvider('videos')

function resolveMediaSrc(mediaType: string | null, mediaSrc: string | null): string | null {
    if (!mediaSrc) return null
    return mediaType === 'video'
        ? videoProvider.getUrl(mediaSrc)
        : imageProvider.getUrl(mediaSrc)
}

export default async function Page() {
    const [hero, productsSection, about, cta, allCategories] = await Promise.all([
        getHomepageHero(),
        getHomepageProducts(),
        getHomepageAbout(),
        getHomepageCta(),
        getAllProductCategories(),
    ])

    // Hero — always shown, fallback to placeholder
    const heroMediaSrc = resolveMediaSrc(hero?.mediaType ?? null, hero?.mediaSrc ?? null)
        ?? '/img/placeholder-homepage-hero.jpg'
    const heroMediaType = (hero?.mediaType as 'image' | 'video') ?? 'image'
    const heroText = hero?.text ?? 'Votre slogan ici'

    // Products — ordered by DB config, hidden if empty
    const categoryById = Object.fromEntries(allCategories.map(c => [c.id, c]))
    const displayedCategories = (productsSection?.categoryIds ?? [])
        .map(id => categoryById[id])
        .filter(Boolean)

    return (
        <>
            <section className={styles.heroSection}>
                <ViewportHeroWithText
                    title={heroText}
                    mediaType={heroMediaType}
                    mediaSrc={heroMediaSrc}
                />
            </section>

            {displayedCategories.length > 0 && (
                <section className={styles.productsSection}>
                    {displayedCategories.map(category => (
                        <ProductCard
                            key={`card-${category.slug}`}
                            title={category.name}
                            imageSrc={imageProvider.getUrl(category.imageSrc)}
                            link={`/products/${category.slug}`}
                        />
                    ))}
                </section>
            )}

            {about && (
                <section className={styles.aboutSection}>
                    {about.imageSrc && (
                        <img
                            className={styles.aboutImage}
                            src={imageProvider.getUrl(about.imageSrc)}
                            alt="À propos"
                        />
                    )}
                    {about.content && (
                        <div className={styles.aboutContent}>
                            <ReactMarkdown>{about.content}</ReactMarkdown>
                        </div>
                    )}
                </section>
            )}

            {cta && (
                <section className={styles.ctaSection}>
                    {cta.mediaSrc ? (
                        <BackgroundMedia
                            mediaType={(cta.mediaType as 'image' | 'video') ?? 'image'}
                            mediaSrc={resolveMediaSrc(cta.mediaType, cta.mediaSrc)!}
                            childrenClassName={styles.ctaContent}
                        >
                            {cta.title && <h3 className={styles.ctaTitle}>{cta.title}</h3>}
                            {cta.subtitle && <p>{cta.subtitle}</p>}
                            {cta.ctaLabel && (
                                <Button href="/register" variant="outline" size="very-large" className={styles.ctaButton}>
                                    {cta.ctaLabel}
                                </Button>
                            )}
                        </BackgroundMedia>
                    ) : (
                        <div className={styles.ctaContent}>
                            {cta.title && <h3 className={styles.ctaTitle}>{cta.title}</h3>}
                            {cta.subtitle && <p>{cta.subtitle}</p>}
                            {cta.ctaLabel && (
                                <Button href="/register" variant="outline" size="very-large" className={styles.ctaButton}>
                                    {cta.ctaLabel}
                                </Button>
                            )}
                        </div>
                    )}
                </section>
            )}
        </>
    )
}
