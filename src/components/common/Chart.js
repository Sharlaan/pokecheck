import React, { PropTypes } from 'react'
import { Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis } from 'recharts'

// Dummy data for average stat values
const avg = {
  speed: 120,
  'special-attack': 98,
  'special-defense': 86,
  attack: 99,
  defense: 85,
  hp: 85
}

const Chart = ({ data, name, width, height }) => {
  const mergedData = data.map(obj => ({...obj, avg: avg[obj.subject]}))
  return (
    <RadarChart outerRadius={90} width={width} height={height} data={mergedData}>
      <Radar name='Average' dataKey='avg' stroke='#82ca9d' fill='#82ca9d' fillOpacity={0.6} />
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
