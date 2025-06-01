# 用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值
a) 生成一个长度为5的空数组arr。

b) 生成一个（2－32）之间的随机整数rand。

c) 把随机数rand插入到数组arr内，如果数组arr内已存在与rand相同的数字，则重新生成随机数rand并插入到arr内[需要使用递归实现，不能使用for/while等循环]

d) 最终输出一个长度为5，且内容不重复的数组arr。

```javascript
var arr = new Array(5);
var num = randomNumber();
var i = 0;
randomArr(arr,num);
function randomArr(arr,num) {
  if (arr.indexOf(num)< 0){
    arr[i] = num;
    i++;
  } else {
    num = randomNumber();
  }
  if (i>=arr.length){
    console.log(arr);
    return;
  }else{
    randomArr(arr,num)
  }
}
function randomNumber() {
  return Math.floor(Math.random()*31 + 2)
}
```



# Javascript中null和undefined的区别？
+ **概念**：
    - undefined 是 JavaScript 的一种内置数据类型，表示变量声明了但未赋值。
    - null 是一种内置数据类型，表示一个空对象引用。
+ **两者区别 - 类型检测**：
    1. 使用 typeof 检测 undefined 会返回 "undefined"。
    2. 使用 typeof 检测 null 会返回 "object"，这是一个历史遗留问题。
+ **代码示例**：

```javascript
console.log(typeof undefined);
console.log(typeof null);
```

### 比较操作
1. `undefined` 和 `null` 使用双等号 `==` 比较时会被认为相等，因都代表“没有值”。
2. 使用严格等号 `===` 比较时，它们不相等，因是不同类型的值。
+ **代码示例**

```javascript
console.log(undefined == null);
console.log(undefined === null);
```

### 变量赋值
1. `undefined` 是 JavaScript 引擎自动赋予未赋值变量的值。
2. `null` 是开发者显式赋值以表示变量没有值。
+ **代码示例**

```javascript
let x;
let y = null;
```

# 什么是内存泄漏，前端开发容易产生内存泄漏的原因 ？    
**内存泄漏（Memory Leak）**是指程序在运行过程中动态分配的内存没有被正确释放，导致这部分内存在程序不再需要时仍然被占用，无法被重新利用。随着程序运行时间的增长，内存泄漏会逐渐消耗系统的可用内存，最终可能导致系统性能下降，甚至崩溃。

## 前端开发中容易产生内存泄漏的原因
在前端开发中，JavaScript 是一种基于事件驱动和垃圾回收机制的语言，但由于其特性，某些情况下仍然容易出现内存泄漏。以下是前端开发中常见的内存泄漏原因：

### 1. 全局变量未释放
+ 在 JavaScript 中，全局变量不会被垃圾回收器回收，除非页面关闭或刷新。如果开发者不小心将大量数据绑定到全局对象（如 window），这些数据将一直存在于内存中，直到页面关闭。
+ 解决方案：尽量避免使用全局变量，或者在不需要时手动将其设为 null 或删除。

### 2. 闭包（Closure）引起的内存泄漏
+ 闭包是一个函数及其捕获的外部作用域的引用。如果一个闭包引用了外部的大对象（如 DOM 元素、数组等），并且这个闭包长时间存在，那么它所引用的对象也无法被垃圾回收。
+ 解决方案：确保闭包只引用必要的变量，并在闭包不再需要时解除对大对象的引用。

### 3. DOM 事件监听器未移除
+ 当我们为 DOM 元素添加事件监听器时，如果没有在元素销毁时移除这些监听器，即使该元素已经从页面中移除，它仍然会被事件监听器引用，导致内存无法释放。
+ 解决方案：使用 removeEventListener 显式地移除事件监听器，或者使用框架提供的生命周期管理功能（如 React 的 useEffect 钩子）来自动处理。

### 4. 定时器未清理
+ 使用 setInterval 或 setTimeout 创建的定时器，如果在组件卸载或页面切换时没有及时清除，可能会导致定时器回调函数继续执行，进而保持对相关对象的引用。
+ 解决方案：在组件卸载或页面离开时，使用 clearInterval 或 clearTimeout 清除定时器。

