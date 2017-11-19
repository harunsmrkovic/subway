import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas, { Rectangle, Line, Circle } from '../Canvas'
import { Layer } from '../Canvas/Layer'

export default class Trains extends Component {
  static propTypes = {
    stations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    wrapperSize: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired,
    gridRatio: PropTypes.number
  }

  state = {
    moved: 0.01
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.moved >= 1) return
      this.setState({ moved: this.state.moved + 0.01 })
    }, 50)
  }

  midpoint(fromX, fromY, toX, toY, per) {
    return { x: fromX + (toX - fromX) * per, y: fromY + (toY - fromY) * per }
  }

  render() {
    const midpoint = this.midpoint(
      this.props.stations[2].x,
      this.props.stations[2].y,
      this.props.stations[3].x,
      this.props.stations[3].y,
      this.state.moved
    )

    return (
      <Layer {...this.props.wrapperSize}>
        <Rectangle
          key="train"
          x={midpoint.x}
          y={midpoint.y}
          width={50}
          height={20}
          radius={10}
        />
      </Layer>
    )
  }
}
