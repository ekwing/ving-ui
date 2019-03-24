## 快速上手

本节将介绍如何在项目中使用组件库。

### 安装

```bash
npm install @ek/ving-ui
```
关于内部npm的使用参照 [这里](http://172.17.20.21:3999/web/#/6.6%20%E7%A7%81%E6%9C%89npm)。

### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import EkAppUI from '@ek/ving-ui';
import App from './App.vue';

Vue.use(EkAppUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

样式文件不需要单独引入。

### 按需引入

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

然后，在 .babelrc 或者 babel.config.js 设置插件和参数，以及 preset 的 modules 设为 false。（vue-cli使用的 `@vue/app`预设已经设置好modules了。）

```json
{
  "presets": [["env", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "@ek/ving-ui",
        "style": false
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import { Button } from 'ving-ui';
import App from './App.vue';

Vue.component(Button.name, Button);
/* 或写为
 * Vue.use(Button)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

:::tip
组件的名字始终会以 `Vn` 为前缀，比如，Button组件的名字是 `VnButton`。
:::
