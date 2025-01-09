import {
  exec
} from 'node:child_process'

import {
  readFile
} from 'node:fs/promises'

import {
  expect
} from 'chai'

const TASKS_PATTERN = /\{\s*"label":\s*\".*\",\s*"nodes":\s*\[.*\]\}+/

function toJson (s) {
  return JSON.stringify(JSON.parse(s), null, 2)
}

describe('--tasks-json', () => {
  it('prints the tasks', (done) => {
    exec('node ./bin/gulp.mjs --tasks-json --cwd ./test/mocks/flags/tasks-json', async (e, stdout) => {
      try {
        expect(e)
          .to.be.null

        expect(stdout)
          .to.include('Tasks for')

        expect(stdout)
          .to.include('/test/mocks/flags/tasks-json/gulpfile.mjs')

        expect(stdout)
          .to.match(TASKS_PATTERN)

        const [
          match
        ] = stdout.match(TASKS_PATTERN)

        const TASKS_FIXTURE = await readFile('./test/expected/flags/tasks-json.json')

        expect(toJson(match))
          .to.equal(toJson(TASKS_FIXTURE.toString().trim()))

        done()
      } catch (e) {
        done(e)
      }
    })
  })

  describe('--compact-tasks', () => {
    it('prints the tasks', (done) => {
      exec('node ./bin/gulp.mjs --tasks-json --compact-tasks --cwd ./test/mocks/flags/tasks-json', async (e, stdout) => {
        try {
          expect(e)
            .to.be.null

          expect(stdout)
            .to.match(TASKS_PATTERN)

          const [
            match
          ] = stdout.match(TASKS_PATTERN)

          const TASKS_FIXTURE = await readFile('./test/expected/flags/tasks-json/compact-tasks.json')

          expect(toJson(match))
            .to.equal(toJson(TASKS_FIXTURE.toString().trim()))

          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })
})
