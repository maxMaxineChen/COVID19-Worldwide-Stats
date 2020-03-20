module.exports = {
  siteMetadata: {
    title: `COVID-19`,
    description: `Coronavirus COVID-19 Statistics Worldwide`,
    author: `Maxine Chen`,
    siteSource: `https://github.com/maxMaxineChen/COVID19-Worldwide-Stats.github.io`,
    dataSource: `https://github.com/maxMaxineChen/COVID-19-worldwide-json-data-script`,
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
  ],
}
