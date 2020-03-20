import React from "react"
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
import {Typography, useMediaQuery} from "@material-ui/core"
import {useTheme} from "@material-ui/core/styles"
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

const DailyLineChart = ({data, title, color, aspectRatio}) => {
  const theme = useTheme()
  const breakpointsSmDown = useMediaQuery(theme.breakpoints.down("sm"))
  const aspect = breakpointsSmDown ? 0.8 : aspectRatio
  return (
    <>
      <Typography variant="h6" color="primary" align="center">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <LineChart
          data={data}
          margin={{top: 20, right: 10, bottom: 5, left: 0}}
        >
          <Line
            type="linear"
            dataKey="confirmed"
            stroke={color.confirmed}
            fill={color.confirmed}
          />
          <Line
            type="basis"
            dataKey="recovered"
            stroke={color.recovered}
            fill={color.recovered}
          />
          <Line
            type="monotone"
            dataKey="deaths"
            stroke={color.deaths}
            fill={color.deaths}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            dataKey="updatedDate"
            tick={<CustomizedAxisTick />}
            interval="preserveStartEnd"
          />
          <YAxis tick={{fontSize: "0.7rem", fill: "#000"}} />
          <Tooltip />
          <Legend wrapperStyle={{margin: -10}} />
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
