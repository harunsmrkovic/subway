import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default function Shape(WrappedComponent) {
  return class WithShape extends Component {
    componentWillMount() {
      const { ctx } = this.props
      if (!ctx || !(ctx instanceof CanvasRenderingContext2D))
        throw new Error('Canvas 2D context provided is not valid')
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}
