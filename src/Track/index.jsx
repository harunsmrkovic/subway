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
    stationSize: 30,
    railsDistance: 15
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

    return [
      stations.map(({ x, y, name }, i) => {
        return (
          i < stations.length - 1 && (
            <Line
              key={name}
              {...this.determinePositionForRails(
                x,
                y,
                stations[i + 1].x,
                stations[i + 1].y
              )[0]}
            />
          )
        )
      }),
      stations.map(({ x, y, name }, i) => {
        return (
          i < stations.length - 1 && (
            <Line
              {...this.determinePositionForRails(
                x,
                y,
                stations[i + 1].x,
                stations[i + 1].y
              )[1]}
            />
          )
        )
      })
    ]
  }

  determinePositionForRails(fromX, fromY, toX, toY) {
    const { railsDistance } = this.props

    const halfDistance = railsDistance / 2
    const angleCorrection = railsDistance * 0.15

    if (fromY === toY) {
      return [
        {
          fromX,
          fromY: fromY - halfDistance,
          toX,
          toY: toY - halfDistance
        },
        {
          fromX,
          fromY: fromY + halfDistance,
          toX,
          toY: toY + halfDistance
        }
      ]
    }

    if (fromX === toX) {
      return [
        {
          fromX: fromX - halfDistance,
          fromY,
          toX: toX - halfDistance,
          toY
        },
        {
          fromX: fromX + halfDistance,
          fromY,
          toX: toX + halfDistance,
          toY
        }
      ]
    }

    if (fromY < toY && fromX < toX) {
      return [
        {
          fromX: fromX - halfDistance + angleCorrection,
          fromY: fromY + halfDistance - angleCorrection,
          toX: toX - halfDistance + angleCorrection,
          toY: toY + halfDistance - angleCorrection
        },
        {
          fromX: fromX + halfDistance - angleCorrection,
          fromY: fromY - halfDistance + angleCorrection,
          toX: toX + halfDistance - angleCorrection,
          toY: toY - halfDistance + angleCorrection
        }
      ]
    } else {
      return [
        {
          fromX: fromX - halfDistance + angleCorrection,
          fromY: fromY - halfDistance + angleCorrection,
          toX: toX - halfDistance + angleCorrection,
          toY: toY - halfDistance + angleCorrection
        },
        {
          fromX: fromX + halfDistance - angleCorrection,
          fromY: fromY + halfDistance - angleCorrection,
          toX: toX + halfDistance - angleCorrection,
          toY: toY + halfDistance - angleCorrection
        }
      ]
    }

    // }

    // return [{ fromX: fromX - , fromY, toX, toY }, { fromX, fromY, toX, toY }]

    // return [{ fromX, fromY, toX, toY }, { fromX, fromY, toX, toY }]
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
