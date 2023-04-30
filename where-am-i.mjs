import {
  fileURLToPath
} from 'node:url'

import {
  dirname
} from 'node:path'

export default dirname(fileURLToPath(import.meta.url))
