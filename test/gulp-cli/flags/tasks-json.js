'use strict'

const { exec } = require('node:child_process')
const { readFile } = require('node:fs/promises')

const chai = require('chai')
const {
  expect
} = chai

const TASKS_PATTERN = /\{"label":".*","nodes":\[.*\]\}+/

describe('--tasks-json', () => {
  it('prints the tasks', (done) => {
    exec('node ./bin/gulp --tasks-json --cwd ./test/mocks/flags/tasks-json', async (e, stdout) => {
      try {
        expect(e)
          .to.be.null

        expect(stdout)
          .to.include('Tasks for')

        expect(stdout)
          .to.include('/test/mocks/flags/tasks-json/gulpfile.mjs')

        expect(stdout)
          .to.match(TASKS_PATTERN)

        const [match] = stdout.match(TASKS_PATTERN)

        const TASKS_FIXTURE = await readFile('./test/expected/flags/tasks-json.json')

        expect(match)
          .to.equal(TASKS_FIXTURE.toString().trim())

        done()
      } catch (e) {
        done(e)
      }
    })
  })

  describe('--compact-tasks', () => {
    it('prints the tasks', (done) => {
      exec('node ./bin/gulp --tasks-json --compact-tasks --cwd ./test/mocks/flags/tasks-json', async (e, stdout) => {
        try {
          expect(e)
            .to.be.null

          expect(stdout)
            .to.match(TASKS_PATTERN)

          const [match] = stdout.match(TASKS_PATTERN)

          const TASKS_FIXTURE = await readFile('./test/expected/flags/tasks-json/compact-tasks.json')

          expect(match)
            .to.equal(TASKS_FIXTURE.toString().trim())

          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })
})
