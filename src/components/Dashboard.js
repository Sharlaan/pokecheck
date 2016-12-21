import React from 'react'
import { Link } from 'react-router'
import container from '../containers/dashboard_container'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton'

const DashboardComponent = () => (
  <section>
    <p>Home page</p>

    <RaisedButton
      primary
      label={<Link to='/pokemons/page1' style={{textDecoration: 'none', color: 'white'}}>
        Pokemons list
      </Link>}
    />
  </section>
)

export default container(DashboardComponent)
