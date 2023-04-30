import log from 'gulplog'

import ansi from './ansi.mjs'
import exit from './exit.mjs'
import tildify from './tildify.mjs'

import runGulpTasksListTree from './run-gulp-tasks-list-tree.mjs'
import runGulpTasksTree from './run-gulp-tasks-tree.mjs'
import runGulpTasksJsonTree from './run-gulp-tasks-json-tree.mjs'

function getMethodFromCliProps ({ series = false }) {
  return series ? 'series' : 'parallel'
}

function getTasksFromCliProps ({ _: tasks = [] }) {
  return (
    tasks.length ? [...tasks] : ['default']
  )
}

export default function runGulpTasks (gulp, cliProps, envProps, configProps) {
  if (cliProps.tasksList) return runGulpTasksListTree(gulp)

  if (cliProps.tasks) return runGulpTasksTree(gulp, cliProps, envProps, configProps)

  if (cliProps.tasksJson) return runGulpTasksJsonTree(gulp, cliProps, envProps, configProps)

  try {
    const {
      configPath
    } = envProps

    log.info(`Using gulpfile ${ansi.magenta(tildify(configPath))}`)

    const method = getMethodFromCliProps(cliProps)
    const tasks = getTasksFromCliProps(cliProps)

    return (
      gulp[method](tasks)((e) => e && exit(1))
    )
  } catch ({ message }) {
    log.error(ansi.red(message))
    log.error('To list available tasks run: gulp --tasks')
    exit(1)
  }
}
