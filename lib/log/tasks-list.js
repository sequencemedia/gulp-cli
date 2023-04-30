'use strict'

module.exports = function logTasksList ({ nodes = [] }) {
  console.log(nodes.join('\n').trim())
}
