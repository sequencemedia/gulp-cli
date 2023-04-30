
import {
  exec
} from 'node:child_process'

import {
  expect
} from 'chai'

describe('--version', () => {
  describe('With Gulp', () => {
    it('prints the Gulp CLI version and Gulp version', (done) => {
      exec('node ./bin/gulp.mjs --version --cwd ./test/mocks/flags/version', (e, stdout) => {
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
        exec('node ./bin/gulp.mjs -v --cwd ./test/mocks/flags/version', (e, stdout) => {
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
      exec('node ./bin/gulp.mjs --version', (e, stdout) => {
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
        exec('node ./bin/gulp.mjs -v', (e, stdout) => {
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