### 5. 缓存未清理
+ 在前端开发中，缓存（如本地存储、缓存对象等）如果不及时清理，可能会导致大量数据长期驻留在内存中，尤其是在用户长时间不操作的情况下。
+ 解决方案：根据业务需求合理设置缓存的有效期，并在适当的时候清理缓存。

### 6. 内存中的大对象未释放
+ 如果前端应用中存在大量大对象（如图片、视频、文件等），并且这些对象没有在不再需要时及时释放，会导致内存占用过高。
+ 解决方案：在对象不再需要时，显式地将其设为 null，以便垃圾回收器可以回收它们。

### 7. 第三方库或插件问题
+ 某些第三方库或插件可能存在内存泄漏问题，尤其是在它们内部维护了大量的状态或监听器时。如果这些库没有提供良好的内存管理机制，可能会导致内存泄漏。
+ 解决方案：选择经过充分测试的库，并关注其版本更新，及时修复已知的内存泄漏问题。

## 如何检测内存泄漏？
1. Chrome DevTools：Chrome 提供了强大的内存分析工具，可以帮助开发者监控内存使用情况、查找内存泄漏点。通过“性能”、“内存”面板，可以查看内存快照、堆栈跟踪等信息。
2. Heap Profiling：通过 Chrome DevTools 的 Heap Profiling 功能，可以查看应用程序中对象的分配情况，找出哪些对象占用了过多的内存。
3. Memory Leaks Detection Libraries：一些第三方库（如 leak-detector）可以帮助自动检测内存泄漏，尤其适用于复杂的前端应用。

## 总结
内存泄漏是前端开发中常见的性能问题之一，尤其是在处理复杂的应用逻辑、大量数据和长生命周期的页面时。通过合理的设计和编码习惯，结合现代浏览器提供的调试工具，开发者可以有效避免和解决内存泄漏问题，提升应用的性能和稳定性。

# 浏览器渲染原理 ，回流，重绘的概念和原理 ？    
## 浏览器渲染原理
浏览器的渲染过程可以分为以下几个主要步骤：

1. HTML解析：浏览器从上到下解析HTML文档，构建DOM（Document Object Model）树。
2. CSS解析：浏览器解析CSS样式表，构建CSSOM（CSS Object Model）树。
3. 构建渲染树：将DOM树和CSSOM树结合起来，生成渲染树。渲染树只包含可见的元素（例如，display: none 的元素不会出现在渲染树中）。
4. 布局（Layout/Reflow）：计算每个节点在屏幕上的确切位置和尺寸。这个过程也称为“回流”或“重排”。
5. 绘制（Paint）：根据渲染树中的信息，将内容绘制到屏幕上。
6. 合成（Compositing）：如果页面中有多个图层（例如，使用了position: fixed、z-index等属性），浏览器会将这些图层合成最终的画面。

## 回流（Reflow）
定义：回流是指浏览器重新计算DOM元素的几何属性（如位置、大小等），并更新整个页面或部分页面的布局。回流是一个比较耗时的操作，因为它会影响到其他元素的位置和尺寸。  
触发条件：

+ 窗口大小发生变化（如调整浏览器窗口大小）。
+ DOM元素的内容发生变化（如文本内容、图片大小变化等）。
+ DOM元素的样式发生变化（如宽度、高度、字体大小等）。
+ 添加或删除可见的DOM元素。
+ 元素的布局发生变化（如浮动、定位等）。  
优化建议：
+ 尽量减少频繁触发回流的操作，比如批量修改样式而不是逐个修改。
+ 使用getComputedStyle()代替直接访问offsetWidth、offsetHeight等属性，以减少不必要的回流。
+ 将需要多次回流的操作放在documentFragment中完成后再插入DOM。

## 重绘（Repaint）
定义：重绘是指当页面上某些元素的外观发生改变但不涉及布局变化时，浏览器重新绘制这些元素的过程。例如，改变元素的颜色、背景色等样式属性会触发重绘。  
触发条件：

