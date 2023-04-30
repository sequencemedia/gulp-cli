import ansi from './ansi.mjs'
import tildify from './tildify.mjs'

import logTasks from './log/tasks.mjs'
import getTask from './get-task.mjs'

export default function runGulpTasksTree (gulp, cliProps, envProps, configProps) {
  const tree = gulp.tree({ deep: true })
  if (configProps.description && typeof configProps.description === 'string') {
    tree.label = configProps.description
  } else {
    tree.label = `Tasks for ${ansi.magenta(tildify(envProps.configPath))}`
  }

  return logTasks(tree, cliProps, getTask(gulp))
}
