'use strict'

const path = require('path')
const copyProps = require('copy-props')

const toFrom = {
  configPath: 'flags.gulpfile',
  configBase: 'flags.gulpfile',
  require: 'flags.require',
  nodeFlags: 'flags.nodeFlags'
}

function getConvert (cliProps) {
  return function convert (config, env) {
    if (env.keyChain === 'configBase') {
      if (cliProps.gulpfile === undefined) {
        return path.dirname(config.value)
      }
      return
    }

    if (env.keyChain === 'configPath') {
      if (cliProps.gulpfile === undefined) {
        return config.value
      }
      return
    }

    if (env.keyChain === 'require') {
      return [].concat(env.value, config.value)
    }

    if (env.keyChain === 'nodeFlags') {
      return [].concat(config.value || [])
    }
  }
}

function mergeConfigToEnvFlags (envProps, configProps, cliProps) {
  return (
    copyProps(envProps, configProps, toFrom, getConvert(cliProps), true) // This must reverse because `flags.gulpfile` determines 2 different properties
  )
}

module.exports = mergeConfigToEnvFlags
