
import log from 'gulplog'
import prettyHrtime from 'pretty-hrtime'

import ansi from '../ansi.mjs'
import formatError from '../format-error.mjs'

const errors = new Set()

function start (event) {
  const level = event.branch ? 'debug' : 'info'
  log[level](`Starting '${ansi.cyan(event.name)}'...`)
}

function stop (event) {
  const level = event.branch ? 'debug' : 'info'
  log[level](`Finished '${ansi.cyan(event.name)}' after ${ansi.magenta(prettyHrtime(event.duration))}`)
}

function error (event) {
  const level = event.branch ? 'debug' : 'error'
  log[level](`'${ansi.cyan(event.name)}' ${ansi.red('errored after')} ${ansi.magenta(prettyHrtime(event.duration))}`)

  // Exit if we have logged this before
  if (errors.has(event.error)) return

  // If we haven't logged this before, log it and add it to the error list
  log.error(formatError(event))
  errors.add(event.error)
}

function stopListeningForGulpEvents (gulp) {
  gulp
    .removeListener('start', start)
    .removeListener('stop', stop)
    .removeListener('error', error)
}

// Wire up logging events
export default function listenForGulpEvents (gulp) {
  stopListeningForGulpEvents(gulp)

  gulp
    .on('start', start)
    .on('stop', stop)
    .on('error', error)
}
