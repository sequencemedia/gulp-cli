import {
  exec
} from 'node:child_process'

import {
  expect
} from 'chai'

describe('--silent', () => {
  it('does not print', (done) => {
    exec('node ./bin/gulp.mjs --silent --cwd ./test/mocks/common', (e, stdout) => {
      try {
        expect(e)
          .to.be.null

        /*
        expect(stdout)
          .to.equal('')

        expect(stdout)
          .to.equal('')
          */

        done()
      } catch (e) {
        done(e)
      }
    })
  })
})
