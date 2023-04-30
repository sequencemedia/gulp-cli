'use strict'

const chai = require('chai')
const {
  expect
} = chai

const mergeConfig = require('../../../../lib/config/env-flags')

describe('./lib/config/env-flags', () => {
  it('Should copy only config props specified to env flags', (done) => {
    const configProps = {
      description: 'Description',
      flags: {
        silent: true,
        gulpfile: '/path/to/gulpfile'
      }
    }

    expect(mergeConfig({}, configProps, {}))
      .to.eql({
        configPath: '/path/to/gulpfile',
        configBase: '/path/to'
      })

    done()
  })

  it('Should skip gulpfile from config props if defined in cli flags', (done) => {
    const envProps = {
      cwd: '/path/to/cwd',
      require: 'preload',
      configNameSearch: 'configNameSearch',
      configPath: '/path/of/config/path',
      configBase: '/path/of/config/base',
      modulePath: '/path/of/module/path',
      modulePackage: { name: 'modulePackage' },
      configFiles: { etc: {} }
    }

    const configProps = {
      description: 'Description',
      flags: {
        silent: false,
        gulpfile: '/path/to/gulpfile',
        require: ['a', 'b']
      }
    }

    const cliProps = {
      gulpfile: envProps.configPath
    }

    expect(mergeConfig(envProps, configProps, cliProps))
      .to.eql({
        cwd: '/path/to/cwd',
        require: ['preload', 'a', 'b'],
        configNameSearch: 'configNameSearch',
        configPath: '/path/of/config/path',
        configBase: '/path/of/config/base',
        modulePath: '/path/of/module/path',
        modulePackage: { name: 'modulePackage' },
        configFiles: { etc: {} }
      })

    done()
  })

  it('Should copy gulpfile from config props if undefined in cli flags', (done) => {
    const envProps = {
      cwd: '/path/to/cwd',
      require: 'preload',
      configNameSearch: 'configNameSearch',
      configPath: '/path/of/config/path',
      configBase: '/path/of/config/base',
      modulePath: '/path/of/module/path',
      modulePackage: { name: 'modulePackage' },
      configFiles: { etc: {} }
    }

    const configProps = {
      description: 'Description',
      flags: {
        silent: false,
        gulpfile: '/path/to/gulpfile',
        require: ['a', 'b']
      }
    }

    expect(mergeConfig(envProps, configProps, {}))
      .to.eql({
        cwd: '/path/to/cwd',
        require: ['preload', 'a', 'b'],
        configNameSearch: 'configNameSearch',
        configPath: '/path/to/gulpfile',
        configBase: '/path/to',
        modulePath: '/path/of/module/path',
        modulePackage: { name: 'modulePackage' },
        configFiles: { etc: {} }
      })

    done()
  })

  it('Should not cause error if config props is empty', (done) => {
    const envProps = {
      cwd: '/path/to/cwd',
      require: 'preload',
      configNameSearch: 'configNameSearch',
      configPath: '/path/of/config/path',
      configBase: '/path/of/config/base',
      modulePath: '/path/of/module/path',
      modulePackage: { name: 'modulePackage' },
      configFiles: { etc: {} }
    }

    expect(mergeConfig(envProps, {}, {}))
      .to.eql({
        cwd: '/path/to/cwd',
        require: 'preload',
        configNameSearch: 'configNameSearch',
        configPath: '/path/of/config/path',
        configBase: '/path/of/config/base',
        modulePath: '/path/of/module/path',
        modulePackage: { name: 'modulePackage' },
        configFiles: { etc: {} }
      })

    done()
  })
})
