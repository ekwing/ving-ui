const Config = require('webpack-chain')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const config = new Config()

config.node
  .set('setImmediate', false)
  .set('process', 'mock')
  .set('dgram', 'empty')
  .set('fs', 'empty')
  .set('net', 'empty')
  .set('tls', 'empty')
  .set('child_process', 'empty')

config.module
  .rule('vue')
  .test(/\.vue$/)
  .use('vue-loader')
  .loader('vue-loader')
  .options({
    compilerOptions: {
      preserveWhitespace: false
    }
  })

config.module
  .rule('eslint')
  .pre()
  .test(/\.(vue|(j|t)sx?)$/)
  .exclude.add(/node_modules/)
  .end()
  .use('eslint-loader')
  .loader('eslint-loader')
  .options({
    extensions: ['.js', '.jsx', '.vue'],
    cache: true,
    cacheIdentifier: '4839036d',
    emitWarning: true,
    emitError: false,
    formatter: function() {
      /* omitted long function */
    }
  })

config.module
  .rule('compile')
  .test(/\.js$/)
  .exclude.add(/node_modules/)
  .end()
  .use('babel')
  .loader('babel-loader')

config.module
  .rule('css')
  .test(/\.css/)
  .use('style-loader')
  .loader('style-loader')
  .end()
  .use('css-loader')
  .loader('css-loader')
  .end()
  .use('postcss-loader')
  .loader('postcss-loader')
  .end()

config.module
  .rule('media')
  .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
  .use('url-loader')
  .loader('url-loader')
  .options({
    limit: 4096,
    fallback: {
      loader: 'file-loader',
      options: {
        name: 'media/[name].[hash:8].[ext]'
      }
    }
  })

config.module
  .rule('images')
  .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
  .use('url-loader')
  .loader('url-loader')
  .options({
    limit: 4096,
    fallback: {
      loader: 'file-loader',
      options: {
        name: 'img/[name].[hash:8].[ext]'
      }
    }
  })

config.module
  .rule('svg')
  .test(/\.(svg)(\?.*)?$/)
  .use('file-loader')
  .loader('file-loader')
  .options({
    name: 'img/[name].[hash:8].[ext]'
  })

config.module
  .rule('fonts')
  .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
  .use('url-loader')
  .loader('url-loader')
  .options({
    limit: 4096,
    fallback: {
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[hash:8].[ext]'
      }
    }
  })

config.plugin('vue-loader').use(require('vue-loader/lib/plugin'))

config.plugin('stylelint').use(StyleLintPlugin, [
  {
    files: ['**/*.{html,vue,css,sass,scss}'],
    fix: false,
    cache: true,
    emitErrors: false,
    failOnError: false
  }
])

module.exports = config.toConfig()
