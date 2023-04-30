
import {
  exec
} from 'node:child_process'
import { readFile } from 'node:fs/promises'

import {
  expect
} from 'chai'

const TASKS_PATTERN = /\[.*\] .* Label of node .*\s+(?:\[.*\] .*\s+)*\[.*\] .* Label of node .*\s+/

const TIMESTAMP_PATTERN = /\[.*\]/

describe('--tasks', () => {
  it('prints the tasks', (done) => {
    exec('node ./bin/gulp.mjs --tasks --cwd ./test/mocks/flags/tasks', async (e, stdout) => {
      try {
        expect(e)
          .to.be.null

        expect(stdout)
          .to.include('Tasks for')

        expect(stdout)
          .to.include('/test/mocks/flags/tasks/gulpfile.mjs')

        expect(stdout)
          .to.match(TASKS_PATTERN)

        const [match] = stdout.match(TASKS_PATTERN)

        const TASKS_FIXTURE = await readFile('./test/expected/flags/tasks.txt')

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
      exec('node ./bin/gulp.mjs --tasks --compact-tasks --cwd ./test/mocks/flags/tasks', async (e, stdout) => {
        try {
          expect(e)
            .to.be.null

          expect(stdout)
            .to.include('Tasks for')

          expect(stdout)
            .to.include('/test/mocks/flags/tasks/gulpfile.mjs')

          expect(stdout)
            .to.match(TASKS_PATTERN)

          const [match] = stdout.match(TASKS_PATTERN)

          const TASKS_FIXTURE = await readFile('./test/expected/flags/tasks/compact-tasks.txt')

          expect(match.replace(new RegExp(TIMESTAMP_PATTERN, 'g'), ''))
            .to.equal(TASKS_FIXTURE.toString())

          done()
        } catch (e) {
          done(e)
        }
      })
    })

    describe('--sort-tasks', () => {
      it('prints the tasks', (done) => {
        exec('node ./bin/gulp.mjs --tasks --compact-tasks --sort-tasks --cwd ./test/mocks/flags/tasks', async (e, stdout) => {
          try {
            expect(e)
              .to.be.null

            expect(stdout)
              .to.include('Tasks for')

            expect(stdout)
              .to.include('/test/mocks/flags/tasks/gulpfile.mjs')

            expect(stdout)
              .to.match(TASKS_PATTERN)

            const [match] = stdout.match(TASKS_PATTERN)

            const TASKS_FIXTURE = await readFile('./test/expected/flags/tasks/compact-tasks/sort-tasks.txt')

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

  describe('--sort-tasks', () => {
    it('prints the tasks', (done) => {
      exec('node ./bin/gulp.mjs --tasks --sort-tasks --cwd ./test/mocks/flags/tasks', async (e, stdout) => {
        try {
          expect(e)
            .to.be.null

          expect(stdout)
            .to.include('Tasks for')

          expect(stdout)
            .to.include('/test/mocks/flags/tasks/gulpfile.mjs')

          expect(stdout)
            .to.match(TASKS_PATTERN)

          const [match] = stdout.match(TASKS_PATTERN)

          const TASKS_FIXTURE = await readFile('./test/expected/flags/tasks/sort-tasks.txt')

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
