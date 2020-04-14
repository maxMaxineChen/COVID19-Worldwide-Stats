import React from "react"
import {Helmet} from "react-helmet"
import {useStaticQuery, graphql} from "gatsby"

const useSiteMetadata = () => {
  const {site} = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            dataSource
            description
            siteSource
            title
            url
            language
          }
        }
      }
    `,
  )
  return site.siteMetadata
}

const Metadata = () => {
  const site = useSiteMetadata()

  return (
    <Helmet>
      <html itemScope itemType="http://schema.org/WebPage" lang={site.language} />

      <title itemProp="name">{site.title}</title>

      <meta name="author" content={site.author} />
      <meta name="description" content={site.description} />
      <link rel="canonical" href={site.url} />

      <link rel="preconnect" href="https://www.google-analytics.com" />

      <meta itemProp="name" content={site.title} />
      <meta itemProp="author" content={site.author} />
      <meta itemProp="description" content={site.description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={site.title} />
      <meta property="og:description" content={site.description} />
      <meta property="og:site_name" content={site.title} />
      <meta property="og:url" content={site.url} />
      <meta property="og:image" content={site.siteUrl + site.siteLogo} />
      <meta property="og:language" content={site.language} />
    </Helmet>
  )
}
export default Metadata
