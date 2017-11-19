import React, { Component } from 'react'
import PropTypes from 'prop-types'

export function Shape(WrappedComponent) {
  return class WithShape extends Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}
