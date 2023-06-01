import logTasksList from './log/tasks-list.mjs'

export default function runGulpTasksListTree (gulp) {
  const tree = gulp.tree()

  return logTasksList(tree)
}
