import React, { Component } from 'react'
import PropTypes from 'prop-types'

import withShape from '../withShape'

export class LineBase extends Component {
  static propTypes = {
    fromX: PropTypes.number.isRequired,
    fromY: PropTypes.number.isRequired,
    toX: PropTypes.number.isRequired,
    toY: PropTypes.number.isRequired,
    width: PropTypes.number,
    color: PropTypes.string,
    ctx: PropTypes.object
  }

  static defaultProps = {
    width: 1,
    color: '#000'
  }

  componentDidMount() {
    const { fromX, fromY, toX, toY, width } = this.props
    this.drawLine(this.props)
  }

  componentWillUpdate(nextProps) {
    this.drawLine(nextProps)
  }

  render() {
    return null
  }

  get ctx() {
    return this.props.ctx
  }

  drawLine({ fromX, fromY, toX, toY, width, color }) {
    this.ctx.beginPath()
    this.ctx.moveTo(fromX, fromY)
    this.ctx.lineTo(toX, toY)
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = width
    this.ctx.stroke()
  }
}

export const Line = withShape(LineBase)
