import React, { PropTypes } from 'react'
import Legend from 'recharts/lib/component/Legend'
import RadarChart from 'recharts/lib/chart/RadarChart'
import Radar from 'recharts/lib/polar/Radar'
import PolarGrid from 'recharts/lib/polar/PolarGrid'
import PolarAngleAxis from 'recharts/lib/polar/PolarAngleAxis'
import PolarRadiusAxis from 'recharts/lib/polar/PolarRadiusAxis'

// TODO: find a way to display chart even if averages not available
const Chart = ({ type, name, width, height, data, avg }) => {
  const mergedData = data.map(obj => ({...obj, avg: avg[obj.subject]}))
  return (
    <RadarChart outerRadius={90} width={width} height={height} data={mergedData}>
      <Radar name={`Average (${type})`} dataKey='avg' stroke='#82ca9d' fill='#82ca9d' fillOpacity={0.6} />
      <Radar name={name} dataKey={name} stroke='#8884d8' fillOpacity={0} />
      <PolarGrid />
      <Legend />
      <PolarAngleAxis dataKey='subject' />
      <PolarRadiusAxis />
    </RadarChart>
  )
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string
}

export default Chart
