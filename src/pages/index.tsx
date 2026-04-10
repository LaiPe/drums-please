import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../layouts/Layout"
import "../css/global.css"
import * as styles from "./index.module.css"
import BackgroundMedia from "../components/index/BackgroundMedia"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <section className={styles.hero}>
        <h2 className={styles.heroTitle}>
          <span>Louez votre matériel</span>
          <span>à un prix imbatable !</span>
        </h2>
        <BackgroundMedia mediaType="video" mediaSrc="/videos/video-background-index.mp4"></BackgroundMedia>
      </section>
      
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
