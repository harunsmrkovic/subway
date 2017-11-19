import React, { Component } from 'react'
import Canvas, { Rectangle, Line } from '../Canvas'

import Track from '../Track'
import Trains from '../Trains'
import city from '../mocks/city'

import './style.css'

export default class City extends Component {
  static defaultProps = {
    mapSize: {
      width: 1000,
      height: 600
    },
    gridRatio: 10
  }

  render() {
    return (
      <Canvas {...this.props.mapSize}>
        <Track wrapperSize={this.props.mapSize} stations={this.stations} />
        <Trains wrapperSize={this.props.mapSize} stations={this.stations} />
      </Canvas>
    )
  }

  _scaledCoordinate(coordinate) {
    return coordinate * this.props.gridRatio
  }

  get stations() {
    const cityStationsDebug = city[0].stations
    return cityStationsDebug.map(station => ({
      ...station,
      x: this._scaledCoordinate(station.x),
      y: this._scaledCoordinate(station.y)
    }))
  }
}

// <Canvas>
//   <Layer width={1000} height={550}>
//     <Rectangle
//       x={this.state.x}
//       y={10}
//       width={100}
//       height={50}
//       radius={5}
//     />
//
//     <Rectangle
//       x={this.state.x + 50}
//       y={100}
//       width={100}
//       height={50}
//       radius={5}
//     />
//   </Layer>
//   <Layer width={1000} height={550}>
//     <Line fromX={100} fromY={20} toX={140} toY={20} />
//     <Line fromX={100} fromY={50} toX={140} toY={50} />
//     <Line fromX={120} fromY={10} toX={120} toY={60} />
//   </Layer>
// </Canvas>
