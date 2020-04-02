import React, {useState} from "react"
import PropTypes from "prop-types"
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import {Typography, ButtonGroup, Button, useMediaQuery} from "@material-ui/core"
import {makeStyles, useTheme} from "@material-ui/core/styles"
import moment from "moment"

const CustomizedAxisTick = ({x, y, payload}) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#000" fontSize="0.7rem">
        {moment(payload.value).format("MM/DD")}
      </text>
    </g>
  )
}
const useStyles = makeStyles(() => ({
  tabButtonGroup: {
    alignSelf: "flex-end",
  },
}))
const DailyLineChart = ({
  data,
  title,
  color,
  aspectRatio,
  mode,
  handleClick,
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const breakpointsSmDown = useMediaQuery(theme.breakpoints.down("sm"))
  const aspect = breakpointsSmDown ? 0.8 : aspectRatio
  const dataMode = new Array(3)
  dataMode.total = ["confirmed", "recovered", "deaths"]
  dataMode.growth = ["confirmedGrowth", "recoveredGrowth", "deathsGrowth"]
  dataMode.growthRate = [
    "confirmedGrowthRate",
    "recoveredGrowthRate",
    "deathsGrowthRate",
  ]
  const [opacity, setOpacity] = useState({
    confirmed: 0.5,
    recovered: 0.5,
    deaths: 0.5,
  })
  const isActive = tab => {
    if (mode === tab) return {backgroundColor: theme.palette.secondary.main}
    return {backgroundColor: theme.palette.primary.main}
  }
  const handleMouseEnter = event => {
    const {value} = event.payload
    setOpacity({...opacity, [value]: 1})
  }
  const handleMouseLeave = event => {
    const {value} = event.payload
    setOpacity({...opacity, [value]: 0.5})
  }
  return (
    <>
      <Typography variant="h6" color="primary" align="center">
        {title}
      </Typography>
      <ButtonGroup
        variant="contained"
        color="primary"
        size="small"
        className={classes.tabButtonGroup}
      >
        <Button style={isActive("total")} onClick={() => handleClick("total")}>
          Total
        </Button>
        <Button
          style={isActive("growth")}
          onClick={() => handleClick("growth")}
        >
          Growth
        </Button>
        <Button
          style={isActive("growthRate")}
          onClick={() => handleClick("growthRate")}
        >
          Growth Rate
        </Button>
      </ButtonGroup>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <LineChart
          data={data}
          margin={{top: 20, right: 10, bottom: 5, left: 0}}
        >
          <Line
            type="monotone"
            dataKey={dataMode[mode][0]}
            stroke={color.confirmed}
            fill={color.confirmed}
            strokeOpacity={opacity.confirmed}
            dot={false}
            value="confirmed"
          />
          <Line
            type="monotone"
            dataKey={dataMode[mode][1]}
            stroke={color.recovered}
            fill={color.recovered}
            strokeOpacity={opacity.recovered}
            dot={false}
            value="recovered"
          />
          <Line
            type="monotone"
            dataKey={dataMode[mode][2]}
            stroke={color.deaths}
            fill={color.deaths}
            strokeOpacity={opacity.deaths}
            dot={false}
            value="deaths"
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            dataKey="updatedDate"
            tick={<CustomizedAxisTick />}
            interval="preserveStartEnd"
          />
          <YAxis tick={{fontSize: "0.7rem", fill: "#000"}} />
          <Tooltip />
          <Legend
            wrapperStyle={{margin: -10}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

DailyLineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      confirmed: PropTypes.number.isRequired,
      recovered: PropTypes.number.isRequired,
      deaths: PropTypes.number.isRequired,
      updatedDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.node.isRequired,
  color: PropTypes.shape({
    confirmed: PropTypes.string.isRequired,
    recovered: PropTypes.string.isRequired,
    deaths: PropTypes.string.isRequired,
  }).isRequired,
  aspectRatio: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}
CustomizedAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
}
CustomizedAxisTick.defaultProps = {x: 0, y: 0, payload: {}}
export default DailyLineChart
