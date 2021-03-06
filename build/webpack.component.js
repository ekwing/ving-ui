const fs = require('fs')
const path = require('path')
const Config = require('webpack-chain')
const merge = require('webpack-merge')
const { resolve } = require('./utils')
const baseWebpackConfig = require('./webpack.base.js')
const components = require('../components.json')

const config = new Config()

const externals = {}
const utilsList = fs.readdirSync(resolve('src/utils'))
const mixinsList = fs.readdirSync(resolve('src/mixins'))

utilsList.forEach(function(fileName) {
  externals[`ving-ui/src/utils/${fileName}.js`] = `ving-ui/lib/utils/${fileName}.js`
})

mixinsList.forEach(function(fileName) {
  externals[`ving-ui/src/mixins/${fileName}.js`] = `ving-ui/lib/mixins/${fileName}.js`
})

externals.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}

Object.entries(components).forEach(([key, value]) => {
  config.entry(key).add(value)
})

config
  .mode('production')
  .output
    .path(resolve('lib'))
    .filename('[name].js')
    .chunkFilename('[id].js')
    .libraryTarget('commonjs2')
    .end()
  .externals(externals)
    .end()

config.resolve.alias
  .set('@', resolve('src'))
  .set('packages', resolve('packages'))
  .set('ving-ui', resolve('.'))

config.module
  .rule('scss')
  .test(/\.scss$/)
  .use('vue-style-loader')
  .loader('vue-style-loader')
  .end()
  .use('css-loader')
  .loader('css-loader')
  .end()
  .use('sass-loader')
  .loader('sass-loader')
  .options({
    implementation: require('sass'),
    data: `
      @import "packages/theme/src/common/var.scss";
      @import "packages/theme/src/mixins/mixins.scss";
    `
  })

module.exports = merge(baseWebpackConfig, config.toConfig())
