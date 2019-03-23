<template>
  <div class="page-container page-component">
    <div class="page-component__nav">
      <side-nav :data="navsData" base=""></side-nav>
    </div>
    <div class="page-component__content">
      <router-view class="content"></router-view>
      <footer-nav></footer-nav>
    </div>
    <transition name="back-top-fade">
      <div
        v-show="showBackToTop"
        class="page-component-up"
        :class="{ hover: hover }"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
        @click="toTop"
      >
        <span class="back-top-icon">&#9652;</span>
      </div>
    </transition>
  </div>
</template>
<script>
import { throttle } from 'throttle-debounce'

import navsData from '../nav.config.json'

export default {
  data() {
    return {
      lang: this.$route.meta.lang,
      navsData,
      hover: false,
      showBackToTop: false,
      throttledScrollHandler: null
    }
  },
  created() {
    window.addEventListener('hashchange', () => {
      if (location.href.match(/#/g).length < 2) {
        document.documentElement.scrollTop = document.body.scrollTop = 0
      }
    })
  },
  mounted() {
    this.throttledScrollHandler = throttle(300, this.handleScroll)
    window.addEventListener('scroll', this.throttledScrollHandler)
  },
  destroyed() {
    window.removeEventListener('scroll', this.throttledScrollHandler)
  },
  methods: {
    // TODO: 每个文档生成doctoc

    handleScroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.showBackToTop = scrollTop >= 0.5 * document.body.clientHeight
    },
    toTop() {
      this.hover = false
      this.showBackToTop = false
      document.documentElement.scrollTop = document.body.scrollTop = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.page-component {
  box-sizing: border-box;
  height: 100%;

  &.page-container {
    padding: 0;
  }

  .page-component__nav {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 240px;
    margin-top: 80px;
    transition: padding-top 0.3s;

    &.is-extended {
      padding-top: 0;
    }
  }

  .side-nav {
    height: 100%;
    padding-top: 50px;
    padding-right: 0;
    padding-bottom: 50px;

    & > ul {
      padding-bottom: 50px;
    }
  }

  .page-component__content {
    box-sizing: border-box;
    padding-bottom: 100px;
    padding-left: 270px;
  }

  .content {
    padding-top: 50px;
  }

  .page-component-up {
    position: fixed;
    right: 100px;
    bottom: 150px;
    z-index: 5;
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    transition: 0.3s;
    size: 40px;

    &.hover {
      opacity: 1;
    }

    .back-top-icon {
      display: block;
      font-size: 28px;
      line-height: 40px;
      color: #409eff;
      text-align: center;
    }
  }
  .back-top-fade-enter,
  .back-top-fade-leave-active {
    opacity: 0;
    transform: translateY(-30px);
  }
}

@media (max-width: 768px) {
  .page-component {
    .page-component__nav {
      position: static;
      width: 100%;
      margin-top: 0;
    }
    .side-nav {
      padding-top: 0;
      padding-left: 50px;
    }
    .page-component__content {
      padding-right: 10px;
      padding-left: 10px;
    }
    .content {
      padding-top: 0;
    }
    .content > table {
      display: block;
      overflow: auto;
    }
    .page-component-up {
      display: none;
    }
  }
}
</style>
<style lang="scss">
.page-component.page-container {
  .content {
    h3 {
      margin: 55px 0 20px;
    }

    table {
      width: 100%;
      margin-bottom: 45px;
      font-size: 14px;
      line-height: 1.5em;
      border-collapse: collapse;
      background-color: #fff;

      strong {
        font-weight: normal;
      }

      td,
      th {
        max-width: 250px;
        padding: 15px;
        border-bottom: 1px solid #dcdfe6;
      }

      th {
        font-weight: normal;
        color: #909399;
        text-align: left;
        white-space: nowrap;
      }

      td {
        color: #606266;
      }

      th:first-child,
      td:first-child {
        padding-left: 10px;
      }
    }

    ul:not(.timeline) {
      padding: 0 0 0 20px;
      margin: 10px 0;
      font-size: 14px;
      line-height: 2em;
      color: #5e6d82;
    }
  }
}
</style>
