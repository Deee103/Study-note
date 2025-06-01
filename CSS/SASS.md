# Sass 基础语法笔记

## 一、Sass 简介

Sass (Syntactically Awesome Style Sheets) 是一种 CSS 预处理器，它扩展了 CSS 的功能，提供了变量、嵌套、混合等特性，最终编译为标准 CSS。

### Sass 与 SCSS

- **Sass 语法**：使用缩进格式，文件扩展名为 `.sass`
- **SCSS 语法**：CSS 的超集，使用大括号，文件扩展名为 `.scss`（更常用）

## 二、基础语法

### 1. 变量

```scss
// 定义变量
$primary-color: #3498db;
$font-stack: Helvetica, sans-serif;
$border-radius: 4px;

// 使用变量
body {
  font-family: $font-stack;
  color: $primary-color;
}

.button {
  border-radius: $border-radius;
  background: $primary-color;
}
```

### 2. 嵌套规则

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: inline-block;

      a {
        text-decoration: none;
        &:hover {  // & 表示父选择器
          text-decoration: underline;
        }
      }
    }
  }

  // 属性嵌套
  font: {
    family: $font-stack;
    size: 18px;
    weight: bold;
  }
}
```

### 3. 混合 (Mixins)

```scss
// 定义混合
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

// 使用混合
.button {
  @include border-radius(10px);
}

.box {
  @include border-radius(5px);
}
```

### 4. 继承/扩展 (Extend)

```scss
// 基础样式
%button-base {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

// 继承基础样式
.primary-button {
  @extend %button-base;
  background: $primary-color;
  color: white;
}

.secondary-button {
  @extend %button-base;
  background: #e0e0e0;
}
```

### 5. 运算

```scss
.container {
  width: 100%;
}

.article {
  float: left;
  width: 600px / 960px * 100%;
}

.aside {
  float: right;
  width: 300px / 960px * 100%;
}

$base-margin: 10px;
.box {
  margin: $base-margin ($base-margin * 2) ($base-margin + 5px);
}
```

### 6. 条件语句

```scss
@mixin text-effect($val) {
  @if $val == danger {
    color: red;
  } @else if $val == alert {
    color: yellow;
  } @else if $val == success {
    color: green;
  } @else {
    color: black;
  }
}
```

### 7. 循环

#### for 循环
```scss
@for $i from 1 through 5 {
  .col-#{$i} {
    width: 100% / 6 * $i;
    float: left;
  }
}
```

#### each 循环
```scss
$colors: (primary: #3498db, success: #2ecc71, danger: #e74c3c);

@each $key, $value in $colors {
  .text-#{$key} {
    color: $value;
  }
}
```

#### while 循环
```scss
$i: 1;
@while $i < 6 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i + 1;
}
```

### 8. 函数

```scss
@function grid-width($n) {
  @return $n * 120px;
}

.grid {
  width: grid-width(5);
}
```

### 9. 导入 (@import)

```scss
// _variables.scss (下划线表示这是部分文件，不会被编译为单独CSS)
$primary-color: #3498db;

// main.scss
@import 'variables';  // 导入时不写下划线和扩展名

body {
  color: $primary-color;
}
```

### 10. 注释

```scss
// 这种注释不会出现在编译后的CSS中

/* 这种注释会出现在编译后的CSS中 */

/*!
  重要注释，即使是压缩模式也会保留
*/
```

## 三、实用技巧

### 1. 颜色函数

```scss
$base-color: #036;

.header {
  background-color: lighten($base-color, 10%);
  color: darken($base-color, 20%);
  border-color: rgba($base-color, 0.5);
}

.btn {
  background: complement($base-color);
}
```

### 2. 媒体查询嵌套

```scss
.sidebar {
  width: 300px;

  @media screen and (max-width: 768px) {
    width: 100px;
  }

  @media screen and (max-width: 480px) {
    width: 50px;
  }
}
```

### 3. 占位选择器

```scss
%clearfix {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

.container {
  @extend %clearfix;
}
```

## 四、Sass 文件组织结构

```
sass/
|
|– abstracts/
|   |– _variables.scss    // Sass变量
|   |– _functions.scss    // Sass函数
|   |– _mixins.scss       // Sass混合
|
|– base/
|   |– _reset.scss        // 重置和规范化
|   |– _typography.scss   // 排版规则
|
|– components/
|   |– _buttons.scss      // 按钮
|   |– _cards.scss        // 卡片
|
|– layout/
|   |– _header.scss       // 页眉
|   |– _footer.scss       // 页脚
|   |– _sidebar.scss      // 侧边栏
|
|– pages/
|   |– _home.scss         // 首页样式
|   |– _about.scss        // 关于页样式
|
|– themes/
|   |– _theme.scss        // 主题相关
|   |– _admin.scss        // 管理后台主题
|
|– vendors/
|   |– _bootstrap.scss    // Bootstrap覆盖
|
`– main.scss              // 主Sass文件
```

## 五、编译Sass

### 1. 使用命令行
```bash
sass input.scss output.css
```

### 2. 监视文件变化
```bash
sass --watch input.scss:output.css
```

### 3. 压缩输出
```bash
sass --style compressed input.scss output.css
```

掌握这些基础语法后，您可以更高效地编写和维护样式代码，提高CSS的可维护性和复用性。