import React, { Component } from 'react'
import Canvas, { Layer, Rectangle, Line } from '../Canvas'

import Track from '../Track'
import city from '../mocks/city'

import './style.css'

export default class City extends Component {
  static defaultProps = {
    mapSize: {
      width: 1000,
      height: 600
    }
  }

  render() {
    return (
      <Canvas {...this.props.mapSize}>
        <Layer>
          <Track wrapperSize={this.props.mapSize} stations={city[0].stations} />
        </Layer>
      </Canvas>
    )
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
