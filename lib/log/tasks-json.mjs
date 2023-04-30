import {
  writeFile
} from 'node:fs/promises'

import getDuplicate from '../get-duplicate.mjs'

export default function logTasksJson (tree, cliProps) {
  const dupe = getDuplicate(tree, cliProps)
  const json = JSON.stringify(dupe)

  // Write to a file if not `true`
  if (cliProps.tasksJson !== true) return writeFile(cliProps.tasksJson, json, 'utf8')

  // Otherwise
  console.log(json.trim())
}
