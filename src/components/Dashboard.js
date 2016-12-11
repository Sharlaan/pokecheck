import React from 'react'
import { Link } from 'react-router'
import container from '../containers/dashboard_container'

const DashboardComponent = () => (
  <section>
    <p>Home page</p>

    <Link to='/pokemons/page1'>Check Pokemons list</Link>

    <p><u>Known bugs :</u><br />
      - @ page37, ids jump from 721 to 10001 (05/12/2016)<br />
      - sprites not available for id > 10063 (05/12/2016)
    </p>
  </section>
)

export default container(DashboardComponent)
