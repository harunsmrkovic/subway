import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.css'

export * from './Shapes'
export { Layer } from './Layer'

export default class Canvas extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }

  render() {
    const { width, height } = this.props
    return (
      <div className="Canvas-Wrapper">
        {React.Children.map(this.props.children, layer =>
          React.cloneElement(layer, { width, height })
        )}
      </div>
    )
  }
}

// export class Canvas extends Component {
//   componentDidMount() {
//     const canvas = this.node
//     this.ctx = canvas.getContext('2d')
//
//     this._drawRectangles(this.props.rects)
//   }
//
//   componentWillReceiveProps({ rects }) {
//     this._drawRectangles(rects)
//
//     this._drawLine(100, 20, 140, 20)
//     this._drawLine(100, 50, 140, 50)
//
//     this._drawLine(120, 10, 120, 60)
//   }
//
//   _drawLine(fromX, fromY, toX, toY) {
//     this.ctx.beginPath()
//     this.ctx.moveTo(fromX, fromY)
//     this.ctx.lineTo(toX, toY)
//     this.ctx.stroke()
//   }
//
//   _drawRectangles = rects => {
//     this._clearCanvas()
//     rects.forEach(({ x, y, width, height }) => {
//       // this.ctx.fillStyle = `rgba(${color})`
//       // this.ctx.fillRect(x, y, width, height)
//       this._drawRoundedRectangle(x, y, width, height, 5)
//     })
//   }
//
//   _drawRoundedRectangle(x, y, width, height, radius) {
//     this.ctx.beginPath()
//     this.ctx.moveTo(x, y + radius)
//     this.ctx.lineTo(x, y + height - radius)
//     this.ctx.arcTo(x, y + height, x + radius, y + height, radius)
//     this.ctx.lineTo(x + width - radius, y + height)
//     this.ctx.arcTo(
//       x + width,
//       y + height,
//       x + width,
//       y + height - radius,
//       radius
//     )
//     this.ctx.lineTo(x + width, y + radius)
//     this.ctx.arcTo(x + width, y, x + width - radius, y, radius)
//     this.ctx.lineTo(x + radius, y)
//     this.ctx.arcTo(x, y, x, y + radius, radius)
//     this.ctx.stroke()
//   }
//
//   _clearCanvas() {
//     const { width, height } = this.props
//     this.ctx.clearRect(0, 0, width, height)
//   }
//
//   render() {
//     const { width, height } = this.props
//     return (
//       <canvas ref={node => (this.node = node)} width={width} height={height} />
//     )
//   }
// }
//
// export class Layer extends Component {
//   static propTypes = {}
//
//   state = {
//     rects: []
//   }
//
//   _addRect(x, y, width, height, color) {
//     const newRect = { x, y, width, height, color }
//     const rects = [...this.state.rects, newRect]
//     this.setState({
//       rects
//     })
//     return newRect
//   }
//
//   _moveRectTo(rect, x, y) {
//     const existingRectPos = this.state.rects.indexOf(rect)
//
//     if (existingRectPos === -1) {
//       throw new Error('Moving non-existing rectangle')
//     }
//
//     const existingRect = this.state.rects[existingRectPos]
//     const movedRect = {
//       ...existingRect,
//       x,
//       y
//     }
//
//     const rects = this.state.rects.slice()
//     rects.splice(existingRectPos, 1, movedRect)
//
//     this.setState({
//       rects
//     })
//
//     return movedRect
//   }
//
//   x = 10
//   y = 10
//
//   _continuoslyMoveRect(rect, offsetX, offsetY) {
//     setTimeout(() => {
//       this._continuoslyMoveRect(
//         this._moveRectTo(rect, (this.x += offsetX), (this.y += offsetY)),
//         offsetX,
//         offsetY
//       )
//     }, 10)
//   }
//
//   componentDidMount() {
//     const addedRect = this._addRect(10, 10, 100, 50, '0, 200, 0, 0.5')
//
//     // this._continuoslyMoveRect(addedRect, 1, 1)
//   }
//
//   render() {
//     const { width, height } = this.props
//     const surfaceProps = { width, height }
//
//     const { rects } = this.state
//
//     return <Canvas {...surfaceProps} rects={rects} />
//   }
// }
//
// export class Surface extends Component {
//   render() {
//     const { width, height } = this.props
//     const surfaceProps = { width, height }
//     return (
//       <div className="Surface">
//         <Layer {...surfaceProps} />
//       </div>
//     )
//   }
// }
//
// export default Surface
