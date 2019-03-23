<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.side-nav {
  box-sizing: border-box;
  width: 100%;
  padding-right: 30px;
  transition: opacity 0.3s;

  li {
    list-style: none;
  }

  ul {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  > ul > .nav-item > a {
    margin-top: 15px;
  }

  > ul > .nav-item:nth-child(-n + 4) > a {
    margin-top: 0;
  }

  .nav-item {
    a {
      position: relative;
      display: block;
      height: 40px;
      padding: 0;
      margin: 0;
      font-size: 16px;
      font-weight: bold;
      line-height: 40px;
      color: #333;
      text-decoration: none;
      transition: 0.15s ease-out;

      &.active {
        color: #409eff;
      }
    }

    .nav-item {
      a {
        display: block;
        height: 40px;
        overflow: hidden;
        font-size: 14px;
        font-weight: normal;
        line-height: 40px;
        color: #444;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:hover,
        &.active {
          color: #409eff;
        }
      }
    }

    &.sponsors {
      & > .sub-nav {
        margin-top: -10px;
      }

      & > a {
        font-size: 14px;
        font-weight: 300;
        color: #777;
      }

      .nav-item {
        display: inline-block;

        a {
          display: inline-block;
          height: auto;
          margin: 8px 12px 12px 0;
          vertical-align: middle;

          img {
            width: 42px;
          }
        }

        &:first-child a img {
          width: 36px;
        }
      }
    }
  }

  .nav-group__title {
    margin-top: 15px;
    font-size: 12px;
    line-height: 26px;
    color: #999;
  }

  #code-sponsor-widget {
    margin: 0 0 0 -20px;
  }
}
.nav-dropdown-list {
  width: 120px;
  margin-top: -8px;
  li {
    font-size: 14px;
  }
}
</style>
<template>
  <div class="side-nav" :style="navStyle">
    <ul>
      <li v-for="(item, key) in data" :key="key" class="nav-item">
        <a v-if="!item.path && !item.href" @click="expandMenu">{{ item.name }}</a>
        <a v-if="item.href" :href="item.href" target="_blank">{{ item.name }}</a>
        <router-link
          v-if="item.path"
          active-class="active"
          :to="base + item.path"
          exact
          v-text="item.title || item.name"
        >
        </router-link>
        <ul v-if="item.children" class="pure-menu-list sub-nav">
          <li v-for="(navItem, key) in item.children" :key="key" class="nav-item">
            <router-link
              class=""
              active-class="active"
              :to="base + navItem.path"
              exact
              v-text="navItem.title || navItem.name"
            >
            </router-link>
          </li>
        </ul>
        <template v-if="item.groups">
          <div v-for="(group, key) in item.groups" :key="key" class="nav-group">
            <div class="nav-group__title" @click="expandMenu">{{ group.groupName }}</div>
            <ul class="pure-menu-list">
              <li v-for="(navItem, key) in group.list" :key="key" class="nav-item">
                <router-link active-class="active" :to="base + navItem.path" exact v-text="navItem.title"></router-link>
              </li>
            </ul>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    data: Array,
    base: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      highlights: [],
      navState: [],
      isSmallScreen: false
    }
  },
  computed: {
    navStyle() {
      const style = {}
      if (this.isSmallScreen) {
        style.paddingBottom = '60px'
      }
      return style
    }
  },
  watch: {
    '$route.path'() {
      this.handlePathChange()
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.isSmallScreen = document.documentElement.clientWidth < 768
      this.handlePathChange()
    },
    handlePathChange() {
      if (!this.isSmallScreen) {
        this.expandAllMenu()
        return
      }
      this.$nextTick(() => {
        this.hideAllMenu()
        let activeAnchor = this.$el.querySelector('a.active')
        let ul = activeAnchor.parentNode
        while (ul.tagName !== 'UL') {
          ul = ul.parentNode
        }
        ul.style.height = 'auto'
      })
    },
    hideAllMenu() {
      ;[].forEach.call(this.$el.querySelectorAll('.pure-menu-list'), ul => {
        ul.style.height = '0'
      })
    },
    expandAllMenu() {
      ;[].forEach.call(this.$el.querySelectorAll('.pure-menu-list'), ul => {
        ul.style.height = 'auto'
      })
    },
    expandMenu(event) {
      if (!this.isSmallScreen) return
      let target = event.currentTarget
      if (!target.nextElementSibling || target.nextElementSibling.tagName !== 'UL') return
      this.hideAllMenu()
      event.currentTarget.nextElementSibling.style.height = 'auto'
    }
  }
}
</script>
