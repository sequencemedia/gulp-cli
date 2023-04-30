const logTasksList = require('./log/tasks-list')

module.exports = function runGulpTasksListTree (gulp) {
  const tree = gulp.tree()

  return logTasksList(tree)
}
