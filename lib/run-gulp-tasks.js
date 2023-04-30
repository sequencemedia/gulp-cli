const log = require('gulplog')

const ansi = require('./ansi')
const exit = require('./exit')
const tildify = require('./tildify')

const runGulpTasksListTree = require('./run-gulp-tasks-list-tree')
const runGulpTasksTree = require('./run-gulp-tasks-tree')
const runGulpTasksJsonTree = require('./run-gulp-tasks-json-tree')

function getMethodFromCliProps ({ series = false }) {
  return series ? 'series' : 'parallel'
}

function getTasksFromCliProps ({ _: tasks = [] }) {
  return (
    tasks.length ? [...tasks] : ['default']
  )
}

module.exports = function runGulpTasks (gulp, cliProps, envProps, configProps) {
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
