import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Rectangle } from '../Rectangle'

// TODO: should it be wrapped in withShape? or just put into Rectangle folder... hm

export class Circle extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    ctx: PropTypes.object
  }

  render() {
    const { x, y, radius } = this.props
    return (
      <Rectangle
        {...this.props}
        x={x}
        y={y}
        width={radius}
        height={radius}
        radius={radius / 2}
      />
    )
  }
}
