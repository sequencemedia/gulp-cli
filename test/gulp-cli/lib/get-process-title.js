'use strict'

const chai = require('chai')
const {
  expect
} = chai

const getProcessTitle = require('../../../lib/get-process-title')

describe('./lib/get-process-title', () => {
  describe('With args', () => {
    it('returns the command with empty args', (done) => {
      const title = getProcessTitle([])

      expect(title)
        .to.equal('gulp')

      done()
    })

    it('returns the command with one arg', (done) => {
      const title = getProcessTitle(['build'])

      expect(title)
        .to.equal('gulp build')

      done()
    })

    it('returns the command with several args', (done) => {
      const title = getProcessTitle(['build', '--prod'])

      expect(title)
        .to.equal('gulp build --prod')

      done()
    })
  })

  describe('Without args', () => {
    it('returns the command without args', (done) => {
      const title = getProcessTitle()

      expect(title)
        .to.equal('gulp')

      done()
    })
  })
})
