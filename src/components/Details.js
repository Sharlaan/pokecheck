import React from 'react'
import container from '../containers/pokemon_container'
import Loading from './common/Loading'
import Snackbar from 'material-ui/Snackbar/Snackbar'
import Paper from 'material-ui/Paper/Paper'
import Card from 'material-ui/Card/Card'
import Image from './common/Image'
import Chart from './common/Chart'
import { grey200 } from 'material-ui/styles/colors'

const capitalize = string => string.replace(/(^|\s)[a-z]/g, s => s.toUpperCase())

const DetailsComponent = ({ name, stats, types, height, weight, sprite, specie, baseExperience, error }) => {
  if (!name.length) return <Loading />

  const nameC = capitalize(name)
  const data = stats.map(({name, value}) => ({ subject: name, [nameC]: value, fullMark: 150 }))

  return (
    <Paper style={{position: 'relative', padding: '0 20px 20px'}}>
      <Card style={{position: 'absolute', top: 20, right: 20, backgroundColor: grey200}}>
        <Image src={sprite} style={{width: 200}} />
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
        {stats.map(({name, value}, idx) => <li key={idx}>{name}: {value}</li>)}
      </ul>

      <Chart data={data} name={nameC} width={450} height={250} />

      <Snackbar
        open={!!error}
        message={error || ''}
        autoHideDuration={4000}
      />
    </Paper>
  )
}

export default container(DetailsComponent)
