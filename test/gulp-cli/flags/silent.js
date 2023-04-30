'use strict'

const { exec } = require('node:child_process')

const chai = require('chai')
const {
  expect
} = chai

describe('--silent', () => {
  it('does not print', (done) => {
    exec('node ./bin/gulp --silent --cwd ./test/mocks/common', (e, stdout) => {
      try {
        expect(e)
          .to.be.null

        expect(stdout)
          .to.include('')

        expect(stdout)
          .to.include('')

        done()
      } catch (e) {
        done(e)
      }
    })
  })
})
