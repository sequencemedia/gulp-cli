'use strict'

const chai = require('chai')
const {
  expect
} = chai

const path = require('path')
const loadConfigFiles = require('../../../../lib/config/load-files')

const FIXTURES_PATH = path.join(__dirname, '../../../fixtures/config')

describe('./lib/config/load-files', () => {
  describe('With valid arguments', () => {
    it('loads config files', (done) => {
      const configFiles = {
        a: path.join(FIXTURES_PATH, 'alpha/omega/.gulp.json'),
        b: null,
        c: path.join(FIXTURES_PATH, 'omega/.gulp.js')
      }

      const config = loadConfigFiles(configFiles, ['a', 'b', 'c'])

      expect(config)
        .to.eql({
          description: 'omega/.gulp.js'
        })

      done()
    })

    it('loads config files in the specified order', (done) => {
      const configFiles = {
        a: path.join(FIXTURES_PATH, 'alpha/omega/.gulp.json'),
        b: null,
        c: path.join(FIXTURES_PATH, 'omega/.gulp.js')
      }

      const config = loadConfigFiles(configFiles, ['b', 'c', 'a'])

      expect(config)
        .to.eql({
          description: 'alpha/omega/.gulp.json'
        })

      done()
    })

    it('resolves `flags.gulpfile` to an absolute path', (done) => {
      const configFiles = {
        a: path.join(FIXTURES_PATH, '.gulp.json')
      }

      const config = loadConfigFiles(configFiles, ['a'])

      expect(config)
        .to.eql({
          flags: {
            gulpfile: path.join(FIXTURES_PATH, 'flags/gulpfile/gulpfile.js')
          }
        })

      done()
    })
  })

  describe('With invalid arguments', () => {
    it('returns an object', () => {
      expect(loadConfigFiles())
        .to.eql({})
    })
  })
})
