import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../layouts/Layout"
import "../css/global.css"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <h2>Welcome to Drums Please!</h2>
      <p>Your one-stop shop for all things drums. Explore our wide selection of drum kits, accessories, and more. Whether you're a beginner or a seasoned drummer, we have something for everyone. Start your drumming journey with us today!</p>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
