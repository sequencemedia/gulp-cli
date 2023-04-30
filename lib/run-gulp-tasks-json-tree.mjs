import tildify from './tildify.mjs'

import logTasksJson from './log/tasks-json.mjs'

export default function runGulpTasksJsonTree (gulp, cliProps, envProps, configProps) {
  const tree = gulp.tree({ deep: true })
  if (configProps.description && typeof configProps.description === 'string') {
    tree.label = configProps.description
  } else {
    tree.label = `Tasks for ${tildify(envProps.configPath)}`
  }

  return logTasksJson(tree, cliProps)
}
