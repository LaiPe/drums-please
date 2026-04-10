import * as React from "react"
import { Link, type HeadFC, type PageProps } from "gatsby"
import Layout from "../layouts/Layout"
import "../css/global.css"
import * as styles from "./index.module.css"
import BackgroundMedia from "../components/backgrounds/BackgroundMedia"
import ProductCard from "../components/index/ProductCard"

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

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>

      <section className={styles.hero}>
        <BackgroundMedia mediaType="video" mediaSrc="/videos/video-background-index.mp4" childrenClassName={styles.heroGradient}>
          <h2 className={styles.heroTitle}>
            <span>{heroTitle[0]}</span>
            <span>{heroTitle[1]}</span>
          </h2>
        </BackgroundMedia>
      </section>

      <section className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.title}
            title={product.title}
            imageSrc={product.imageSrc}
            link={product.link}
          />
        ))}
      </section>


    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
