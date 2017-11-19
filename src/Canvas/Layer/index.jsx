import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Layer extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
  }

  state = {
    mounted: false
  }

  elements = []

  componentDidMount() {
    const canvas = this.node
    this.ctx = canvas.getContext('2d')

    this.setState({ mounted: true })
  }

  renderShapesWithProps() {
    return React.Children.map(
      this.props.children,
      shape => shape && React.cloneElement(shape, { ctx: this.ctx })
    )
  }

  componentWillUpdate() {
    this.clearCanvas()
  }

  clearCanvas() {
    const { width, height } = this.props
    this.ctx.clearRect(0, 0, width, height)
  }

  render() {
    const { width, height } = this.props
    return (
      <canvas ref={node => (this.node = node)} width={width} height={height}>
        {this.state.mounted && this.renderShapesWithProps()}
      </canvas>
    )
  }
}