+ 改变元素的可见性（如visibility属性）。
+ 改变元素的颜色、背景色等视觉属性。
+ 动画效果（如渐变、透明度变化等）。  
优化建议：
+ 尽量减少重绘操作，尤其是在动画或频繁更新的场景中。
+ 使用GPU加速的属性（如transform、opacity）来替代会触发重绘的属性。
+ 使用will-change属性提前告知浏览器哪些元素可能会发生变化，从而让浏览器提前优化。

## 总结
+ 回流：涉及布局变化的操作，影响较大，尽量减少。
+ 重绘：仅涉及视觉变化的操作，影响较小，但仍需注意性能问题。
+ 优化策略：尽量减少回流和重绘的频率，合理利用浏览器的优化机制（如GPU加速、will-change等）。  
通过理解这些概念，开发者可以在编写代码时更有效地优化页面性能，提升用户体验。

# HTML Meta 属性常用文档

## 概述
HTML `<meta>` 标签提供了关于HTML文档的元数据(metadata)，这些元数据不会显示在页面上，但对机器(如浏览器、搜索引擎等)是可读的。它通常用于指定页面描述、关键词、文档作者、最后修改时间以及其他元数据。

## 基本语法
```html
<meta name="属性名称" content="属性值">
<!-- 或 -->
<meta http-equiv="属性名称" content="属性值">
<!-- 或 -->
<meta charset="字符编码">
```

## 常用Meta属性

### 1. 字符编码声明
```html
<meta charset="UTF-8">
```
- 定义文档的字符编码
- 应该放在`<head>`的最前面

### 2. 视口设置 (响应式设计必备)
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- `width=device-width`: 宽度等于设备宽度
- `initial-scale=1.0`: 初始缩放比例为1
- 其他可选值: `maximum-scale`, `minimum-scale`, `user-scalable`

### 3. 页面描述
```html
<meta name="description" content="这是一个关于HTML meta标签的详细文档">
```
- 提供网页内容的简短描述
- 搜索引擎常将此内容显示在搜索结果中

### 4. 关键词 (SEO)
```html
<meta name="keywords" content="HTML, meta标签, SEO, 元数据">
```
- 为搜索引擎提供关键词
- 现代搜索引擎对此属性的重视度已降低

### 5. 作者信息
```html
<meta name="author" content="作者姓名">
```

### 6. 版权信息
```html
<meta name="copyright" content="公司名称">
```

### 7. 搜索引擎索引控制
```html
<meta name="robots" content="index, follow">
<!-- 其他常用值 -->
<meta name="robots" content="noindex, nofollow">
```
- `index/noindex`: 是否允许索引此页面
- `follow/nofollow`: 是否跟踪页面上的链接

### 8. 重定向 (http-equiv)
```html
<meta http-equiv="refresh" content="5; url=https://example.com">
```
- 5秒后跳转到指定URL
- 不推荐使用，应改用服务器端重定向

### 9. 兼容性模式 (IE)
```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```
- 强制IE使用最新渲染引擎

### 10. 主题颜色
```html
<meta name="theme-color" content="#ffffff">
```
- 定义浏览器地址栏或PWA应用的主题颜色

### 11. 移动端相关
```html
<!-- 禁止将电话号码识别为链接 -->
<meta name="format-detection" content="telephone=no">

<!-- 禁止将邮箱识别为链接 -->
<meta name="format-detection" content="email=no">

<!-- 禁止将地址识别为地图链接 -->
<meta name="format-detection" content="address=no">
```

### 12. 社交媒体 (Open Graph)
```html
<!-- Facebook/Open Graph -->
<meta property="og:title" content="页面标题">
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:description" content="页面描述">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@twitter账号">
<meta name="twitter:title" content="页面标题">
<meta name="twitter:description" content="页面描述">
<meta name="twitter:image" content="https://example.com/image.jpg">
```

## 最佳实践
1. 必须包含`charset`和`viewport`
2. 推荐包含`description`和`theme-color`
3. 根据需要使用社交媒体meta标签
4. 避免使用`http-equiv="refresh"`进行重定向
5. 保持meta内容简洁准确

