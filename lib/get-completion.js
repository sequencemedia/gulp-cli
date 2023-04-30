'use strict'

const {
  readFileSync
} = require('fs')
const path = require('path')

module.exports = function getCompletion (completionType) {
  if (typeof completionType !== 'string') {
    throw new Error('Completion type not provided')
  }

  try {
    const filePath = path.join(__dirname, path.join('../completion', completionType))
    const fileData = readFileSync(filePath, 'utf8')
    console.log(fileData.toString().trim())
    process.exit(0)
  } catch (e) {
    console.error(`echo "Completion type "${completionType}" not found"`)
    process.exit(5)
  }
}
