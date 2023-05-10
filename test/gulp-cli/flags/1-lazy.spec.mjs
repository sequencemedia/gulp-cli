import {
  exec
} from 'node:child_process'

import {
  expect
} from 'chai'

describe('--lazy', () => {
  it('detects the node flag', (done) => {
    exec('node ./bin/gulp.mjs --lazy --cwd ./test/mocks/common', (e, stdout) => {
      try {
        expect(e)
          .to.be.null

        expect(stdout)
          .to.include('Node flags')

        expect(stdout)
          .to.include('--lazy')

        done()
      } catch (e) {
        done(e)
      }
    })
  })
})
