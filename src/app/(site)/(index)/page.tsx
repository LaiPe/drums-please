import Link from "next/link"
import styles from "./index.module.css"
import BackgroundMedia from "@/ui/components/backgrounds/BackgroundMedia"
import ProductCard from "@/ui/components/index/ProductCard"
import ViewportHeroWithText from "@/ui/components/hero/ViewportHeroWithText"
import { getAllProductCategories } from "@/lib/data/data"
import { ProductCategory } from "@/lib/db/schema"
import { createStorageProvider } from "@/lib/data/storage"

const imageProvider = createStorageProvider('images')

export default async function Page() {
  const productCategories : ProductCategory[] = await getAllProductCategories()
  return (
    <>
      <section className={styles.heroSection}>
        <ViewportHeroWithText 
          titleSpans={["Louez votre matériel", "à un prix imbatable !"]}
          mediaType="video" 
          mediaSrc="/videos/video-background-index.mp4" 
        />
      </section>

      <section className={styles.productsSection}>
        {productCategories.map((category) => (
          <ProductCard
            key={`card-${category.slug}`}
            title={category.name}
            imageSrc={imageProvider.getUrl(category.imageSrc)}
            link={`/products/${category.slug}`}
          />
        ))}
      </section>

      <section className={styles.aboutSection}>
        <img
          className={styles.aboutImage}
          src="/img/fond-presentation.png"
        />
        <div className={styles.aboutContent}>
          <p>
            Tout a commencé il y a quelques années, dans un coin de mon
            appartement, où les murs résonnaient des rythmes que je frappais
            avec ma batterie. La musique a toujours été
            <em>ma muse</em>, <em>mon refuge</em>, mais l'espace limité ne
            permettait pas d'exprimer pleinement ma créativité.
          </p>
          <p>
            Face à cette contrainte, j'ai cherché une solution. Et c'est ainsi
            qu'est née l'idée de
            <strong>Drums Please</strong>. Je me suis dit : pourquoi ne pas
            <strong>rendre les percussions accessibles à tous</strong>, peu
            importe l'espace dont ils disposent ? Pourquoi ne pas permettre à
            chacun de vivre la magie des rythmes, sans avoir à investir dans un
            instrument encombrant ?
          </p>
          <p>
            Ce qui nous différencie chez Drums Please, c'est notre
            <strong>engagement envers nos clients</strong>. Nous ne sommes pas
            simplement une entreprise de location d'instruments. Nous sommes une
            <strong>communauté de passionnés</strong>, prêts à accompagner
            chaque musicien, débutant ou expérimenté, dans son voyage musical.
          </p>
          <p>
            Aujourd'hui, nous avons grandi, mais notre esprit demeure le même.
            Nous restons fidèles à nos valeurs fondatrices :
            <strong>l'accessibilité</strong>, <strong>la qualité</strong> et
            <strong>le service personnalisé</strong>.
          </p>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <BackgroundMedia mediaType="video" mediaSrc="/videos/video-background-index.mp4" childrenClassName={styles.ctaContent}>
          <h3 className={styles.ctaTitle}>Alors n'hésitez plus !</h3>
          <p>Profitez de la réduction de 50% pour votre première location.</p>
          <Link href="/register" className={styles.ctaButton}>Inscrivez-vous !</Link>
        </BackgroundMedia>
      </section>
    </>
  )
}