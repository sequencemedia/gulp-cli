'use strict'

const stdout = require('mute-stdout')

const listenForGulpEvents = require('./log/listen-for-gulp-events')
const listenForSyncEvents = require('./log/listen-for-sync-events')
const registerGulpTasks = require('./register-gulp-tasks')

const runGulpTasks = require('./run-gulp-tasks')

function getImportFromModulePath (params) {
  const {
    envProps: {
      modulePath
    }
  } = params

  return (
    import(modulePath)
      .then(({ default: gulp }) => Object.assign(params, { gulp }))
  )
}

function getImportFromConfigPath (params) {
  const {
    envProps: {
      configPath
    }
  } = params

  return (
    import(configPath)
      .then((tasks) => Object.assign(params, { tasks }))
  )
}

function isSilent (cliProps) {
  return (cliProps.tasksList || cliProps.tasks || cliProps.tasksJson)
}

async function run (cliProps, envProps, configProps = {}) {
  console.log('@SequenceMedia/run')

  if (isSilent(cliProps)) stdout.mute()

  const { gulp, tasks } = (
    await Promise.resolve({ cliProps, envProps, configProps })
      .then(getImportFromModulePath)
      .then(getImportFromConfigPath)
  )

  listenForGulpEvents(gulp)
  listenForSyncEvents(gulp, cliProps)
  registerGulpTasks(gulp, tasks)

  stdout.unmute()

  console.log({ gulp, tasks })

  return (
    runGulpTasks(gulp, cliProps, envProps, configProps)
  )
}

module.exports = run
