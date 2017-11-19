import React from 'react'
import { shallow } from 'enzyme'

import { RectangleBase as Rectangle } from '.'

const defaultProps = {
  width: 10,
  height: 10,
  x: 1,
  y: 1
}

describe('Rectangle', () => {
  describe('radius', () => {
    describe('when it has no radius', () => {
      it('calls fillRect on ctx with proper values', () => {
        const ctx = {
          fillRect: jest.fn()
        }
        shallow(<Rectangle {...defaultProps} ctx={ctx} />)
        expect(ctx.fillRect).toHaveBeenCalledWith(1, 1, 10, 10)
      })
    })
  })
})
