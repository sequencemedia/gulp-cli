
import ansiColors from 'ansi-colors'
import getColorSupport from 'color-support'

const HAS_NO_COLOR = process.argv.includes('--no-color')
const HAS_COLOR = process.argv.includes('--color')
const HAS_COLOR_SUPPORT = hasColorSupport(getColorSupport())

function hasColorSupport ({ hasBasic, has256, has16m }) {
  return (
    hasBasic ||
    has256 ||
    has16m
  )
}

function hasColor () {
  if (HAS_NO_COLOR) {
    return false
  }

  return (
    HAS_COLOR ||
    HAS_COLOR_SUPPORT
  )
}

function noColor (message) {
  return message
}

export default (
  hasColor()
    ? ansiColors
    : {
        red: noColor,
        green: noColor,
        blue: noColor,
        magenta: noColor,
        cyan: noColor,
        white: noColor,
        gray: noColor,
        bgred: noColor,
        bold: noColor,
        yellow: noColor
      }
)
