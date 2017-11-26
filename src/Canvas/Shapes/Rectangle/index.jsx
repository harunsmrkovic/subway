import React, { Component } from 'react'
import PropTypes from 'prop-types'

import withShape from '../withShape'

export class RectangleBase extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    radius: PropTypes.number,
    angle: PropTypes.number, // radians
    strokeWidth: PropTypes.number,
    strokeColor: PropTypes.string,
    fillColor: PropTypes.string,
    ctx: PropTypes.object
  }

  static defaultProps = {
    strokeWidth: 1,
    strokeColor: '#000',
    fillColor: '',
    radius: 0,
    angle: 0
  }

  componentDidMount() {
    this.drawRectangle(this.props)
  }

  componentWillUpdate(nextProps) {
    this.drawRectangle(nextProps)
  }

  get ctx() {
    return this.props.ctx
  }

  drawRectangle(props) {
    if (!props.radius) {
      this._drawNormalRectangle(props)
    } else {
      this._drawRoundedRectangle(props)
    }
  }

  _drawNormalRectangle({
    x,
    y,
    width,
    height,
    strokeColor,
    fillColor,
    strokeWidth,
    angle
  }) {
    // TODO: make it consistent with rounded... colors etc; probably extract part?
    // this.ctx.fillRect(x, y, width, height)
    const { topLeft, topRight, bottomRight, bottomLeft } = this.points(
      x,
      y,
      width,
      height,
      angle
    )
    this.ctx.beginPath()

    this.ctx.moveTo(topLeft.x, topLeft.y)
    this.ctx.lineTo(topRight.x, topRight.y)
    this.ctx.lineTo(bottomRight.x, bottomRight.y)
    this.ctx.lineTo(bottomLeft.x, bottomLeft.y)
    this.ctx.lineTo(topLeft.x, topLeft.y)
    this.ctx.stroke()
    this.ctx.closePath()
  }

  _drawRoundedRectangle({
    x,
    y,
    width,
    height,
    radius,
    strokeWidth,
    strokeColor,
    fillColor
  }) {
    this.ctx.beginPath()

    // Drawing the rounded corners and lines
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

    this.ctx.closePath()

    // Set up fill
    if (fillColor) {
      this.ctx.fillStyle = fillColor
      this.ctx.fill()
    }

    // Set up stroke
    this.ctx.strokeStyle = strokeColor
    this.ctx.lineWidth = strokeWidth
    this.ctx.stroke()
  }

  rotatePoint({ x, y }, { rotateBy, around } = {}) {
    if (rotateBy) {
      return {
        x:
          Math.cos(rotateBy) * (x - around.x) -
          Math.sin(rotateBy) * (y - around.y) +
          around.x,
        y:
          Math.cos(rotateBy) * (y - around.y) +
          Math.sin(rotateBy) * (x - around.x) +
          around.y
      }
    }

    return { x, y }
  }

  points(x, y, width, height, angle) {
    return {
      topLeft: this.rotatePoint(
        {
          x,
          y
        },
        { around: { x, y }, rotateBy: angle }
      ),
      topRight: this.rotatePoint(
        {
          x: x + width,
          y
        },
        { around: { x, y }, rotateBy: angle }
      ),
      bottomRight: this.rotatePoint(
        {
          x: x + width,
          y: y + height
        },
        { around: { x, y }, rotateBy: angle }
      ),
      bottomLeft: this.rotatePoint(
        {
          x,
          y: y + height
        },
        { around: { x, y }, rotateBy: angle }
      )
    }
  }

  render() {
    return null
  }
}

export const Rectangle = withShape(RectangleBase)
