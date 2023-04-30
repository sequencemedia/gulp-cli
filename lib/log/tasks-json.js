const {
  writeFile
} = require('node:fs/promises')

const getDuplicate = require('../get-duplicate')

module.exports = function logTasksJson (tree, cliProps) {
  const dupe = getDuplicate(tree, cliProps)
  const json = JSON.stringify(dupe)

  // Write to a file if not `true`
  if (cliProps.tasksJson !== true) return writeFile(cliProps.tasksJson, json, 'utf8')

  // Otherwise
  console.log(json.trim())
}
