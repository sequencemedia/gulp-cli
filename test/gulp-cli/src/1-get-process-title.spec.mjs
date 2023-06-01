import {
  expect
} from 'chai'

import getProcessTitle from '#gulp-cli/src/get-process-title'

describe('./src/get-process-title', () => {
  describe('With args', () => {
    it('returns the command with empty args', () => {
      const title = getProcessTitle([])

      expect(title)
        .to.equal('gulp')
    })

    it('returns the command with one arg', () => {
      const title = getProcessTitle(['build'])

      expect(title)
        .to.equal('gulp build')
    })

    it('returns the command with several args', () => {
      const title = getProcessTitle(['build', '--prod'])

      expect(title)
        .to.equal('gulp build --prod')
    })
  })

  describe('Without args', () => {
    it('returns the command without args', () => {
      const title = getProcessTitle()

      expect(title)
        .to.equal('gulp')
    })
  })
})
