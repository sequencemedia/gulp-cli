import {
  exec
} from 'node:child_process'

import {
  expect
} from 'chai'

describe('--completion', () => {
  it('returns completion script for "bash"', (done) => {
    const commands = 'node ./bin/gulp.mjs --completion bash'

    exec(commands, (e, stdout) => {
      try {
        expect(e)
          .to.be.null

        expect(stdout)
          .to.include('#!/bin/bash')

        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('returns completion script for "fish"', (done) => {
    const commands = 'node ./bin/gulp.mjs --completion fish'

    exec(commands, (e, stdout) => {
      try {
        expect(e)
          .to.be.null

        expect(stdout)
          .to.include('#!/usr/bin/env fish')

        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('returns completion script for "powershell"', (done) => {
    const commands = 'node ./bin/gulp.mjs --completion powershell'

    exec(commands, (e, stdout) => {
      try {
        expect(e)
          .to.be.null

        expect(stdout)
          .to.include('# Copyright (c) 2014 Jason Jarrett')

        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('returns completion script for "zsh"', (done) => {
    const commands = 'node ./bin/gulp.mjs --completion zsh'

    exec(commands, (e, stdout) => {
      try {
        expect(e)
          .to.be.null

        expect(stdout)
          .to.include('#!/bin/zsh')

        done()
      } catch (e) {
        done(e)
      }
    })
  })

  describe('Completion type is unknown', () => {
    it('throws', (done) => {
      const commands = 'node ./bin/gulp.mjs --completion unknown'

      exec(commands, (e, stdout, stderr) => {
        try {
          expect(e)
            .to.be.instanceOf(Error)

          expect(stderr)
            .to.include('Completion type "unknown" not found')

          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })

  describe('Completion type is missing', () => {
    it('throws', (done) => {
      const commands = 'node ./bin/gulp.mjs --completion'

      exec(commands, (e, stdout, stderr) => {
        try {
          expect(e)
            .to.be.instanceOf(Error)

          expect(stderr)
            .to.include('Completion type not provided')

          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })
})
