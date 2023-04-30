
export default function registerGulpTasks (gulp, tasks) {
  Object.entries(tasks)
    .filter(([taskName, task]) => (taskName || task.displayName) && task instanceof Function)
    .forEach(([taskName, task]) => {
      gulp.task(task.displayName || taskName, task)
    })
}
