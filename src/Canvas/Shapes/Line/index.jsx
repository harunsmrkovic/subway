import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Line extends Component {
  static propTypes = {
    fromX: PropTypes.number.isRequired,
    fromY: PropTypes.number.isRequired,
    toX: PropTypes.number.isRequired,
    toY: PropTypes.number.isRequired
  }

  static contextTypes = {
    ctx: PropTypes.object // Canvas 2D context
  }

  componentDidMount() {
    const { fromX, fromY, toX, toY } = this.props
    this.drawLine(fromX, fromY, toX, toY)
  }

  componentWillReceiveProps({ fromX, fromY, toX, toY }) {
    this.drawLine(fromX, fromY, toX, toY)
  }

  render() {
    return null
  }

  get ctx() {
    return this.context.ctx
  }

  drawLine(fromX, fromY, toX, toY) {
    this.ctx.beginPath()
    this.ctx.moveTo(fromX, fromY)
    this.ctx.lineTo(toX, toY)
    this.ctx.stroke()
  }
}
