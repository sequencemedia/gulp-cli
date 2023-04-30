import path from 'node:path'

import {
  readFile
} from 'node:fs/promises'

import log from 'gulplog'

import ansi from './ansi.mjs'
import exit from './exit.mjs'
import tildify from './tildify.mjs'

import getBlacklist from './get-blacklist.mjs'
import getPackageBlacklist from './get-package-blacklist.mjs'

function getPackagePath (envProps, cliProps) {
  let packagePath = cliProps.verify !== true ? cliProps.verify : './package.json'

  if (path.resolve(packagePath) !== path.normalize(packagePath)) {
    packagePath = path.join(path.normalize(envProps.cwd), packagePath)
  }

  return packagePath
}

async function getPackageJson (packagePath) {
  const fileData = await readFile(packagePath)
  return JSON.parse(fileData.toString())
}

export default async function runVerify (envProps, cliProps) {
  const packagePath = getPackagePath(envProps, cliProps)

  log.info(`Verifying dependencies in ${ansi.magenta(tildify(packagePath))}`)
  try {
    const blacklistJson = await getBlacklist()
    const packageJson = await getPackageJson(packagePath)
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
