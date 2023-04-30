'use strict'

const { exec } = require('node:child_process')

const chai = require('chai')
const {
  expect
} = chai

describe('--lazy', () => {
  it('detects the node flag', (done) => {
    exec('node ./bin/gulp --lazy --cwd ./test/mocks/common', (e, stdout) => {
      try {
        expect(e)
          .to.be.null

        expect(stdout)
          .to.include('Node flags detected')

        expect(stdout)
          .to.include('--lazy')

        done()
      } catch (e) {
        done(e)
      }
    })
  })
})
