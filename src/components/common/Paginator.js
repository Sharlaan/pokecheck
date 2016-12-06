import React from 'react'
import { Link } from 'react-router'
import { blue500 } from 'material-ui/styles/colors'
import FirstPage from 'material-ui/svg-icons/navigation/first-page'
import LastPage from 'material-ui/svg-icons/navigation/last-page'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  pages: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 0,
    margin: '0 20px'
  },
  page: { marginRight: 10 },
  emphasize: { fontSize: 20, fontWeight: 'bold' },
  link: { textDecoration: 'none', color: blue500 },
  navLink: { display: 'flex' }
}

// Current page is centered within the [min, max] range
const Paginator = ({ nbPages, width = 2, currentPage = 1 }) => {
  if (width % 2 === 0) width++

  const range = Array.from(new Set(Array.from({length: width}, (v, k) => {
    const offset = currentPage - Math.floor(width / 2)
    if (k + offset >= nbPages) return nbPages
    else if (k + offset > 1) return k + offset
    return 1
  })))

  const isFirstPageVisible = range[0] === 1 ? 'hidden' : 'visible'
  const isLastPageVisible = range[range.length - 1] === nbPages ? 'hidden' : 'visible'

  return (
    <div style={styles.container}>
      <Link style={styles.navLink} to={`/pokemons/page1`}>
        <FirstPage style={{ visibility: isFirstPageVisible }} />
      </Link>

      <ul style={styles.pages}>
        {range.map(page => (
          <li key={page} style={(page < range[range.length - 1]) ? styles.page : {}}>
            {page === parseInt(currentPage, 10)
              ? <span style={styles.emphasize}>{page}</span>
              : <Link to={`/pokemons/page${page}`} style={styles.link}>
                {page}
              </Link>
            }
          </li>
        ))}
      </ul>

      <Link style={styles.navLink} to={`/pokemons/page${nbPages}`}>
        <LastPage style={{ visibility: isLastPageVisible }} />
      </Link>
    </div>
  )
}

Paginator.propTypes = {
  nbPages: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  currentPage: React.PropTypes.number.isRequired
}

export default Paginator
