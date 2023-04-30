
import {
  exec
} from 'node:child_process'

import {
  expect
} from 'chai'

describe('--help', () => {
  it('prints the help', (done) => {
    exec('node ./bin/gulp.mjs --help', (e, stdout) => {
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
      exec('node ./bin/gulp.mjs -h', (e, stdout) => {
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
