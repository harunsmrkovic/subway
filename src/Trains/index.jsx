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
    }, 30)
  }

  midpoint(fromX, fromY, toX, toY, per) {
    return { x: fromX + (toX - fromX) * per, y: fromY + (toY - fromY) * per }
  }

  _renderTrain(start, end) {
    const stationFrom = this.props.stations[start]
    const stationTo = this.props.stations[end]
    const point = this.midpoint(
      stationFrom.x,
      stationFrom.y,
      stationTo.x,
      stationTo.y,
      this.state.moved
    )

    const angle = Math.atan2(
      stationTo.y - stationFrom.y,
      stationTo.x - stationFrom.x
    )

    return (
      <Rectangle
        x={point.x}
        y={point.y}
        width={20}
        height={10}
        angle={angle}
        fillColor="#d0d0d0"
      />
    )
  }

  render() {
    return (
      <Layer {...this.props.wrapperSize}>
        {this._renderTrain(0, 1)}
        {this._renderTrain(1, 2)}
        {this._renderTrain(2, 3)}
        {this._renderTrain(3, 4)}
        {this._renderTrain(4, 5)}
        {this._renderTrain(5, 6)}
      </Layer>
    )
  }
}
