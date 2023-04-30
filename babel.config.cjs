module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 'current'
        },
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ],
  plugins: [
    '@babel/syntax-import-assertions'
  ]
}
