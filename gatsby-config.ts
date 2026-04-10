import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `drums-please`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-mdx", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  },
  {
    resolve: `gatsby-omni-font-loader`,
    options: {
      enableListener: true,
      preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
      web: [
        {
          name: `Righteous`,
          file: `https://fonts.googleapis.com/css2?family=Righteous&display=swap`,
        },
        {
          name: "Ojuju",
          file: `https://fonts.googleapis.com/css2?family=Ojuju:wght@200..800&display=swap`,
        },
        {
          name: "Poppins",
          file: `https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`,
        },
        {
          name: "Nothing You Could Do",
          file: `https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap`,
        }
      ],
    },
  }]
};

export default config;
