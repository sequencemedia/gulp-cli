import {
  resolve
} from 'node:path'

import {
  expect
} from 'chai'

import loadConfigFiles from '#gulp-cli/src/config/load-files'

describe('./src/config/load-files', () => {
  describe('With valid arguments', () => {
    it('loads config files', async () => {
      const configFiles = {
        a: './test/fixtures/config/alpha/omega/.gulp.json',
        b: null,
        c: './test/fixtures/config/omega/.gulp.mjs'
      }

      const config = await loadConfigFiles(configFiles, ['a', 'b', 'c'])

      expect(config)
        .to.eql({
          description: 'omega/.gulp.mjs'
        })
    })

    it('loads config files in the specified order', async () => {
      const configFiles = {
        a: './test/fixtures/config/alpha/omega/.gulp.json',
        b: null,
        c: './test/fixtures/config/omega/.gulp.mjs'
      }

      const config = await loadConfigFiles(configFiles, ['b', 'c', 'a'])

      expect(config)
        .to.eql({
          description: 'alpha/omega/.gulp.json'
        })
    })

    it('resolves `flags.gulpfile` to an absolute path', async () => {
      const configFiles = {
        a: './test/fixtures/config/.gulp.json'
      }

      const config = await loadConfigFiles(configFiles, ['a'])

      expect(config)
        .to.eql({
          flags: {
            gulpfile: resolve('./test/fixtures/config/flags/gulpfile/gulpfile.mjs')
          }
        })
    })
  })

  describe('With invalid arguments', () => {
    it('returns an object', async () => {
      const config = await loadConfigFiles()

      expect(config)
        .to.eql({})
    })
  })
})
