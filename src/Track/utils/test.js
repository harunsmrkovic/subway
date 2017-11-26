import { determineRailsPosition } from '.'

const railsInterspace = 3

describe('Track utils', () => {
  describe('determineRailsPosition', () => {
    describe('Diagonal', () => {
      describe('Bottom-Left towards Top-Right', () => {
        it('distances both lines correctly', () => {
          expect(
            determineRailsPosition(5, 10, 10, 5, railsInterspace)
          ).toMatchSnapshot()
        })
      })

      describe('Top-Left towards Bottom-Right', () => {
        it('distances both lines correctly', () => {
          expect(
            determineRailsPosition(90, 5, 95, 10, railsInterspace)
          ).toMatchSnapshot()
        })
      })

      describe('Top-Right towards Bottom-Left', () => {
        it('distances both lines correctly', () => {
          expect(
            determineRailsPosition(95, 50, 90, 55, railsInterspace)
          ).toMatchSnapshot()
        })
      })

      describe('Bottom-Right towards Top-Left', () => {
        it('distances both lines correctly', () => {
          expect(
            determineRailsPosition(10, 55, 5, 50, railsInterspace)
          ).toMatchSnapshot()
        })
      })
    })

    describe('Vertical', () => {
      describe('Top towards Bottom', () => {
        it('distances both lines correctly', () => {
          expect(
            determineRailsPosition(95, 10, 95, 50, railsInterspace)
          ).toMatchSnapshot()
        })
      })

      describe('Bottom towards Top', () => {
        it('distances both lines correctly', () => {
          expect(
            determineRailsPosition(5, 50, 5, 15, railsInterspace)
          ).toMatchSnapshot()
        })
      })
    })

    describe('Horizontal', () => {
      describe('Left towards Right', () => {
        it('distances both lines correctly', () => {
          expect(
            determineRailsPosition(10, 5, 90, 5, railsInterspace)
          ).toMatchSnapshot()
        })
      })

      describe('Right towards Left', () => {
        it('distances both lines correctly', () => {
          expect(
            determineRailsPosition(90, 55, 10, 55, railsInterspace)
          ).toMatchSnapshot()
        })
      })
    })
  })
})
