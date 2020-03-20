import React from "react"
import PropTypes from "prop-types"
import {makeStyles} from "@material-ui/core/styles"
import {Card, Typography} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  overview: {
    display: "flex",
    justifyContent: "flex-start",
  },
  dataCardRoot: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  dataCard: {
    margin: `${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(
      1,
    )}px ${theme.spacing(2)}px`,
    justifyContent: "center",
    boxShadow: "none",
  },
  content: {
    textAlign: "center",
  },
}))

const Overview = ({confirmed, recovered, deaths, lastUpdate}) => {
  const classes = useStyles()
  return (
    <>
      <Typography
        className={classes.overview}
        variant="h6"
        color="primary"
        gutterBottom
      >
        {`Overview (Until ${lastUpdate})`}
      </Typography>
      <div className={classes.dataCardRoot}>
        <Card className={classes.dataCard}>
          <Typography variant="h3" color="textPrimary" gutterBottom>
            {confirmed}
          </Typography>
          <Typography
            className={classes.content}
            color="textSecondary"
            gutterBottom
          >
            Total Confirmed
          </Typography>
        </Card>
        <Card className={classes.dataCard}>
          <Typography variant="h3" color="textPrimary" gutterBottom>
            {recovered}
          </Typography>
          <Typography
            className={classes.content}
            color="textSecondary"
            gutterBottom
          >
            Total Recovered
          </Typography>
        </Card>
        <Card className={classes.dataCard}>
          <Typography variant="h3" color="textPrimary" gutterBottom>
            {deaths}
          </Typography>
          <Typography
            className={classes.content}
            color="textSecondary"
            gutterBottom
          >
            Total Deaths
          </Typography>
        </Card>
      </div>
    </>
  )
}

Overview.propTypes = {
  confirmed: PropTypes.number.isRequired,
  recovered: PropTypes.number.isRequired,
  deaths: PropTypes.number.isRequired,
  lastUpdate: PropTypes.string.isRequired,
}
export default Overview
