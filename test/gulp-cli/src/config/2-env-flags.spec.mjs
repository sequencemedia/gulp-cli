import { expect } from 'chai'

import mergeConfig from '#gulp-cli/src/config/env-flags'

describe('./src/config/env-flags', () => {
  it('copies only config props specified to env flags', () => {
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
  })

  it('skips gulpfile from config props if defined in cli flags', () => {
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
  })

  it('copies gulpfile from config props if undefined in cli flags', () => {
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
  })

  it('does not throw if config props is empty', () => {
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
  })
})
