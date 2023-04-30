'use strict'

const replaceHomedir = require('replace-homedir')

module.exports = function tildify (filePath) {
  return replaceHomedir(filePath, '~')
}
