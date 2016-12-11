import React from 'react'
import container from '../containers/list_container'
import Loading from './common/Loading'
import Paginator from './common/Paginator'
import TextField from 'material-ui/TextField/TextField'
import CheckBox from 'material-ui/Checkbox/Checkbox'
import Snackbar from 'material-ui/Snackbar/Snackbar'
import IconMenu from 'material-ui/IconMenu/IconMenu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import IconButton from 'material-ui/IconButton/IconButton'
import Paper from 'material-ui/Paper/Paper'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Image from './common/Image'
import UnknownImg from '../unknown.png'
import { getSpritesCDNurl } from '../helpers'

const styles = {
  paper: { padding: '20px 30px 30px', minWidth: 350 },
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

      <TextField
        floatingLabelText="Pokemon filter"
        hintText="Type a pokemon's name"
        onChange={handleFilterInput}
        value={filterInput}
        style={{ margin: '-10px 0 10px' }}
      />

      <List>
        {pokemons.slice(offset, offset + limit).map(({id, name}) => (
          <ListItem
            key={id}
            leftIcon={(
              <Image
                src={getSpritesCDNurl(id)}
                defaultImg={UnknownImg}
                style={{ height: 48, width: 48, margin: '0 12px 0 0' }}
                alt={`${name}'s icon`}
              />)}
            primaryText={<div>{capitalize(name)}
              <div style={{ float: 'right', visibility: showIDs ? 'visible' : 'hidden' }}>{id}</div>
            </div>}
            onTouchTap={handleEdit(id)}
          />
        ))}
      </List>

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
