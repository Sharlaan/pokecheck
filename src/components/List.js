import React from 'react'
import container from '../containers/list_container'
import Loading from './common/Loading'
import CircularProgress from './common/CircularProgress'
import Paginator from './common/Paginator'
import Card from './common/Card'
import TextField from 'material-ui/TextField/TextField'
import CheckBox from 'material-ui/Checkbox/Checkbox'
import Snackbar from 'material-ui/Snackbar/Snackbar'
import IconMenu from 'material-ui/IconMenu/IconMenu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import IconButton from 'material-ui/IconButton/IconButton'
import Paper from 'material-ui/Paper/Paper'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

const styles = {
  paper: { padding: '20px 30px 30px' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: 10 },
  tableHeader: { textTransform: 'uppercase' },
  headerFont: { fontSize: 14 },
  actionsCell: { textAlign: 'right', paddingLeft: 5, paddingRight: 12, width: 96 }
}

const capitalize = string => string.replace(/(^|\s)[a-z]/g, s => s.toUpperCase())

const ListComponent = ({
  pokemons, count, limit, page, filterInput,
  handleEdit, handleLimitChange, handleFilterInput,
  error, showIDs, onShowIDsToggle }) => {
  if (!pokemons.length) return <Loading />

  const offset = (page - 1) * limit

  // Calculate first and last indexes for current page
  const first = offset
  const last = offset + limit < count ? offset + limit : count

  return (
    <Paper style={styles.paper}>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <CircularProgress />
      </div>

      <header style={styles.header}>
        <div>
          <h3 style={{margin: '0 0 10px'}}>Pokémons List</h3>
          <div>{first} - {last} from {count}</div>
        </div>
        <IconMenu
          iconButtonElement={<IconButton iconStyle={{padding: '-12px 0'}}><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem style={{padding: 16}}>
            <CheckBox label='Display IDs' checked={showIDs} onCheck={onShowIDsToggle} />
          </MenuItem>
          <MenuItem style={{paddingLeft: 16, paddingRight: 16}}>
            <div>Pokémons per page :</div>
            <div style={{display: 'flex', justifyContent: 'flex-end', textAlign: 'center'}}>
              {[20, 40, 100].map(lm => (
                <div onTouchTap={handleLimitChange(lm)} style={{width: 48}} key={lm}>{lm}</div>
              ))}
            </div>
          </MenuItem>
        </IconMenu>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '-15px 0 10px' }}>
        <TextField
          floatingLabelText="Pokemon filter"
          hintText="Type a pokemon's name"
          onChange={handleFilterInput}
          value={filterInput}
        />
      </div>

      <section className='row center-xs center-lg'>
        {pokemons.slice(offset, offset + limit).map(({id, name}) => (
          <div key={id} className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='box'>
              <Card
                id={id}
                title={capitalize(name)}
                showIDs={showIDs}
                onTouchTap={handleEdit(id)}
                style={{ height: 200, width: 180 }}
              />
            </div>
          </div>
        ))}
      </section>

      <Paginator
        width={5}
        currentPage={+page}
        nbPages={count ? Math.ceil(count / limit) : 1}
      />

      <Snackbar
        open={!!error}
        message={error || ''}
        autoHideDuration={4000}
      />

    </Paper>
  )
}

export default container(ListComponent)
