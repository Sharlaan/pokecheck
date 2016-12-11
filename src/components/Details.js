import React from 'react'
import container from '../containers/details_container'
import { getSpritesCDNurl } from '../helpers'
import Loading from './common/Loading'
import Snackbar from 'material-ui/Snackbar/Snackbar'
import Paper from 'material-ui/Paper/Paper'
import Card from 'material-ui/Card/Card'
import Image from './common/Image'
import Chart from './common/Chart'
import { grey200 } from 'material-ui/styles/colors'

const capitalize = string => string.replace(/(^|\s)[a-z]/g, s => s.toUpperCase())

const DetailsComponent = ({ id, name, stats, types, height, weight, specie, baseExperience, averages, error }) => {
  if (!name) return <Loading />

  const nameC = capitalize(name)
  const data = Object.keys(stats).map(statName => ({ subject: statName, [nameC]: stats[statName], fullMark: 150 }))

  return (
    <Paper style={{position: 'relative', padding: '0 20px 20px', width: 490}}>
      <Card style={{position: 'absolute', top: 20, right: 20, backgroundColor: grey200}}>
        <Image src={getSpritesCDNurl(id)} style={{width: 200}} />
      </Card>
      <h2 style={{margin: '20px 0 10px'}}>{nameC}</h2>
      <p style={{lineHeight: '27px', margin: 0}}>
        Specie: {specie}<br />
        Types: {types.join(', ')}<br />
        Experience: {baseExperience}<br />
        Height: {height}<br />
        Weight: {weight}<br />
        Base Stats:
      </p>
      <ul style={{marginTop: 0, paddingLeft: 20}}>
        {Object.keys(stats).map((statName, idx) => <li key={idx}>{statName}: {stats[statName]}</li>)}
      </ul>

      {averages.map(a => (
        <div key={a.type} style={{ marginBottom: 20 }}>
          <Chart
            type={a.type}
            name={nameC}
            width={450}
            height={250}
            data={data} avg={a.averages}
          />
        </div>
      ))}

      <Snackbar
        open={!!error}
        message={error || ''}
        autoHideDuration={4000}
      />
    </Paper>
  )
}

export default container(DetailsComponent)
