import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas, { Layer, Rectangle, Line } from '../Canvas'

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
    }).isRequired,
    gridRatio: PropTypes.number
  }

  static defaultProps = {
    gridRatio: 10,
    stationWidth: 30,
    stationHeight: 30
  }

  render() {
    return [this.renderStations(), this.renderLines()]
  }

  renderStations() {
    const { stationWidth, stationHeight } = this.props

    return this.stationsOnMap.map(({ x, y, name }) => (
      <Rectangle
        key={name}
        x={x}
        y={y}
        width={stationWidth}
        height={stationHeight}
        radius={15}
      />
    ))
  }

  renderLines() {
    const stations = this.stations

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

  _scaledCoordinate(coordinate) {
    return coordinate * this.props.gridRatio
  }

  get stationsOnMap() {
    const { stationWidth, stationHeight } = this.props

    return this.stations.map(station => ({
      ...station,
      x: station.x - stationWidth / 2,
      y: station.y - stationHeight / 2
    }))
  }

  get stations() {
    return this.props.stations.map(station => ({
      ...station,
      x: this._scaledCoordinate(station.x),
      y: this._scaledCoordinate(station.y)
    }))
  }
}

export default Track
