import path from 'node:path'
import yargs from 'yargs'
import {
  hideBin
} from 'yargs/helpers'
import Liftoff from '@sequencemedia/liftoff'
import interpret from 'interpret'
import v8flags from 'v8flags'

import logger from './src/logger.mjs'
import ansi from './src/ansi.mjs'
import exit from './src/exit.mjs'
import tildify from './src/tildify.mjs'
import getProcessTitle from './src/get-process-title.mjs'
import cliOptions from './src/cli-options.mjs'
import getCompletion from './src/get-completion.mjs'

import listenForLevelEvents from './src/log/listen-for-level-events.mjs'

import loadConfigFiles from './src/config/load-files.mjs'
import mergeConfigToCliFlags from './src/config/cli-flags.mjs'
import mergeConfigToEnvFlags from './src/config/env-flags.mjs'

import runVersion from './src/run-version.mjs'
import runVerify from './src/run-verify.mjs'
import run from './src/index.mjs'

// Set env var for ORIGINAL cwd
// before anything touches it
const INIT_CWD = process.cwd()
process.env.INIT_CWD = INIT_CWD

const cli = new Liftoff({
  name: 'gulp',
  configName: 'gulpfile',
  moduleName: '@sequencemedia/gulp',
  processTitle: getProcessTitle(process.argv.slice(2)),
  completions: getCompletion,
  extensions: interpret.jsVariants,
  v8flags,
  configFiles: {
    '.gulp': {
      home: {
        path: '~',
        extensions: interpret.extensions
      },
      cwd: {
        path: '.',
        extensions: interpret.extensions
      }
    }
  }
})

let {
  argv: cliProps
} = (
  yargs(hideBin(process.argv))
    .version(false)
    .usage(`${ansi.bold('Usage')}: $0 ${ansi.blue('[options]')} tasks`)
    .options(cliOptions)
)

cli
  .on('require', (name) => {
    // This is needed because interpret needs to stub the .mjs extension
    // Without the .mjs require hook, rechoir blows up
    // However, we don't want to show the mjs-stub loader in the logs
    if (path.basename(name, '.js') !== 'mjs-stub') {
      logger.info('Loading external module', ansi.magenta(name))
    }
  })
  .on('requireFail', (name, error) => {
    logger.warn(`${ansi.yellow('Failed to load external module')} ${ansi.magenta(name)}`)

    if (error) logger.warn(ansi.yellow(error.toString()))
  })
  .on('respawn', (nodeFlags, { pid }) => {
    logger.info(`Node flags: ${ansi.magenta(nodeFlags.join(', '))}`)
    logger.info(`Respawned to PID: ${ansi.magenta(pid)}`)
  })

function execute (envProps, cliProps, configProps) {
  /**
   * Does not depend on Gulp
   */
  if (cliProps.version) return runVersion(envProps, cliProps)

  /**
   * Does not depend on Gulp
   */
  if (cliProps.verify) return runVerify(envProps, cliProps)

  /**
   * Depends on Gulp
   */
  const GULP_CWD = path.normalize(envProps.cwd)
  process.env.GULP_CWD = GULP_CWD

  if (!envProps.modulePath) {
    logger.error(`${ansi.red('Gulp not found')} in ${ansi.magenta(tildify(GULP_CWD))}`)
    exit(1)
  }

  if (!envProps.configPath) {
    logger.error(`${ansi.red('Gulpfile not found')} in ${ansi.magenta(tildify(GULP_CWD))}`)
    exit(1)
  }

  if (cliProps.continue) process.env.UNDERTAKER_SETTLE = 'true'

  if (INIT_CWD !== GULP_CWD) process.chdir(GULP_CWD)

  return (
    run(cliProps, envProps, configProps)
  )
}

export default function prepare () {
  cli.prepare({
    cwd: cliProps.cwd,
    configPath: cliProps.gulpfile,
    require: cliProps.require,
    completion: cliProps.completion
  }, async (envProps) => {
    const configProps = await loadConfigFiles(envProps.configFiles['.gulp'], ['home', 'cwd'])

    cliProps = mergeConfigToCliFlags(cliProps, configProps)
    envProps = mergeConfigToEnvFlags(envProps, configProps, cliProps)

    // Set up log level event listeners
    listenForLevelEvents(cliProps)

    cli.execute(envProps, envProps.nodeFlags, (envProps) => execute(envProps, cliProps, configProps))
  })
}
