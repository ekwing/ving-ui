<template>
  <el-autocomplete
    v-model="query"
    size="small"
    :popper-class="`algolia-search${isEmpty ? ' is-empty' : ''}`"
    :fetch-suggestions="querySearch"
    placeholder="搜索文档"
    :trigger-on-focus="false"
    highlight-first-item
    @select="handleSelect"
  >
    <template slot-scope="props">
      <p v-if="props.item.title" class="algolia-search-title">
        <span v-html="props.item.highlightedCompo"></span>
        <span class="algolia-search-separator">></span>
        <span v-html="props.item.title"></span>
      </p>
      <p v-if="props.item.content" class="algolia-search-content" v-html="props.item.content"></p>
      <a v-if="props.item.img" class="algolia-search-link" target="_blank" href="https://www.algolia.com/docsearch">
        <img class="algolia-search-logo" src="" alt="algolia-logo" />
      </a>
      <p v-if="props.item.isEmpty" class="algolia-search-empty">无</p>
    </template>
  </el-autocomplete>
</template>

<style lang="scss" scoped>
.algolia-search {
  width: 450px !important;
  .el-autocomplete-suggestion__list {
    position: static !important;
    padding-bottom: 28px;
  }
  &.is-empty {
    .el-autocomplete-suggestion__list {
      padding-bottom: 0;
    }
  }

  li {
    border-bottom: solid 1px #ebebeb;

    &:last-child {
      border-bottom: none;
    }
  }

  .algolia-highlight {
    font-weight: bold;
    color: #409eff;
  }

  .algolia-search-title {
    margin: 6px 0;
    font-size: 14px;
    line-height: 1.8;
  }

  .algolia-search-separator {
    padding: 0 6px;
  }

  .algolia-search-content {
    margin: 6px 0;
    overflow: hidden;
    font-size: 12px;
    line-height: 2.4;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .algolia-search-link {
    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    padding-right: 20px;
    text-align: right;
    background-color: #e4e7ed;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;

    &:hover {
      background-color: #e4e7ed;
    }

    img {
      display: inline-block;
      height: 17px;
      margin-top: 10px;
    }
  }

  .algolia-search-empty {
    margin: 5px 0;
    color: #999;
    text-align: center;
  }
}
</style>

<script>
import algoliasearch from 'algoliasearch'

export default {
  data() {
    return {
      index: null,
      query: '',
      isEmpty: false
    }
  },

  computed: {},

  watch: {},

  mounted() {
    this.initIndex()
  },

  methods: {
    initIndex() {
      const client = algoliasearch('H0RWPZISHQ', 'ff617dd73a8ee4dc830b4d6441408895')
      this.index = client.initIndex('ek-app-ui')
    },

    querySearch(query, cb) {
      if (!query) return
      this.index.search({ query, hitsPerPage: 6 }, (err, res) => {
        if (err) {
          console.error(err)
          return
        }
        if (res.hits.length > 0) {
          this.isEmpty = false
          cb(
            res.hits
              .map(hit => {
                let content = hit._highlightResult.content.value.replace(/\s+/g, ' ')
                const highlightStart = content.indexOf('<span class="algolia-highlight">')
                if (highlightStart > -1) {
                  const startEllipsis = highlightStart - 15 > 0
                  content =
                    (startEllipsis ? '...' : '') + content.slice(Math.max(0, highlightStart - 15), content.length)
                } else if (content.indexOf('|') > -1) {
                  content = ''
                }
                return {
                  anchor: hit.anchor,
                  component: hit.component,
                  highlightedCompo: hit._highlightResult.component.value,
                  title: hit._highlightResult.title.value,
                  content
                }
              })
              .concat({ img: true })
          )
        } else {
          this.isEmpty = true
          cb([{ isEmpty: true }])
        }
      })
    },

    handleSelect(val) {
      if (val.img || val.isEmpty) return
      const component = val.component || ''
      const anchor = val.anchor
      this.$router.push(`/component/${component}${anchor ? `#${anchor}` : ''}`)
    }
  }
}
</script>
