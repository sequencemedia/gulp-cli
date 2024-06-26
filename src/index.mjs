import {
  pathToFileURL
} from 'node:url'

import stdout from 'mute-stdout'

import listenForGulpEvents from './log/listen-for-gulp-events.mjs'
import listenForSyncEvents from './log/listen-for-sync-events.mjs'
import registerGulpTasks from './register-gulp-tasks.mjs'

import runGulpTasks from './run-gulp-tasks.mjs'

function getImportFromModulePath (params) {
  const {
    envProps: {
      modulePath
    }
  } = params

  const fileUrl = pathToFileURL(modulePath)

  return (
    import(fileUrl)
      .then(({ default: gulp }) => Object.assign(params, { gulp }))
  )
}

function getImportFromConfigPath (params) {
  const {
    envProps: {
      configPath
    }
  } = params

  const fileUrl = pathToFileURL(configPath)

  return (
    import(fileUrl)
      .then((tasks) => Object.assign(params, { tasks }))
  )
}

function isSilent (cliProps) {
  return (cliProps.tasksList || cliProps.tasks || cliProps.tasksJson)
}

async function run (cliProps, envProps, configProps = {}) {
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

  return (
    runGulpTasks(gulp, cliProps, envProps, configProps)
  )
}

export default run
