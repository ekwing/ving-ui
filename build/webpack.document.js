const path = require('path')
const md = require('markdown-it')()
const TerserPlugin = require('terser-webpack-plugin')
const Config = require('webpack-chain')
const merge = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common.js')
const striptags = require('./strip-tags.js')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function wrap(render) {
  return function() {
    return render
      .apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">')
  }
}

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16))
  })
  return str
}

const config = new Config()

config
  .mode('production')
  .entry('index')
  .add('./examples/entry.js')
  .end()
  .output.publicPath('./')
  .path(resolve('docs'))
  .filename('js/[name].[contenthash:8].js')
  .chunkFilename('js/[name].[contenthash:8].js')
  .end()
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

config.module
  .rule('md')
  .test(/\.md/)
  .use('vue-loader')
  .loader('vue-loader')
  .end()
  .use('vue-markdown-loader')
  .loader('vue-markdown-loader/lib/markdown-compiler')
  .options({
    preventExtract: true,
    raw: true,
    preprocess: function(MarkdownIt, source) {
      MarkdownIt.renderer.rules.table_open = function() {
        return '<table class="table">'
      }
      MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence)
      return source
    },
    use: [
      [
        require('markdown-it-container'),
        'demo',
        {
          validate: function(params) {
            return params.trim().match(/^demo\s*(.*)$/)
          },

          render: function(tokens, idx) {
            var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
            if (tokens[idx].nesting === 1) {
              var description = m && m.length > 1 ? m[1] : ''
              var content = tokens[idx + 1].content
              var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1')
              var script = striptags.fetch(content, 'script')
              var style = striptags.fetch(content, 'style')
              var jsfiddle = { html: html, script: script, style: style }
              var descriptionHTML = description ? md.render(description) : ''

              jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle))

              return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
                      <div class="source" slot="source">${html}</div>
                      ${descriptionHTML}
                      <div class="highlight" slot="highlight">`
            }
            return '</div></demo-block>\n'
          }
        }
      ],
      [require('markdown-it-container'), 'tip'],
      [require('markdown-it-container'), 'warning']
    ]
  })

config.optimization
  .splitChunks({
    cacheGroups: {
      vendors: {
        name: 'chunk-vendors',
        test: /[\\\/]node_modules[\\\/]/,
        priority: -10,
        chunks: 'initial'
      },
      common: {
        name: 'chunk-common',
        minChunks: 2,
        priority: -20,
        chunks: 'initial',
        reuseExistingChunk: true
      }
    }
  })
  .minimizer('js')
  .use(TerserPlugin, [
    {
      test: /\.m?js(\?.*)?$/i,
      chunkFilter: () => true,
      warningsFilter: () => true,
      extractComments: false,
      sourceMap: true,
      cache: true,
      cacheKeys: defaultCacheKeys => defaultCacheKeys,
      parallel: true,
      include: undefined,
      exclude: undefined,
      minify: undefined,
      terserOptions: {
        output: {
          comments: /^\**!|@preserve|@license|@cc_on/i
        },
        compress: {
          arrows: false,
          collapse_vars: false,
          comparisons: false,
          computed_props: false,
          hoist_funs: false,
          hoist_props: false,
          hoist_vars: false,
          inline: false,
          loops: false,
          negate_iife: false,
          properties: false,
          reduce_funcs: false,
          reduce_vars: false,
          switches: false,
          toplevel: false,
          typeofs: false,
          booleans: true,
          if_return: true,
          sequences: true,
          unused: true,
          conditionals: true,
          dead_code: true,
          evaluate: true
        },
        mangle: {
          safari10: true
        }
      }
    }
  ])

config.plugin('html').use(require('html-webpack-plugin'), [
  {
    template: './examples/index.html'
  }
])

const webpackConfig = merge(commonWebpackConfig, config.toConfig())

module.exports = webpackConfig
