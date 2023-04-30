const exit = require('./exit')

function getGulpCliVersion () {
  return require('../package.json').version
}

function getGulpVersion ({ modulePackage: { version = 'unknown' } = {} }) {
  return version
}

module.exports = function runVersion (envProps) {
  console.log(`Gulp CLI version: ${getGulpCliVersion()}`)
  console.log(`Gulp version: ${getGulpVersion(envProps)}`)
  exit(0)
}
