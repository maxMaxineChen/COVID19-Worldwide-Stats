import React, {useState} from "react"
import {makeStyles, ThemeProvider} from "@material-ui/core/styles"
import {Grid, Paper} from "@material-ui/core"
import {useStaticQuery, graphql} from "gatsby"
import moment from "moment"
import theme from "../components/theme"
import Header from "../components/Header"
import Overview from "../components/Overview"
import DailyLineChart from "../components/DailyLineChart"
import CountryBarChart from "../components/CountryBarChart"
import Footer from "../components/Footer"

const useStyles = makeStyles(() => ({
  container: {
    padding: theme.spacing(1),
  },
  horizontalPaper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  verticalPaper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
  },
}))

const IndexPage = () => {
  const classes = useStyles()
  const color = {
    recovered: theme.palette.primary.main,
    confirmed: theme.palette.secondary.main,
    deaths: theme.palette.common.black,
  }
  const data = useStaticQuery(graphql`
    query MyQuery {
      allDataJson {
        nodes {
          confirmed
          deaths
          lastSync
          lastUpdate
          recovered
          errorStatus
          dailyReports {
            confirmed
            deaths
            errorStatus
            recovered
            updatedDate
            countries {
              confirmed
              country
              countryCode
              deaths
              recovered
            }
          }
        }
      }
    }
  `)
  const {
    errorStatus,
    lastSync,
    lastUpdate,
    confirmed,
    recovered,
    deaths,
    dailyReports,
  } = data.allDataJson.nodes[0]
  const [activeCountryIndex, setActiveCountryIndex] = useState(0)
  let siteUpdate =
    "There is an error in dataset. Please check with Data Source."
  const filteredDailyReports = []
  let theLatestReport = []
  let countryReport = {}
  let theLatestDate
  if (errorStatus === false) {
    siteUpdate = moment(lastSync)
      .local()
      .format("YYYY-MM-DD HH:MM")
    dailyReports.forEach(record => {
      if (record.errorStatus === false) {
        filteredDailyReports.push(record)
      }
    })
    const theLatestDateIndex = filteredDailyReports.length - 1
    const getCountryReport = () => {
      const activeCountryName =
        filteredDailyReports[theLatestDateIndex].countries[activeCountryIndex]
          .country
      const countryReportDaily = []
      filteredDailyReports.forEach(report => {
        report.countries.forEach(countryData => {
          if (countryData.country === activeCountryName) {
            countryReportDaily.push(
              Object.assign(countryData, {updatedDate: report.updatedDate}),
            )
          }
        })
      })
      return {countryReportDaily, activeCountryName}
    }
    theLatestDate = filteredDailyReports[theLatestDateIndex].updatedDate
    theLatestReport = filteredDailyReports[theLatestDateIndex].countries
    countryReport = getCountryReport()
  }
  return (
    <ThemeProvider theme={theme}>
      <Header lastSync={siteUpdate} />
      {errorStatus === false && (
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Paper className={classes.horizontalPaper}>
              <Overview
                confirmed={confirmed}
                recovered={recovered}
                deaths={deaths}
                lastUpdate={lastUpdate}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={classes.verticalPaper}>
              <DailyLineChart
                data={filteredDailyReports}
                title="COVID-19 Daily Reports"
                color={color}
                aspectRatio={3}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper className={classes.verticalPaper}>
              <CountryBarChart
                data={theLatestReport}
                lastUpdate={theLatestDate}
                handleClick={setActiveCountryIndex}
                title="COVID-19 Cases Worldwide"
                color={color}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper className={classes.verticalPaper}>
              <DailyLineChart
                data={countryReport.countryReportDaily}
                title={
                  <>
                    COVID-19 Daily Reports in
                    <br />
                    {countryReport.activeCountryName}
                  </>
                }
                color={color}
                aspectRatio={1.31}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
      <Footer />
    </ThemeProvider>
  )
}

export default IndexPage
