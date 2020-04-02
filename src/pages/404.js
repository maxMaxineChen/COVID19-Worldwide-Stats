import React from "react"
import {ThemeProvider} from "@material-ui/core/styles"
import {Typography} from "@material-ui/core"
import theme from "../components/theme"

const NotFoundPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h6" color="primary" align="center">
        Opps, seems like you are lost!
      </Typography>
    </ThemeProvider>
  )
}

export default NotFoundPage
