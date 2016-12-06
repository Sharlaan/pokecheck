import React from 'react'
import IconButton from 'material-ui/IconButton'
import ActionGrade from 'material-ui/svg-icons/action/grade'

export default () => {
  const bookmark = () => {
    const { location, addToHomescreen, sidebar, opera, external, print } = window
    const title = document.title
    const url = location.href

    if (addToHomescreen && addToHomescreen.isCompatible) {
      addToHomescreen({ autostart: false, startDelay: 0 }).show(true) // For Mobile browsers
    } else if (sidebar && sidebar.addPanel) {
      sidebar.addPanel(title, url, '')// For Firefox version < 23
    } else if ((sidebar && /Firefox/i.test(navigator.userAgent)) || (opera && print)) {
      this.href = url
      this.title = title // For Firefox version >= 23 and Opera Hotlist
      this.rel = 'sidebar'
    } else if (external && ('AddFavorite' in external)) {
      external.AddFavorite(url, title) // IE
    } else { // Other browsers (mainly WebKit - Chrome/Safari)
      alert('Please Press ' + (/Mac/i.test(navigator.userAgent) ? 'Cmd' : 'Ctrl') + '+D to bookmark this Pokémon.')
    }
  }

  return <IconButton tooltip='Bookmark this Pokémon' onTouchTap={bookmark}><ActionGrade /></IconButton>
}