## 示例模板
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="页面描述内容">
    <meta name="keywords" content="关键词1, 关键词2">
    <meta name="author" content="作者名">
    <meta name="theme-color" content="#ffffff">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://example.com/">
    <meta property="og:title" content="页面标题">
    <meta property="og:description" content="页面描述">
    <meta property="og:image" content="https://example.com/image.jpg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://example.com/">
    <meta property="twitter:title" content="页面标题">
    <meta property="twitter:description" content="页面描述">
    <meta property="twitter:image" content="https://example.com/image.jpg">
    
    <title>页面标题</title>
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>
```

# img标签中srcset属性的作用

`img`标签中的`srcset`属性是响应式图片加载的核心功能，具有以下作用：

## 基本功能

- **提供多个图片源**：允许为同一图片提供多个不同尺寸或分辨率的版本
- **自动选择合适图片**：浏览器根据设备特性（屏幕宽度、像素密度等）自动选择最合适的图片
- **无需JavaScript**：整个图片选择过程不需要JavaScript介入，由浏览器原生支持

## 描述符类型

`srcset`支持两种图片描述符：

### 1. 像素密度描述符 (x描述符)

```markdown
<img src="基本图片.jpg" 
     srcset="基本图片.jpg 1x, 高清图片.jpg 2x, 超清图片.jpg 3x" 
     alt="图片描述">
```

- 适用于固定尺寸的图片
- `1x`表示标准显示屏，`2x`表示像素密度为标准的2倍（如Retina屏幕）
- 未指定时默认为`1x`

### 2. 宽度描述符 (w描述符)

```markdown
<img src="小图.jpg" 
     srcset="小图.jpg 500w, 中图.jpg 1000w, 大图.jpg 1500w" 
     sizes="(max-width: 600px) 500px, (max-width: 1200px) 1000px, 1500px" 
     alt="图片描述">
```

- 指定图片的实际宽度（像素）
- 通常搭配`sizes`属性使用，指定图片在不同视口宽度下的显示尺寸
- 浏览器通过计算哪个图片最接近所需显示尺寸来选择合适的图片

## 性能优势

- **减少带宽使用**：小屏幕或低像素密度设备可加载较小图片
- **提高加载速度**：避免加载过大不必要的图片资源
- **提升视觉体验**：高分辨率屏幕可以显示更清晰的图片

## 实际应用示例

```markdown
<!-- 电子商务网站产品图片 -->
<img src="product-thumbnail.jpg"
     srcset="product-thumbnail.jpg 300w,
             product-medium.jpg 600w,
             product-large.jpg 1200w"
     sizes="(max-width: 768px) 100vw, 50vw"
     alt="产品展示图">
