import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Rectangle extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    radius: PropTypes.number,
    ctx: PropTypes.object
  }

  componentDidMount() {
    const { x, y, width, height, radius } = this.props
    this.drawRectangle(x, y, width, height, radius)
  }

  componentWillReceiveProps({ x, y, width, height, radius }) {
    this.drawRectangle(x, y, width, height, radius)
  }

  render() {
    return null
  }

  get ctx() {
    return this.props.ctx
  }

  drawRectangle(x, y, width, height, radius = 0) {
    if (!radius) {
      this._drawNormalRectangle(x, y, width, height)
    } else {
      this._drawRoundedRectangle(x, y, width, height, radius)
    }
  }

  _drawNormalRectangle(x, y, width, height) {
    this.ctx.fillRect(x, y, width, height)
  }

  _drawRoundedRectangle(x, y, width, height, radius) {
    this.ctx.beginPath()
    this.ctx.moveTo(x, y + radius)
    this.ctx.lineTo(x, y + height - radius)
    this.ctx.arcTo(x, y + height, x + radius, y + height, radius)
    this.ctx.lineTo(x + width - radius, y + height)
    this.ctx.arcTo(
      x + width,
      y + height,
      x + width,
      y + height - radius,
      radius
    )
    this.ctx.lineTo(x + width, y + radius)
    this.ctx.arcTo(x + width, y, x + width - radius, y, radius)
    this.ctx.lineTo(x + radius, y)
    this.ctx.arcTo(x, y, x, y + radius, radius)
    this.ctx.stroke()
  }
}
