import {
  exec
} from 'node:child_process'

import {
  expect
} from 'chai'

describe('--import', () => {
  it('detects the node flag', (done) => {
    exec('node ./bin/gulp.mjs --import ./test/mocks/flags/import/index.mjs --cwd ./test/mocks/common', (e) => {
      try {
        expect(e)
          .to.be.null

        done()
      } catch (e) {
        done(e)
      }
    })
  })
})