```

当与`<picture>`元素结合使用时，能实现更复杂的响应式图片方案，包括不同设备、不同方向和不同图片格式的适配。

# `==` 操作符的强制类型转换规则
在 JavaScript 中，`==`（宽松相等）操作符会在比较两个值时进行隐式类型转换（强制类型转换）。以下是其转换规则：

---

## **1. 类型相同的情况**
如果两个操作数的类型相同，直接比较值：
```javascript
5 == 5      // true
"hello" == "hello"  // true
```

---

## **2. 类型不同的情况**
### **规则 1：`null` 和 `undefined`**
- `null` 和 `undefined` 在 `==` 比较时返回 `true`，且不与其他值相等。
```javascript
null == undefined   // true
null == 0           // false
undefined == false  // false
```

### **规则 2：数字（Number） vs 字符串（String）**
- 字符串会被转换为数字再比较。
```javascript
5 == "5"    // true（"5" → 5）
"1" == 1    // true
"" == 0     // true（"" → 0）
```

### **规则 3：布尔值（Boolean） vs 其他类型**
- 布尔值会先转换为数字（`true → 1`，`false → 0`），再进行比较。
```javascript
true == 1     // true（true → 1）
false == 0    // true（false → 0）
true == "1"   // true（true → 1, "1" → 1）
false == ""   // true（false → 0, "" → 0）
```

### **规则 4：对象（Object） vs 原始类型**
- 对象会调用 `valueOf()` 或 `toString()` 转换为原始值，再进行比较。
```javascript
[1] == 1     // true（[1].toString() → "1" → 1）
[] == 0      // true（[].toString() → "" → 0）
{} == "[object Object]"  // true（{}.toString() → "[object Object]"）
```

### **规则 5：特殊案例**
- `NaN` 与任何值（包括自身）比较都返回 `false`。
```javascript
NaN == NaN   // false
```

---

## **总结表**
| 比较示例              | 转换规则                          | 结果   |
|-----------------------|-----------------------------------|--------|
| `5 == "5"`            | 字符串转数字                      | `true` |
| `true == 1`           | 布尔值转数字                      | `true` |
| `null == undefined`   | 仅两者相等                        | `true` |
| `[] == 0`             | 对象转原始值（`"" → 0`）          | `true` |
| `NaN == NaN`          | `NaN` 不等于任何值                | `false`|

---

## **注意事项**
1. **避免使用 `==`**：  
   由于隐式类型转换可能导致意外结果，推荐使用 `===`（严格相等）来避免潜在问题。
2. **显式转换更安全**：  
   如果需要类型转换，建议使用 `Number()`、`String()` 等显式方法。

```javascript
// 显式转换示例
Number("5") === 5   // true
String(5) === "5"   // true
```

# isNaN 和 Number.isNaN 函数的区别

## 主要区别
`isNaN()` 和 `Number.isNaN()` 都用于检测值是否为 NaN，但它们的工作方式有显著差异：

### **isNaN()**
- 全局函数，ES1 引入
- **会先尝试将参数转换为数字**，然后再判断是否为 NaN
- 对于无法转换为数字的值，返回 `true`

### **Number.isNaN()**
- Number 对象的静态方法，ES6 引入
- **不会进行类型转换**，只有当参数是真正的 NaN 值时才返回 `true`
- 更精确，避免了 `isNaN()` 的误判

## 代码对比
以下是 `isNaN` 和 `Number.isNaN` 的代码对比示例，展示了它们在不同输入下的行为差异：

```javascript
// ========== 测试用例 ==========
const testValues = [
  NaN,          // 真正的 NaN
  "NaN",        // 字符串 "NaN"
  "123",        // 可转换为数字的字符串
  "Hello",      // 不可转换为数字的字符串
  123,          // 数字
  undefined,    // undefined
  {},           // 空对象
  [1, 2, 3]     // 数组
];

// ========== 测试函数 ==========
function testNaNCheck(value) {
  return {
    value: value,
    isNaN: isNaN(value),
    NumberIsNaN: Number.isNaN(value)
  };
}

// ========== 执行测试 ==========
const results = testValues.map(testNaNCheck);

