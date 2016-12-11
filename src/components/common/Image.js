import React, { Component, PropTypes } from 'react'

// TODO: simplify into stateless component
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
        height: this.props.height || this.props.width,
        width: this.props.height || this.props.width,
        margin: '7px 12px'
      }
    })
  }

  render () {
    return (
      <img
        src={this.state.imageUrl}
        onError={this.onError}
        style={{ ...this.state.style, ...this.props.style }}
        alt={this.props.alt}
      />
    )
  }
}

export default Image
