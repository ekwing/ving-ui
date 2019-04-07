const fs = require('fs')
const path = require('path')
const Config = require('webpack-chain')
const merge = require('webpack-merge')
const { resolve } = require('./utils')
const baseWebpackConfig = require('./webpack.base.js')

const config = new Config()
const externals = {}

externals.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}

config
  .mode('production')
  .entry('app')
    .add('./src/index.ts')
    .end()
  .output
    .path(resolve('lib'))
    .filename('index.js')
    .chunkFilename('[id].js')
    .libraryTarget('umd')
    .libraryExport('default')
    .library('VINGUI')
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
