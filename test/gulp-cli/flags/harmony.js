'use strict'

const { exec } = require('node:child_process')

const chai = require('chai')
const {
  expect
} = chai

describe('--harmony', () => {
  it('detects the node flag', (done) => {
    exec('node ./bin/gulp --harmony --cwd ./test/mocks/common', (e, stdout) => {
      try {
        expect(e)
          .to.be.null

        expect(stdout)
          .to.include('Node flags detected')

        expect(stdout)
          .to.include('--harmony')

        done()
      } catch (e) {
        done(e)
      }
    })
  })
})
