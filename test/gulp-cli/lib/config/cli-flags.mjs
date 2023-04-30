
import chai from 'chai'

import mergeConfig from '#gulp-cli/lib/config/cli-flags'
const {
  expect
} = chai

describe('./lib/config/cli-flags', () => {
  it('Should copy only config props specified to cli flags', (done) => {
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

    done()
  })

  it('Should not override cli flags with config props', (done) => {
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

    done()
  })

  it('Should not cause error if config is empty', (done) => {
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

    done()
  })
})
