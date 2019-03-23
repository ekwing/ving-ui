<template>
  <div class="page-changelog">
    <div class="heading">
      更新日志
    </div>
    <ul ref="timeline" class="timeline"></ul>
    <ChangeLog ref="changeLog"></ChangeLog>
  </div>
</template>
<script>
import ChangeLog from '../../CHANGELOG.md'

export default {
  components: {
    ChangeLog
  },
  mounted() {
    /****************** release关联 ******************/
    const changeLog = this.$refs.changeLog
    const changeLogNodes = changeLog.$el.children
    let a = changeLogNodes[1].querySelector('a')
    a && a.remove()
    let release = changeLogNodes[1].textContent.trim()
    let fragments = `<li><h3><a href="https://github.com/ElemeFE/element/releases/tag/v${release}" target="_blank">${release}</a></h3>`

    for (let len = changeLogNodes.length, i = 2; i < len; i++) {
      let node = changeLogNodes[i]
      a = changeLogNodes[i].querySelector('a')
      a && a.getAttribute('class') === 'header-anchor' && a.remove()
      if (node.tagName !== 'H3') {
        fragments += changeLogNodes[i].outerHTML
      } else {
        release = changeLogNodes[i].textContent.trim()
        fragments += `</li><li><h3><a href="https://github.com/ElemeFE/element/releases/tag/v${release}" target="_blank">${release}</a></h3>`
      }
    }
    /***********************************************/
    // issue 关联
    fragments = fragments.replace(
      /#(\d+)/g,
      '<a href="https://github.com/ElemeFE/element/issues/$1" target="_blank">#$1</a>'
    )
    // author 关联
    fragments = fragments.replace(/@(\w+)/g, '<a href="https://github.com/$1" target="_blank">@$1</a>')
    this.$refs.timeline.innerHTML = `${fragments}</li>`

    changeLog.$el.remove()
  }
}
</script>
<style lang="scss" scoped>
.page-changelog {
  padding-bottom: 100px;

  .heading {
    margin-bottom: 60px;
    font-size: 24px;
    color: #333;
  }

  .timeline {
    position: relative;
    padding: 0;
    padding-bottom: 10px;
    color: #5e6d82;
  }
}
</style>
<style lang="scss">
/* stylelint-disable no-descending-specificity */
.page-changelog {
  .timeline {
    > li {
      position: relative;
      padding-bottom: 15px;
      line-height: 1.8;
      list-style: none;
      border: 1px solid #ddd;
      border-radius: 4px;

      &:not(:last-child) {
        margin-bottom: 50px;
      }
    }
    ul {
      padding: 30px 30px 15px;

      ul {
        padding: 0;
        padding-top: 5px;
        padding-left: 27px;

        li {
          padding-left: 0;
          color: #555;
          word-break: normal;
        }

        li::before {
          display: inline-block;
          margin-right: -12px;
          vertical-align: middle;
          content: '';
          border: solid 1px #333;
        }
      }
    }

    li li {
      padding-bottom: 5px;
      padding-left: 20px;
      font-size: 16px;
      color: #333;
      word-break: break-all;
      list-style: none;

      &::before {
        display: inline-block;
        vertical-align: middle;
        content: '';
        transform: translateX(-20px);
      }
    }

    i {
      display: inline-block;
      padding: 0 20px;
    }

    h3 {
      padding: 15px 30px;
      margin: 0;
      font-size: 20px;
      font-weight: bold;
      color: #333;
      border-bottom: 1px solid #ddd;

      a {
        float: none;
        margin-left: 0;
        font-size: 20px;
        color: #333;
        opacity: 1;
      }
    }

    h4 {
      padding-top: 30px;
      padding-left: 54px;
      margin: 0;
      margin-bottom: -10px;
      font-size: 18px;
      font-weight: bold;
    }

    p {
      margin: 0;
    }

    em {
      position: absolute;
      top: 23px;
      right: 30px;
      font-size: 16px;
      font-style: normal;
      color: #666;
    }
  }
}
</style>
