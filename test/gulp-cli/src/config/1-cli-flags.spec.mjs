import { expect } from 'chai'

import mergeConfig from '#gulp-cli/src/config/cli-flags'

describe('./src/config/cli-flags', () => {
  it('copies only config props specified to cli flags', () => {
    const configProps = {
      description: 'Description',
      flags: {
        silent: true,
        continue: true,
        gulpfile: '/path/to/gulpfile'
      }
    }

    expect(mergeConfig({}, configProps))
      .to.eql({
        silent: true,
        continue: true
      })
  })

  it('does not override cli flags with config props', () => {
    const cliProps = {
      help: false,
      depth: 4,
      silent: true,
      tasks: false
    }

    const configProps = {
      description: 'Description',
      flags: {
        silent: false,
        depth: 3,
        gulpfile: '/path/to/gulpfile'
      }
    }

    expect(mergeConfig(cliProps, configProps))
      .to.eql({
        help: false,
        depth: 4,
        silent: true,
        tasks: false
      })
  })

  it('does not throw if config is empty', () => {
    const cliProps = {
      help: false,
      depth: 4,
      silent: true,
      tasks: false
    }

    expect(mergeConfig(cliProps, {}))
      .to.eql({
        help: false,
        depth: 4,
        silent: true,
        tasks: false
      })
  })
})
