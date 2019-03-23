<template>
  <div id="app" class="is-component">
    <main-header></main-header>
    <div class="main-cnt">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/color-brewer.css'

export default {
  name: 'app',

  computed: {},
  methods: {}
}
</script>

<style lang="scss">
@import 'assets/styles/common.scss';
@include b(body) {
  color: $--color-primary;
}
</style>
