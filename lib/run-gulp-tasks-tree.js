const ansi = require('./ansi')
const tildify = require('./tildify')

const logTasks = require('./log/tasks')
const getTask = require('./get-task')

module.exports = function runGulpTasksTree (gulp, cliProps, envProps, configProps) {
  const tree = gulp.tree({ deep: true })
  if (configProps.description && typeof configProps.description === 'string') {
    tree.label = configProps.description
  } else {
    tree.label = `Tasks for ${ansi.magenta(tildify(envProps.configPath))}`
  }

  return logTasks(tree, cliProps, getTask(gulp))
}
