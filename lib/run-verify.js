const path = require('path')
const log = require('gulplog')

const ansi = require('./ansi')
const exit = require('./exit')
const tildify = require('./tildify')

const getBlacklist = require('./get-blacklist')
const getPackageBlacklist = require('./get-package-blacklist')

function getPackagePath (envProps, cliProps) {
  let packagePath = cliProps.verify !== true ? cliProps.verify : './package.json'

  if (path.resolve(packagePath) !== path.normalize(packagePath)) {
    packagePath = path.join(path.normalize(envProps.cwd), packagePath)
  }

  return packagePath
}

function getPackageJson (packagePath) {
  return require(packagePath)
}

module.exports = async function runVerify (envProps, cliProps) {
  const packagePath = getPackagePath(envProps, cliProps)

  log.info(`Verifying dependencies in ${ansi.magenta(tildify(packagePath))}`)
  try {
    const blacklistJson = await getBlacklist()
    const packageJson = getPackageJson(packagePath)
    const packageBlacklist = getPackageBlacklist(packageJson, blacklistJson)

    const dependencies = Object.entries(packageBlacklist)
    if (dependencies.length) {
      log.warn(ansi.red('Blacklisted dependencies in this project:'))
      dependencies
        .forEach(([name, reason]) => {
          log.warn(`${ansi.bgred(name)}: ${reason}`)
        })
      exit(1)
    }

    log.info(ansi.green('There are no blacklisted dependencies in this project'))
    exit(0)
  } catch ({ message }) {
    log.error(`${ansi.red('Failed to verify dependencies.')} Could not get blacklist - ${message}`)
    exit(1)
  }
}
