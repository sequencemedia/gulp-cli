'use strict'

const path = require('path')
const log = require('gulplog')
const yargs = require('yargs')
const Liftoff = require('@sequencemedia/liftoff')
const interpret = require('interpret')
const v8flags = require('v8flags')
const ansi = require('./lib/ansi')
const exit = require('./lib/exit')
const tildify = require('./lib/tildify')
const getProcessTitle = require('./lib/get-process-title')
const cliOptions = require('./lib/cli-options')
const getCompletion = require('./lib/get-completion')

const runVersion = require('./lib/run-version')
const runVerify = require('./lib/run-verify')

// Logging functions
const listenForLevelEvents = require('./lib/log/listen-for-level-events')

const loadConfigFiles = require('./lib/config/load-files')
const mergeConfigToCliFlags = require('./lib/config/cli-flags')
const mergeConfigToEnvFlags = require('./lib/config/env-flags')
const run = require('./lib')

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

let cliProps = (
  yargs
    .version(false)
    .usage(`${ansi.bold('Usage')}: $0 ${ansi.blue('[options]')} tasks`)
    .options(cliOptions)
).argv

cli.on('require', function (name) {
  // This is needed because interpret needs to stub the .mjs extension
  // Without the .mjs require hook, rechoir blows up
  // However, we don't want to show the mjs-stub loader in the logs
  if (path.basename(name, '.js') !== 'mjs-stub') {
    log.info('Loading external module', ansi.magenta(name))
  }
})

cli.on('requireFail', function (name, error) {
  log.warn(`${ansi.yellow('Failed to load external module')} ${ansi.magenta(name)}`)

  if (error) {
    log.warn(ansi.yellow(error.toString()))
  }
})

cli.on('respawn', function (nodeFlags, { pid }) {
  log.info(`Node flags detected: ${ansi.magenta(nodeFlags.join(', '))}`)
  log.info(`Respawned to PID: ${ansi.magenta(pid)}`)
})

function execute (envProps, cliProps, configProps) {
  console.log('@SequenceMedia/execute')

  // console.log(envProps)

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

  console.log(envProps.modulePath)
  console.log(envProps.configPath)

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

function prepare () {
  cli.prepare({
    cwd: cliProps.cwd,
    configPath: cliProps.gulpfile,
    require: cliProps.require,
    completion: cliProps.completion
  }, function (envProps) {
    console.log('@SequenceMedia/prepare')

    const configProps = loadConfigFiles(envProps.configFiles['.gulp'], ['home', 'cwd'])

    cliProps = mergeConfigToCliFlags(cliProps, configProps)
    envProps = mergeConfigToEnvFlags(envProps, configProps, cliProps)

    // Set up log level event listeners
    listenForLevelEvents(cliProps)

    cli.execute(envProps, envProps.nodeFlags, (envProps) => execute(envProps, cliProps, configProps))
  })
}

module.exports = prepare
