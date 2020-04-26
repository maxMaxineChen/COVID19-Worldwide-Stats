module.exports = {
  pathPrefix: "/COVID19-Worldwide-Stats",
  siteMetadata: {
    title: "COVID-19 Statistics Worldwide",
    description: "Coronavirus COVID-19 Statistics Worldwide",
    author: "Maxine Chen",
    language: "en",
    siteUrl: "https://maxmaxinechen.github.io",
    siteSource: "https://github.com/maxMaxineChen/COVID19-Worldwide-Stats.github.io",
    dataSource: "https://github.com/maxMaxineChen/COVID-19-worldwide-json-data-script",
    url: "https://maxmaxinechen.github.io/COVID19-Worldwide-Stats",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-theme-material-ui`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Coronavirus COVID-19 Statistics Worldwide",
        short_name: "COVID-19 Stats",
        start_url: "/",
        background_color: "#fafafa",
        theme_color: "#008dc9",
        display: "standalone",
        icon: "images/icon.png",
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-163384902-2",
        head: true,
      },
    },
    `gatsby-plugin-sitemap`,
  ],
}
