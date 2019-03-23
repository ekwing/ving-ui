const fs = require('fs')
const path = require('path')
const Config = require('webpack-chain')
const merge = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common.js')
const components = require('../components.json')

const config = new Config()

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const externals = {}
const utilsList = fs.readdirSync(resolve('src/utils'))
const mixinsList = fs.readdirSync(resolve('src/mixins'))

Object.keys(components).forEach(function(key) {
  externals[`ek-app-ui/packages/${key}`] = `ek-app-ui/lib/${key}`
})

utilsList.forEach(function(fileName) {
  externals[`ek-app-ui/src/utils/${fileName}.js`] = `ek-app-ui/lib/utils/${fileName}.js`
})

mixinsList.forEach(function(fileName) {
  externals[`ek-app-ui/src/mixins/${fileName}.js`] = `ek-app-ui/lib/mixins/${fileName}.js`
})

externals.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}

config
  .mode('production')
  .entry('index')
  .add('./src/index.js')
  .end()
  .output.path(resolve('lib'))
  .filename('[name].js')
  .end()
  .externals(externals)
  .resolve.extensions.add('.js')
  .add('.vue')
  .add('.json')
  .end()
  .alias.set('@src', resolve('src'))
  .set('@packages', resolve('packages'))
  .set('ek-app-ui', resolve('.'))

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
          @import "@packages/theme/src/common/var.scss";
          @import "@packages/theme/src/mixins/mixins.scss";
        `
  })

const webpackConfig = merge(commonWebpackConfig, config.toConfig())

module.exports = webpackConfig
