import {
  exec
} from 'node:child_process'

import {
  expect
} from 'chai'

describe('--verify', () => {
  it('verifies dependencies with a valid dependency', (done) => {
    exec('node ./bin/gulp.mjs --verify ./test/mocks/flags/verify/valid-package.json', (e, stdout) => {
      try {
        expect(e)
          .to.be.null

        expect(stdout)
          .to.include('Verifying dependencies')

        expect(stdout)
          .to.include('/test/mocks/flags/verify/valid-package.json')

        expect(stdout)
          .to.include('There are no blacklisted dependencies in this project')

        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('verifies dependencies with an invalid dependency', (done) => {
    exec('node ./bin/gulp.mjs --verify ./test/mocks/flags/verify/invalid-package.json', (e, stdout) => {
      try {
        expect(e)
          .to.be.instanceOf(Error)

        expect(stdout)
          .to.include('Verifying dependencies')

        expect(stdout)
          .to.include('/test/mocks/flags/verify/invalid-package.json')

        expect(stdout)
          .to.include('Blacklisted dependencies in this project')

        expect(stdout)
          .to.include('gulp-blink: deprecated. use `blink` instead')

        done()
      } catch (e) {
        done(e)
      }
    })
  })
})
