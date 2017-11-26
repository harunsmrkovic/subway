import React from 'react'
import { shallow } from 'enzyme'
import { fingerprint } from '../../../tests/utils'
import { RectangleBase as Rectangle } from '.'

const defaultProps = {
  width: 10,
  height: 10,
  x: 1,
  y: 1
}

describe('Rectangle', () => {
  describe('radius', () => {
    describe('when it has no corner radius', () => {
      it('uses provided ctx to draw Rectangle with no corner radius', () => {
        const ctx = fingerprint([
          'beginPath',
          'moveTo',
          'lineTo',
          'stroke',
          'closePath'
        ])

        shallow(<Rectangle {...defaultProps} ctx={ctx.mocks} />)
        expect(ctx.log).toMatchSnapshot()
      })
    })
  })
})
