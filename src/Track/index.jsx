import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas, { Rectangle, Line, Circle } from '../Canvas'
import { Layer } from '../Canvas/Layer'

import './style.css'

class Track extends Component {
  static propTypes = {
    stations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    wrapperSize: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired
  }

  static defaultProps = {
    stationSize: 30
  }

  render() {
    return (
      <Layer {...this.props.wrapperSize}>
        {this.renderStations()}
        {this.renderLines()}
      </Layer>
    )
  }

  renderStations() {
    const { stationSize } = this.props

    return this.stationsOnTrack.map(({ x, y, name }) => (
      <Circle key={name} x={x} y={y} radius={stationSize} />
    ))
  }

  renderLines() {
    const { stations } = this.props

    return stations.map(({ x, y, name }, i) => {
      return (
        i < stations.length - 1 && (
          <Line
            key={name}
            fromX={x}
            fromY={y}
            toX={stations[i + 1].x}
            toY={stations[i + 1].y}
          />
        )
      )
    })
  }

  get stationsOnTrack() {
    const { stationSize } = this.props

    return this.props.stations.map(station => ({
      ...station,
      x: station.x - stationSize / 2,
      y: station.y - stationSize / 2
    }))
  }
}

export default Track
