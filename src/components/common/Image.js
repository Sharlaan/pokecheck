import React, { Component, PropTypes } from 'react'

class Image extends Component {
  static propTypes = {
    src: PropTypes.string, // url
    defaultImg: PropTypes.string, // url for 'broken image url'
    style: PropTypes.object,
    alt: PropTypes.string
  }

  componentWillMount () {
    this.setState({
      imageUrl: this.props.src,
      style: this.props.style
    })
  }

  onError = () => {
    this.setState({
      imageUrl: this.props.defaultImg,
      style: {
        height: 34,
        width: 34,
        margin: '7px 12px 7px 6px',
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 4
      }
    })
  }

  render () {
    return (
      <img
        src={this.state.imageUrl}
        onError={this.onError}
        style={this.state.style}
        alt={this.props.alt}
      />
    )
  }
}

export default Image
