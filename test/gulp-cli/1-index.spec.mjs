import {
  exec
} from 'node:child_process'

import {
  expect
} from 'chai'

describe('gulp-cli', () => {
  describe('Gulp is found', () => {
    describe('Gulpfile is found', () => {
      it('does not print an error', (done) => {
        exec('node ./bin/gulp.mjs --cwd ./test/mocks/with-gulp/with-gulpfile', (e, stdout, stderr) => {
          expect(e)
            .to.be.null

          expect(stderr)
            .not.to.include('Gulp not found')

          expect(stderr)
            .not.to.include('Gulpfile not found')

          done()
        })
      })
    })

    describe('Gulpfile is not found', () => {
      it('prints an error', (done) => {
        exec('node ./bin/gulp.mjs --cwd ./test/mocks/with-gulp/without-gulpfile', (e, stdout, stderr) => {
          expect(e)
            .to.be.instanceOf(Error)

          expect(stderr)
            .not.to.include('Gulp not found')

          expect(stderr)
            .to.include('Gulpfile not found')

          done()
        })
      })
    })
  })

  describe('Gulp is not found', () => {
    it('prints an error', (done) => {
      exec('node ./bin/gulp.mjs --cwd .test/mocks/without-gulp', (e, stdout, stderr) => {
        expect(e)
          .to.be.instanceOf(Error)

        expect(stderr)
          .to.include('Gulp not found')

        expect(stderr)
          .not.to.include('Gulpfile not found')

        done()
      })
    })
  })
})
