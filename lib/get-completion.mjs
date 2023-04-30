import path from 'node:path'

import {
  readFile
} from 'node:fs/promises'

export default async function getCompletion (completionType) {
  if (typeof completionType !== 'string') {
    throw new Error('Completion type not provided')
  }

  try {
    const filePath = path.join('./completion', completionType)
    const fileData = await readFile(filePath, 'utf8')
    console.log(fileData.toString().trim())
    process.exit(0)
  } catch (e) {
    console.error(`echo "Completion type "${completionType}" not found"`)
    process.exit(5)
  }
}
