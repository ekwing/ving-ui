const fs = require('fs')
const path = require('path')
const Config = require('webpack-chain')
const merge = require('webpack-merge')

const resolve = function(dir) {
  return path.join(__dirname, '../..', dir)
}

module.exports = async ({ config, mode }) => {
  const configChain = new Config()

  configChain
    .when(process.env.NODE_ENV === 'production', config => {
      config.devtool('none')
    })

  configChain.resolve.extensions
    .merge(['.ts', '.tsx'])

  configChain.resolve.alias
    .set('@', resolve('src'))
    .set('packages', resolve('packages'))
    .set('storybook', resolve('storybook'))

  configChain.module
    .rule('vue')
    .test(/\.vue$/)
    .post()
    .use('vue-info')
      .loader('storybook-addon-vue-info/loader')

  configChain.module
    .rule('ts')
    .test(/\.tsx?$/)
    .use('babel')
      .loader('babel-loader')
      .end()
    .use('ts-loader')
      .loader('ts-loader')
      .options({
        transpileOnly: true,
        appendTsSuffixTo: ['\\.vue$']
      })
      .end()

configChain.module
  .rule('css')
  .test(/\.css$/)
  .use('mini-css-extract')
    .loader(require('mini-css-extract-plugin').loader)
    .end()
  .use('css-loader')
    .loader('css-loader')
    .end()
  .use('style-loader')
    .loader('style-loader')
    .end()
  .use('postcss-loader')
    .loader('postcss-loader')

  configChain.module
    .rule('scss')
    .test(/\.scss$/)
    .use('vue-style-loader')
      .loader('vue-style-loader')
      .end()
    .use('mini-css-extract')
      .loader(require('mini-css-extract-plugin').loader)
      .end()
    .use('css-loader')
      .loader('css-loader')
      .end()
    .use('postcss-loader')
      .loader('postcss-loader')
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

  configChain
    .plugin('fork-ts-checker')
      .use(require('fork-ts-checker-webpack-plugin'), [{
        vue: true,
        tslint: fs.existsSync(resolve('tslint.json')),
        formatter: 'codeframe',
        checkSyntacticErrors: false
      }])

  configChain.plugin('mini-css-extract')
    .use(require('mini-css-extract-plugin'), [
      {
        filename: 'css/[name].[chunkhash].css',
        chunkFilename: 'css/[id].[chunkhash].css'
      }
    ])

  configChain.plugin('optimize-css-assets')
    .use(require('optimize-css-assets-webpack-plugin'), [
      {
        cssProcessorOptions: { safe: true }
      }
    ])

  return merge(config, configChain.toConfig())
}
