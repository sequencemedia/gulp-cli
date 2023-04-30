'use strict'

const log = require('gulplog')
const ansi = require('../ansi')

const tasks = new Map()

function warn () {
  if (tasks.size) {
    const taskNames = Array.from(tasks.values()).join(', ')

    process.exitCode = 1

    log.warn(
      ansi.red('The following tasks did not complete:')
    )
    log.warn(
      ansi.cyan(taskNames)
    )
    log.warn(
      ansi.red('Did you forget to signal async completion?')
    )
  }
}

function start ({ uid, name }) {
  tasks.set(uid, name)
}

function clear ({ uid }) {
  tasks.delete(uid)
}

function clearAll () {
  tasks.clear()
}

function stopListeningForSyncEvents (gulp) {
  // Ensure to detach
  process
    .removeListener('exit', warn)

  gulp
    .removeListener('start', start)
    .removeListener('stop', clear)
    .removeListener('error', clear).removeListener('error', clearAll)
}

function listenForSyncEvents (gulp, cliProps) {
  stopListeningForSyncEvents(gulp)

  process
    .once('exit', warn)

  // When not running in --continue mode we need to clear everything on error
  gulp
    .on('start', start)
    .on('stop', clear)
    .on('error', cliProps.continue ? clear : clearAll)
}

module.exports = listenForSyncEvents
