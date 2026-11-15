import merge from '@sequencemedia/eslint-config-standard/merge'
import globals from 'globals'

export default (
  merge({
    files: [
      '**/*.{cjs,mjs}'
    ],
    ignores: [
      'test'
    ],
    languageOptions: {
      globals: {
        fetch: 'readonly',
        ...globals.node
      }
    }
  })
    .concat(
      merge({
        files: [
          'test/**/*.{cjs,mjs}'
        ],
        languageOptions: {
          globals: {
            fetch: 'readonly',
            ...globals.mocha
          }
        }
      })
        .concat({
          rules: {
            'no-unused-expressions': 'off'
          }
        })
    )
)
