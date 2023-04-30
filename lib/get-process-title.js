'use strict'

module.exports = function getProcessTitle (argv = []) {
  return ['gulp'].concat(argv).join(' ').trim()
}
