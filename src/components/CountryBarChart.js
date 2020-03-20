import React from "react"
import PropTypes from "prop-types"
import {makeStyles, useTheme} from "@material-ui/core/styles"
import {Typography, Paper, useMediaQuery} from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination"
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import _ from "lodash"

const useStyles = makeStyles(() => ({
  tooltipPaper: {
    padding: "8px",
  },
  tooltipTitle: {
    fontSize: "1rem",
  },
  tooltipContent: {
    fontSize: "0.8rem",
  },
  tooltipComment: {
    paddingTop: "3px",
    fontSize: "0.6rem",
  },
}))

const CustomTooltip = ({active, payload, lastUpdate}) => {
  const classes = useStyles()
  if (active) {
    return (
      <Paper className={classes.tooltipPaper}>
        <Typography
          component="h1"
          variant="body1"
          color="inherit"
          noWrap
          className={classes.tooltipTitle}
        >
          {`${payload[0].payload.country}`}
        </Typography>
        <Typography
          component="p"
          variant="body1"
          color="secondary"
          noWrap
          className={classes.tooltipContent}
        >
          {`Confirmed : ${payload[0].payload.confirmed}`}
        </Typography>
        <Typography
          component="p"
          variant="body1"
          color="primary"
          noWrap
          className={classes.tooltipContent}
        >
          {`Recovered : ${payload[0].payload.recovered}`}
        </Typography>
        <Typography
          component="p"
          variant="body1"
          color="inherit"
          noWrap
          className={classes.tooltipContent}
        >
          {`Deaths : ${payload[0].payload.deaths}`}
        </Typography>
        <Typography
          component="h1"
          variant="body1"
          color="inherit"
          noWrap
          className={classes.tooltipComment}
        >
          {`Last Updated: ${lastUpdate}`}
        </Typography>
        <Typography
          component="p"
          variant="body1"
          color="inherit"
          noWrap
          className={classes.tooltipComment}
        >
          click bars to show the country daily reports as below
        </Typography>
      </Paper>
    )
  }
  return null
}

const CountryBarChart = ({data, lastUpdate, handleClick, title, color}) => {
  const theme = useTheme()
  const breakpointsSmDown = useMediaQuery(theme.breakpoints.down("sm"))
  const aspect = breakpointsSmDown ? 0.8 : 1.32
  const [pageIndex, setPageIndex] = React.useState(1)
  const handleChangePage = (event, newPageIndex) => {
    setPageIndex(newPageIndex)
  }
  const rowPerPage = 10
  const countPage = Math.ceil(data.length / rowPerPage)
  const paginationData = (originData, index) => {
    let currentPageData = []
    if (index !== countPage) {
      currentPageData = originData.slice(
        rowPerPage * (index - 1),
        rowPerPage * (index - 1) + rowPerPage,
      )
    } else {
      currentPageData = originData.slice(
        rowPerPage * (index - 1),
        rowPerPage * (index - 1) + (originData.length % rowPerPage),
      )
    }
    return currentPageData
  }
  const handleClickIndex = (originData, index) => {
    const dataIndex = rowPerPage * (pageIndex - 1) + index
    handleClick(dataIndex)
  }
  const currentPageData = paginationData(data, pageIndex)
  return (
    <>
      <Typography variant="h6" color="primary" noWrap align="center">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart
          data={currentPageData}
          margin={{top: 20, right: 10, left: 10, bottom: 5}}
          barCategoryGap={7}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            tick={{fill: "#000"}}
            type="number"
            allowDecimals={false}
            domain={["dataMin", dataMax => Math.ceil(dataMax / 10) * 10]}
          />
          <YAxis
            tick={{fontSize: "0.7rem", overflow: "hidden", fill: "#000"}}
            width={40}
            name="country"
            type="category"
            dataKey="countryCode"
            onClick={handleClickIndex}
          />
          <Tooltip content={<CustomTooltip lastUpdate={lastUpdate} />} />
          <Legend />
          <Bar
            dataKey="confirmed"
            stackId="a"
            fill={color.confirmed}
            onClick={handleClickIndex}
          >
            {currentPageData.map(() => (
              <Cell cursor="pointer" key={_.uniqueId()} />
            ))}
          </Bar>
          <Bar
            dataKey="recovered"
            stackId="a"
            fill={color.recovered}
            onClick={handleClickIndex}
          >
            {currentPageData.map(() => (
              <Cell cursor="pointer" key={_.uniqueId()} />
            ))}
          </Bar>
          <Bar
            dataKey="deaths"
            stackId="a"
            fill={color.deaths}
            onClick={handleClickIndex}
          >
            {currentPageData.map(() => (
              <Cell cursor="pointer" key={_.uniqueId()} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <Pagination
        count={countPage}
        page={pageIndex}
        onChange={handleChangePage}
        siblingCount={2}
        shape="rounded"
        size="small"
      />
    </>
  )
}

CountryBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      confirmed: PropTypes.number.isRequired,
      recovered: PropTypes.number.isRequired,
      deaths: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      countryCode: PropTypes.string.isRequired,
      length: PropTypes.number,
    }),
  ).isRequired,
  lastUpdate: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.shape({
    confirmed: PropTypes.string.isRequired,
    recovered: PropTypes.string.isRequired,
    deaths: PropTypes.string.isRequired,
  }).isRequired,
}
CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.object),
  lastUpdate: PropTypes.string,
}
CustomTooltip.defaultProps = {active: false, payload: [], lastUpdate: ""}
export default CountryBarChart
