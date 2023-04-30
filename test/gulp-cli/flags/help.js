'use strict'

const { exec } = require('node:child_process')

const chai = require('chai')
const {
  expect
} = chai

describe('--help', () => {
  it('prints the help', (done) => {
    exec('node ./bin/gulp --help', (e, stdout) => {
      try {
        expect(e)
          .to.be.null

        expect(stdout)
          .to.include('Usage')

        expect(stdout)
          .to.include('Options')

        done()
      } catch (e) {
        done(e)
      }
    })
  })

  describe('-h', () => {
    it('prints the help', (done) => {
      exec('node ./bin/gulp -h', (e, stdout) => {
        try {
          expect(e)
            .to.be.null

          expect(stdout)
            .to.include('Usage')

          expect(stdout)
            .to.include('Options')

          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })
})
