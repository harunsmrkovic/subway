import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Layer extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }

  state = {
    mounted: false
  }

  componentDidMount() {
    const canvas = this.node
    this.ctx = canvas.getContext('2d')

    this.setState({ mounted: true })
  }

  componentWillReceiveProps() {
    this.clearCanvas()
  }

  clearCanvas() {
    const { width, height } = this.props
    this.ctx.clearRect(0, 0, width, height)
  }

  renderChildrenWithCtx() {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        ctx: this.ctx
      })
    )
  }

  render() {
    const { width, height } = this.props
    return (
      <canvas ref={node => (this.node = node)} width={width} height={height}>
        {this.state.mounted && this.renderChildrenWithCtx()}
      </canvas>
    )
  }
}
