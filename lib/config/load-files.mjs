
import copyProps from 'copy-props'
import {
  join,
  extname,
  resolve,
  dirname
} from 'node:path'

function getConfig (module) {
  if (Reflect.has(module, 'default')) return Reflect.get(module, 'default')
  return module
}

export default async function loadConfigFiles (configFiles = {}, configFileOrder = []) {
  const config = {}

  const keyList = (
    configFileOrder
      .filter((key) => configFiles[key])
  )

  while (keyList.length) {
    const key = keyList.shift()
    const filePath = configFiles[key]

    try {
      const module = (
        extname(filePath) === '.json'
          ? await import(resolve(join(process.cwd(), filePath)), { assert: { type: 'json' } })
          : await import(resolve(join(process.cwd(), filePath)))
      )

      copyProps(getConfig(module), config, ({ keyChain, value }) => {
        if (keyChain === 'flags.gulpfile') {
          return resolve(dirname(filePath), value)
        }

        return value
      })
    } catch (e) {
      const {
        code
      } = e

      if (code !== 'ERR_MODULE_NOT_FOUND') console.error(e)
    }
  }

  return config
}
