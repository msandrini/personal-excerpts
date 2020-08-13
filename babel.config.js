/**
 * We needed "@babel/plugin-transform-runtime" to make generators (Saga) work
 * Also we needed the exception at the end for tests to work with TS as well
 * 
 * On root JS/TS file we import:
 * 
 *  import 'core-js/stable'
    import 'regenerator-runtime/runtime'
 */

module.exports = function babelConfig(api) {
  const basicConfig = {
    presets: [
      '@babel/preset-env',
      [
        '@babel/react',
        {
          development: true
        }
      ]
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          regenerator: true
        }
      ]
    ]
  }

  if (api.env('test')) {
    const testConfig = { ...basicConfig }
    testConfig.plugins[0][1].useESModules = false
    testConfig.presets = [
      basicConfig.presets,
      "@babel/preset-typescript"
    ]
    return testConfig
  }
  return basicConfig
}
