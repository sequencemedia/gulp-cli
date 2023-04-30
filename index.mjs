
import path from 'node:path'
import log from 'gulplog'
import yargs from 'yargs'
import {
  hideBin
} from 'yargs/helpers'
import Liftoff from '@sequencemedia/liftoff'
import interpret from 'interpret'
import v8flags from 'v8flags'

import ansi from './lib/ansi.mjs'
import exit from './lib/exit.mjs'
import tildify from './lib/tildify.mjs'
import getProcessTitle from './lib/get-process-title.mjs'
import cliOptions from './lib/cli-options.mjs'
import getCompletion from './lib/get-completion.mjs'

import listenForLevelEvents from './lib/log/listen-for-level-events.mjs'

import loadConfigFiles from './lib/config/load-files.mjs'
import mergeConfigToCliFlags from './lib/config/cli-flags.mjs'
import mergeConfigToEnvFlags from './lib/config/env-flags.mjs'

import runVersion from './lib/run-version.mjs'
import runVerify from './lib/run-verify.mjs'
import run from './lib/index.mjs'

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

cli.on('require', (name) => {
  // This is needed because interpret needs to stub the .mjs extension
  // Without the .mjs require hook, rechoir blows up
  // However, we don't want to show the mjs-stub loader in the logs
  if (path.basename(name, '.js') !== 'mjs-stub') {
    log.info('Loading external module', ansi.magenta(name))
  }
})

cli.on('requireFail', (name, error) => {
  log.warn(`${ansi.yellow('Failed to load external module')} ${ansi.magenta(name)}`)

  if (error) {
    log.warn(ansi.yellow(error.toString()))
  }
})

cli.on('respawn', (nodeFlags, { pid }) => {
  log.info(`Node flags detected: ${ansi.magenta(nodeFlags.join(', '))}`)
  log.info(`Respawned to PID: ${ansi.magenta(pid)}`)
})

function execute (envProps, cliProps, configProps) {
  console.log('@SequenceMedia/execute')

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
    log.error(`${ansi.red('Gulp not found')} in ${ansi.magenta(tildify(GULP_CWD))}`)
    exit(1)
  }

  if (!envProps.configPath) {
    log.error(`${ansi.red('Gulpfile not found')} in ${ansi.magenta(tildify(GULP_CWD))}`)
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
  }, (envProps) => {
    console.log('@SequenceMedia/prepare')

    const configProps = loadConfigFiles(envProps.configFiles['.gulp'], ['home', 'cwd'])

    cliProps = mergeConfigToCliFlags(cliProps, configProps)
    envProps = mergeConfigToEnvFlags(envProps, configProps, cliProps)

    // Set up log level event listeners
    listenForLevelEvents(cliProps)

    cli.execute(envProps, envProps.nodeFlags, (envProps) => execute(envProps, cliProps, configProps))
  })
}
