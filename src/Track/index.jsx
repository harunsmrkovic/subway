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
    }).isRequired,
    gridRatio: PropTypes.number
  }

  static defaultProps = {
    gridRatio: 10,
    stationSize: 30
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

  render() {
    return (
      <Layer {...this.props.wrapperSize}>
        {this.renderStations()}
        {this.renderLines()}
        {this.debugRenderTrain()}
      </Layer>
    )
  }

  midpoint(fromX, fromY, toX, toY, per) {
    return { x: fromX + (toX - fromX) * per, y: fromY + (toY - fromY) * per }
  }

  debugRenderTrain() {
    const midpoint = this.midpoint(
      this.stationsOnMap[2].x,
      this.stationsOnMap[2].y,
      this.stationsOnMap[3].x,
      this.stationsOnMap[3].y,
      this.state.moved
    )

    return (
      <Rectangle
        key="train"
        x={midpoint.x}
        y={midpoint.y}
        width={50}
        height={20}
        radius={10}
      />
    )
  }

  renderStations() {
    const { stationSize } = this.props

    return this.stationsOnMap.map(({ x, y, name }) => (
      <Circle key={name} x={x} y={y} radius={stationSize} />
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
    const { stationSize } = this.props

    return this.stations.map(station => ({
      ...station,
      x: station.x - stationSize / 2,
      y: station.y - stationSize / 2
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
