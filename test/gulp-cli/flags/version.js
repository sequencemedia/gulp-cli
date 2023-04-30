'use strict'

const { exec } = require('node:child_process')

const chai = require('chai')
const {
  expect
} = chai

describe('--version', () => {
  describe('With Gulp', () => {
    it('prints the Gulp CLI version and Gulp version', (done) => {
      exec('node ./bin/gulp --version --cwd ./test/mocks/flags/version', (e, stdout) => {
        try {
          expect(e)
            .to.be.null

          expect(stdout)
            .to.include('Gulp CLI version')

          expect(stdout)
            .to.include('Gulp version')

          expect(stdout)
            .to.include('GULP VERSION')

          done()
        } catch (e) {
          done(e)
        }
      })
    })

    describe('-v', () => {
      it('prints the Gulp CLI version and Gulp version', (done) => {
        exec('node ./bin/gulp -v --cwd ./test/mocks/flags/version', (e, stdout) => {
          try {
            expect(e)
              .to.be.null

            expect(stdout)
              .to.include('Gulp CLI version')

            expect(stdout)
              .to.include('Gulp version')

            expect(stdout)
              .to.include('GULP VERSION')

            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })
  })

  describe('Without Gulp', () => {
    it('prints the Gulp CLI version and Gulp version', (done) => {
      exec('node ./bin/gulp --version', (e, stdout) => {
        try {
          expect(e)
            .to.be.null

          expect(stdout)
            .to.include('Gulp CLI version')

          expect(stdout)
            .to.include('Gulp version')

          expect(stdout)
            .to.include('unknown')

          done()
        } catch (e) {
          done(e)
        }
      })
    })

    describe('-v', () => {
      it('prints the Gulp CLI version and Gulp version', (done) => {
        exec('node ./bin/gulp -v', (e, stdout) => {
          try {
            expect(e)
              .to.be.null

            expect(stdout)
              .to.include('Gulp CLI version')

            expect(stdout)
              .to.include('Gulp version')

            expect(stdout)
              .to.include('unknown')

            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })
  })
})
