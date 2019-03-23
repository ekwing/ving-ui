## Button 按钮

常用的操作按钮。

### 按钮种类

:::demo 使用`plain`、`round`、`circle`来定义Button样式。

```html
<ek-button>默认按钮</ek-button>&nbsp;
<ek-button plain>plain按钮</ek-button>&nbsp;
<ek-button round>round按钮</ek-button>&nbsp;
<ek-button circle>circle</ek-button>
```
:::

### 不同大小的按钮
:::demo 使用`size`定义Button大小。

```html
<ek-button round>default</ek-button>&nbsp;
<ek-button size="medium" round>medium</ek-button>&nbsp;
<ek-button size="small" round>small</ek-button>&nbsp;
<ek-button size="mini" round>mini</ek-button>
```
:::

### 自定义样式

:::demo Button可以直接使用 `style` 或 `class` 改变样式。
```html
<ek-button>default</ek-button>&nbsp;
<ek-button style="background-color:orange;">改变颜色</ek-button>&nbsp;
<ek-button style="width:300px" round>拉长</ek-button>&nbsp;
<ek-button style="width:70px;height:70px;" circle>circle</ek-button>
```
:::

### 使用icon

:::demo 可以icon选项加入icon，也可以直接写在button中，用`i`标签包括即可。
```html
<ek-button icon="iconfont ek-icon-loading" circle>
</ek-button>&nbsp;
<ek-button icon="iconfont ek-icon-loading" round>
  loading
</ek-button>&nbsp;
<ek-button round>
  loading<i class="iconfont ek-icon-loading ek-icon--right"></i>
</ek-button>&nbsp;
```
:::

### 禁用状态

:::demo 使用disabled禁用按钮。
```html
<ek-button disabled>default</ek-button>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   medium / small / mini   |    —     |
| plain     | 是否朴素按钮   | boolean    | — | false   |
| round     | 是否圆角按钮   | boolean    | — | false   |
| circle     | 是否圆形按钮   | boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| autofocus  | 是否默认聚焦 | boolean   |  —  |  false  |
| native-type | 原生 type 属性 | string | button / submit / reset | button |
