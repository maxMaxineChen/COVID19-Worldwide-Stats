import React, {useState} from "react"
import {makeStyles, ThemeProvider} from "@material-ui/core/styles"
import {Grid, Paper} from "@material-ui/core"
import {useStaticQuery, graphql} from "gatsby"
import moment from "moment"
import theme from "../components/theme"
import SEO from "../components/SEO"
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
              confirmedGrowth
              confirmedGrowthRate
              deathsGrowth
              deathsGrowthRate
              recoveredGrowth
              recoveredGrowthRate
            }
            confirmedGrowth
            confirmedGrowthRate
            deathsGrowth
            deathsGrowthRate
            recoveredGrowth
            recoveredGrowthRate
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
  const [dailyReportsMode, setDailyReportsMode] = useState("total")
  const [countryReportsMode, setCountryReportsMode] = useState("total")
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
    filteredDailyReports[theLatestDateIndex].countries.sort((a, b) => {
      return (b.confirmed - a.confirmed)
    })
    theLatestDate = filteredDailyReports[theLatestDateIndex].updatedDate
    theLatestReport = filteredDailyReports[theLatestDateIndex].countries
    countryReport = getCountryReport()
  }
  return (
    <ThemeProvider theme={theme}>
      <SEO />
      <Header lastSync={siteUpdate} />
      {errorStatus === false && (
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Paper className={classes.horizontalPaper}>
              <Overview
                confirmed={confirmed}
                recovered={recovered}
                deaths={deaths}
                lastUpdate={moment(lastUpdate)
                  .local()
                  .format("YYYY-MM-DD HH:MM")}
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
                mode={dailyReportsMode}
                handleClick={setDailyReportsMode}
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
                title={`Reports for ${countryReport.activeCountryName}`}
                mode={countryReportsMode}
                handleClick={setCountryReportsMode}
                color={color}
                aspectRatio={1.335}
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
