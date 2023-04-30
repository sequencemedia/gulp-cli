'use strict'

const { exec } = require('node:child_process')
const { readFile } = require('node:fs/promises')

const chai = require('chai')
const {
  expect
} = chai

const TASKS_PATTERN = /Label of node [^,']*\n/

const TIMESTAMP_PATTERN = /\[.*\]/

describe('--tasks-list', () => {
  it('prints the tasks', (done) => {
    exec('node ./bin/gulp --tasks-list --cwd ./test/mocks/flags/tasks-list', async (e, stdout) => {
      try {
        expect(e)
          .to.be.null

        expect(stdout)
          .to.match(TASKS_PATTERN)

        const [match] = stdout.match(TASKS_PATTERN)

        const TASKS_FIXTURE = await readFile('./test/expected/flags/tasks-list.txt')

        expect(match.replace(new RegExp(TIMESTAMP_PATTERN, 'g'), ''))
          .to.equal(TASKS_FIXTURE.toString())

        done()
      } catch (e) {
        done(e)
      }
    })
  })

  describe('--compact-tasks', () => {
    it('prints the tasks', (done) => {
      exec('node ./bin/gulp --tasks-list --compact-tasks --cwd ./test/mocks/flags/tasks-list', async (e, stdout) => {
        try {
          expect(e)
            .to.be.null

          expect(stdout)
            .to.match(TASKS_PATTERN)

          const [match] = stdout.match(TASKS_PATTERN)

          const TASKS_FIXTURE = await readFile('./test/expected/flags/tasks-list/compact-tasks.txt')

          expect(match.replace(new RegExp(TIMESTAMP_PATTERN, 'g'), ''))
            .to.equal(TASKS_FIXTURE.toString())

          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })
})
