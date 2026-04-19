import Link from "next/link"
import "@/css/global.css"
import styles from "./index.module.css"
import BackgroundMedia from "@/components/backgrounds/BackgroundMedia"
import ProductCard from "@/components/index/ProductCard"

const heroTitle = ["Louez votre matériel", "à un prix imbatable !"]

const products = [
  {
    title: "Batteries Acoustiques",
    imageSrc: "/img/products-cards/bat-acous.jpg",
    link: "/produits/bat-acoustiques"
  },
  {
    title: "Batteries Électroniques",
    imageSrc: "/img/products-cards/bat-elec.jpg",
    link: "/produits/bat-electroniques"
  },
  {
    title: "Classiques",
    imageSrc: "/img/products-cards/perc-class.jpg",
    link: "/produits/classiques"
  },
  {
    title: "Traditionnelles",
    imageSrc: "/img/products-cards/perc-trad.jpg",
    link: "/produits/traditionnelles"
  },
]

export default function Page() {
  return (
    <>
      <section className={styles.heroSection}>
        <BackgroundMedia mediaType="video" mediaSrc="/videos/video-background-index.mp4" childrenClassName={styles.heroGradient}>
          <h2 className={styles.heroTitle}>
            <span>{heroTitle[0]}</span>
            <span>{heroTitle[1]}</span>
          </h2>
        </BackgroundMedia>
      </section>

      <section className={styles.productsSection}>
        {products.map((product) => (
          <ProductCard
            key={product.title}
            title={product.title}
            imageSrc={product.imageSrc}
            link={product.link}
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