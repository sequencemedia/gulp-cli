import fancyLog from 'fancy-log'
import logger from '#gulp-cli/lib/logger'

const noop = () => {}

// The sorting of the levels is
// significant.
const levels = [
  'error', // -L: Logs error events.
  'warn', // -LL: Logs warn and error events.
  'info', // -LLL: Logs info, warn and error events.
  'debug' // -LLLL: Logs all log levels.
]

function stopListeningForLevelEvents () {
  levels
    .forEach((level) => {
      if (level === 'error') {
        logger.removeListener(level, noop).removeListener(level, fancyLog.error)
      } else {
        logger.removeListener(level, fancyLog)
      }
    })
}

// Wire up log levels
export default function listenForLevelEvents (cliProps) {
  // Remove previous listeners to enable to call this twice.
  stopListeningForLevelEvents()

  // Silent?
  if (cliProps.tasksList || cliProps.tasksJson || cliProps.help || cliProps.version || cliProps.silent) {
    // Keep from crashing process when silent
    logger.on('error', noop)
  } else {
    // Default level is 3 (info)
    const loglevel = cliProps.logLevel || 3

    levels
      .filter((level, i) => level && i < loglevel)
      .forEach((level) => {
        if (level === 'error') {
          logger.on(level, fancyLog.error)
        } else {
          logger.on(level, fancyLog)
        }
      })
  }
}
