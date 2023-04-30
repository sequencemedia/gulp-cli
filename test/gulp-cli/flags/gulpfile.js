'use strict'

const { exec } = require('node:child_process')

const chai = require('chai')
const {
  expect
} = chai

describe('--gulpfile', () => {
  describe('With a valid gulpfile file path', () => {
    /**
     *  The location of Gulp CLI and Gulp are derived from the location of the gulpfile (ignoring `cwd`)
     */
    describe('With a current working directory', () => {
      it('prints the gulpfile file path', (done) => {
        exec('node ./bin/gulp --gulpfile ./test/mocks/flags/gulpfile/gulpfile.mjs --cwd ./test/mocks/common', (e, stdout) => {
          try {
            expect(e)
              .to.be.null

            expect(stdout)
              .to.include('Using gulpfile')

            expect(stdout)
              .to.include('/test/mocks/flags/gulpfile/gulpfile.mjs')

            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })

    describe('Without a current working directory', () => {
      it('prints the gulpfile file path', (done) => {
        exec('node ./bin/gulp --gulpfile ./test/mocks/flags/gulpfile/gulpfile.mjs', (e, stdout) => {
          try {
            expect(e)
              .to.be.null

            expect(stdout)
              .to.include('Using gulpfile')

            expect(stdout)
              .to.include('/test/mocks/flags/gulpfile/gulpfile.mjs')

            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })
  })

  describe('With an invalid gulpfile file path', () => {
    /**
     *  The location of Gulp CLI and Gulp are derived from the current working directory
     */
    describe('With a current working directory', () => {
      it('throws', (done) => {
        exec('node ./bin/gulp --gulpfile ./test/gulpfile.mjs --cwd ./test/mocks/common', (e, stdout, stderr) => {
          try {
            expect(e)
              .to.be.instanceOf(Error)

            /**
             *  The current working directory has mock Gulp and no gulpfile
             */
            expect(stderr)
              .to.include('Gulpfile not found')

            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })

    describe('Without a current working directory', () => {
      it('throws', (done) => {
        exec('node ./bin/gulp --gulpfile ./test/gulpfile.mjs', (e, stdout, stderr) => {
          try {
            expect(e)
              .to.be.instanceOf(Error)

            /**
             *  The current working directory is this project which does not have Gulp
             */
            expect(stderr)
              .to.include('Gulp not found')

            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })
  })
})
