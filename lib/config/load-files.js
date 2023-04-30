'use strict'

const copyProps = require('copy-props')
const path = require('path')

function loadConfigFiles (configFiles = {}, configFileOrder = []) {
  const config = {}

  configFileOrder
    .filter((key) => configFiles[key])
    .forEach((key) => {
      const filePath = configFiles[key]
      const props = require(filePath)

      copyProps(props, config, ({ keyChain, value }) => {
        if (keyChain === 'flags.gulpfile') {
          return path.resolve(path.dirname(filePath), value)
        }

        return value
      })
    })

  return config
}

module.exports = loadConfigFiles