// ========== 输出结果 ==========
console.table(results);
```

---

### **输出结果示例**
| 输入值       | `isNaN()` 结果 | `Number.isNaN()` 结果 | 说明                                                                 |
|--------------|----------------|-----------------------|----------------------------------------------------------------------|
| `NaN`        | `true`         | `true`                | 唯一被 `Number.isNaN` 认定为 `true` 的情况。                        |
| `"NaN"`      | `true`         | `false`               | `isNaN` 会尝试转换字符串为数字（失败后返回 `true`）。               |
| `"123"`      | `false`        | `false`               | 字符串可转换为数字，两者均返回 `false`。                            |
| `"Hello"`    | `true`         | `false`               | `isNaN` 因转换失败返回 `true`，`Number.isNaN` 严格检查。            |
| `123`        | `false`        | `false`               | 数字类型，两者均返回 `false`。                                      |
| `undefined`  | `true`         | `false`               | `isNaN` 将 `undefined` 转换为 `NaN`，`Number.isNaN` 不转换。        |
| `{}`         | `true`         | `false`               | `isNaN` 将对象转换为字符串再尝试转换数字（失败后返回 `true`）。     |
| `[1, 2, 3]`  | `true`         | `false`               | `isNaN` 将数组转换为字符串（如 `"1,2,3"`），转换失败返回 `true`。   |

---

### **关键区别总结**
1. **类型转换行为**：
   - `isNaN()`：先尝试将参数转换为数字，再判断是否为 `NaN`。
   - `Number.isNaN()`：不进行类型转换，仅当参数是 `NaN` 时返回 `true`。

2. **使用建议**：
   - 如果需要检测**真正的 `NaN`**（如数学计算错误），使用 `Number.isNaN()`。
   - 如果需要检测**不可转换为数字的值**（如用户输入验证），使用 `isNaN()`（但需注意其潜在问题）。

3. **ES6 最佳实践**：
   ```javascript
   // 更安全的替代方案：先检查类型，再使用 `Number.isNaN`
   function isActuallyNaN(value) {
     return typeof value === "number" && Number.isNaN(value);
   }
   ```


# `Object.assign` 和对象扩展运算符的区别

## **1. 基本区别**
| 特性                | `Object.assign`              | 对象扩展运算符 (`...`)       |
|---------------------|-----------------------------|-----------------------------|
| **语法**            | `Object.assign(target, ...sources)` | `const newObj = { ...obj }` |
| **来源**            | ES6                          | ES2018 (ES9)                |
| **返回值**          | 修改后的 `target` 对象        | 新对象                      |
| **原型链属性**      | 不复制原型链上的属性          | 不复制原型链上的属性         |

---

## **2. 共同点**
- **都是浅拷贝**：  
  两者只会复制对象的**可枚举自有属性**（非继承属性），且对于嵌套对象或数组，复制的是引用而非值。

---

## **3. 关键差异**
### **(1) 合并多个对象**
- `Object.assign` 可以一次性合并多个对象到目标对象：
  ```javascript
  const merged = Object.assign({}, obj1, obj2, obj3);
  ```
- 扩展运算符需要嵌套使用：
  ```javascript
  const merged = { ...obj1, ...obj2, ...obj3 };
  ```

### **(2) 默认值处理**
- `Object.assign` 会覆盖同名属性（后面的覆盖前面的）：
  ```javascript
  const result = Object.assign({ a: 1 }, { a: 2 }); // { a: 2 }
  ```
- 扩展运算符可以更直观地设置默认值：
  ```javascript
  const result = { a: 1, ...{ a: 2 } }; // { a: 2 }
  ```

### **(3) 对 `null` 或 `undefined` 的处理**
- `Object.assign` 会忽略 `null` 和 `undefined` 源对象：
  ```javascript
  Object.assign({}, null, undefined); // {}
  ```
- 扩展运算符会报错：
  ```javascript
  { ...null }; // TypeError
  ```

---

## **4. 浅拷贝验证**
两者均为浅拷贝，嵌套对象会共享引用：
```javascript
const obj = { a: 1, nested: { b: 2 } };
const copy1 = Object.assign({}, obj);
const copy2 = { ...obj };

obj.nested.b = 3;
console.log(copy1.nested.b); // 3（被修改）
console.log(copy2.nested.b); // 3（被修改）
```

---

## **5. 如何实现深拷贝？**
- **手动递归**：遍历对象的所有层级。
- **`JSON.parse(JSON.stringify(obj))`**：  
  局限性：忽略函数、`Symbol`、`undefined` 和循环引用。
- **第三方库**：如 Lodash 的 `_.cloneDeep`。

```javascript
// 深拷贝示例
const deepCopy = JSON.parse(JSON.stringify(obj));
```

---

## **总结**
| **场景**               | **推荐方式**                |
|------------------------|----------------------------|
| 简单合并对象           | 扩展运算符 (`...`)          |
| 需要兼容旧环境         | `Object.assign`             |
| 需要深拷贝             | `JSON.parse(JSON.stringify)` 或 Lodash |
| 处理 `null`/`undefined` | `Object.assign`（更安全）   |

**优先使用扩展运算符**（语法更简洁），但需注意其浅拷贝特性！  




















