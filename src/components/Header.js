import React from "react"
import PropTypes from "prop-types"
import {makeStyles} from "@material-ui/core/styles"
import {useStaticQuery, graphql} from "gatsby"
import {Typography, AppBar, Toolbar, Hidden} from "@material-ui/core"

const useStyles = makeStyles(() => ({
  toolbar: {
    justifyContent: "space-between",
  },
  title: {
    display: "flex",
    fontSize: "1.3rem",
  },
  lastSync: {
    display: "flex",
    fontSize: "0.8rem",
  },
}))

const Header = ({lastSync}) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)
  const {title, description} = data.site.siteMetadata
  const classes = useStyles()
  return (
    <>
      <AppBar position="absolute">
        <Toolbar className={classes.toolbar}>
          <Hidden smUp>
            <Typography
              component="h1"
              variant="h1"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {title}
            </Typography>
          </Hidden>
          <Hidden xsDown>
            <Typography
              component="h1"
              variant="h1"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {description}
            </Typography>
          </Hidden>
          <Typography
            component="h1"
            variant="h5"
            color="inherit"
            noWrap
            className={classes.lastSync}
          >
            Site Updated:
            {` ${lastSync}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

Header.propTypes = {
  lastSync: PropTypes.string.isRequired,
}

export default Header
