<template>
  <div class="headerWrapper">
    <header ref="header" class="header">
      <div class="container">
        <h1>
          <slot>
            <img src="../assets/images/ek-logo.png" alt="element-logo" class="nav-logo" />
            <img src="../assets/images/ek-logo.png" alt="element-logo" class="nav-logo-small" />
          </slot>
        </h1>
        <ul class="nav">
          <!-- <li class="nav-item nav-algolia-search">
            <algolia-search></algolia-search>
          </li> -->
          <li class="nav-item">
            <div class="nav-gap"></div>
          </li>
          <!-- <li class="nav-item nav-versions">
            <el-dropdown trigger="click" class="nav-dropdown" :class="{ 'is-active': verDropdownVisible }">
              <span>
                {{ version }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="nav-dropdown-list" @input="handleVerDropdownToggle">
                <el-dropdown-item v-for="item in Object.keys(versions)" :key="item" @click.native="switchVersion(item)">
                  {{ item }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li> -->
        </ul>
      </div>
    </header>
  </div>
</template>
<script>
// import AlgoliaSearch from './search.vue'
// import Element from '../../src/index.js'
// const { version } = Element

export default {
  components: {
    // TODO: 添加搜索
    // AlgoliaSearch
  },
  data() {
    return {
      active: '',
      versions: [],
      // version,
      verDropdownVisible: true
    }
  },

  computed: {},

  created() {
    // const xhr = new XMLHttpRequest()
    // xhr.onreadystatechange = _ => {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     const versions = JSON.parse(xhr.responseText)
    //     this.versions = Object.keys(versions).reduce((prev, next) => {
    //       prev[next] = versions[next]
    //       return prev
    //     }, {})
    //   }
    // }
    // xhr.open('GET', '/versions.json')
    // xhr.send()
  },

  methods: {
    // TODO: 添加版本切换
    // switchVersion(version) {
    //   if (version === this.version) return
    //   location.href = `${location.origin}/${this.versions[version]}/${location.hash} `
    // },
    // handleVerDropdownToggle(visible) {
    //   this.verDropdownVisible = visible
    // },
    // handleLangDropdownToggle(visible) {
    //   this.langDropdownVisible = visible
    // }
  }
}
</script>
<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.headerWrapper {
  height: 80px;
}

.header {
  position: relative;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 80px;
  line-height: 80px;
  color: #fff;
  background-color: #fff;

  .container {
    box-sizing: border-box;
    height: 100%;
    border-bottom: 1px solid #dcdfe6;
  }

  .nav-lang-spe {
    color: #888;
  }

  h1 {
    float: left;
    margin: 0;
    font-size: 32px;
    font-weight: normal;

    a {
      display: block;
      color: #333;
      text-decoration: none;
    }

    span {
      display: inline-block;
      width: 34px;
      height: 18px;
      margin-left: 10px;
      font-size: 12px;
      line-height: 18px;
      text-align: center;
      vertical-align: middle;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 3px;
    }
  }

  .nav {
    float: right;
    height: 100%;
    //@utils-clearfix;
    padding: 0;
    margin: 0;
    line-height: 80px;
    background: transparent;
  }

  .nav-gap {
    position: relative;
    width: 1px;
    height: 80px;
    padding: 0 20px;

    &::before {
      position: absolute;
      top: calc(50% - 8px);
      width: 1px;
      height: 16px;
      content: '';
      background: #ebebeb;
    }
  }

  .nav-logo,
  .nav-logo-small {
    vertical-align: sub;
  }

  .nav-logo-small {
    display: none;
  }

  .nav-item {
    position: relative;
    float: left;
    margin: 0;
    list-style: none;
    cursor: pointer;

    &.nav-algolia-search {
      cursor: default;
    }

    &.lang-item,
    &:last-child {
      margin-left: 34px;
      cursor: default;

      span {
        opacity: 0.8;
      }

      .nav-lang {
        display: inline-block;
        height: 100%;
        color: #888;
        cursor: pointer;

        &:hover {
          color: #409eff;
        }
        &.active {
          font-weight: bold;
          color: #409eff;
        }
      }
    }

    a {
      display: block;
      padding: 0 22px;
      color: #888;
      text-decoration: none;

      &.active,
      &:hover {
        color: #333;
      }

      &.active::after {
        position: absolute;
        bottom: 15px;
        left: calc(50% - 7px);
        display: inline-block;
        width: 14px;
        height: 4px;
        content: '';
        background: #409eff;
      }
    }
  }
}

.nav-dropdown {
  width: 100%;
  padding-left: 18px;
  margin-bottom: 6px;

  span {
    display: block;
    width: 100%;
    padding-bottom: 6px;
    font-size: 16px;
    line-height: 40px;
    color: #888;
    user-select: none;
    transition: 0.2s;

    &:hover {
      cursor: pointer;
    }
  }

  i {
    font-size: 12px;
    color: #979797;
    transition: 0.2s;
    transform: translateY(-2px);
  }

  &:active {
    span,
    i {
      color: #409eff;
    }
    i {
      transform: rotateZ(180deg) translateY(3px);
    }
  }

  &:hover {
    span,
    i {
      color: #409eff;
    }
  }
}

.nav-dropdown-list {
  width: auto;
}

@media (max-width: 850px) {
  .header {
    .nav-logo {
      display: none;
    }
    .nav-logo-small {
      display: inline-block;
    }
    .nav-item {
      margin-left: 6px;

      &.lang-item,
      &:last-child {
        margin-left: 10px;
      }

      a {
        padding: 0 5px;
      }
    }
    .nav-theme-switch,
    .nav-algolia-search {
      display: none;
    }
  }
}

@media (max-width: 700px) {
  .header {
    .container {
      padding: 0 12px;
    }
    .nav-item {
      a {
        font-size: 12px;
        vertical-align: top;
      }

      &.lang-item {
        height: 100%;

        .nav-lang {
          display: flex;
          align-items: center;

          span {
            padding-bottom: 0;
          }
        }
      }
    }
    .nav-dropdown {
      padding: 0;
      span {
        font-size: 12px;
      }
    }
    .nav-gap {
      padding: 0 8px;
    }
    .nav-versions {
      display: none;
    }
  }
}
</style>
