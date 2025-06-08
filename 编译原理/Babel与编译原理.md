
# 【**初中级**】Babel 有了解过吗，请说说 Babel 的基础使用和原理？

Babel 是一个广泛使用的 JavaScript 编译器，它的主要用途是将 ES6+ 等更新版本的 JavaScript 代码转换为 ES5 或者更低版本的代码，从而确保代码可以在更多的浏览器和环境中运行。Babel 的强大之处在于它的插件和预设（presets）机制，通过配置不同的插件，开发者可以有针对性地处理某些语法特性。

Babel 可以根据项目的需要选择性地进行语法转换，比如将箭头函数转换成普通函数、将新的语法糖转译成老版本支持的语法等。

## Babel 的基础使用
### 项目结构及示例代码

为了说明 Babel 的基础使用，我们以一个简单的项目为例。该项目使用箭头函数的语法，但目标环境不支持，因此我们使用 Babel 将箭头函数转换为普通函数。

目录结构如下：
![{B4E81700-5E09-45D8-B728-02A103565CFE}.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608195353186.png)

### `package.json` 文件
![{F525D102-F6AE-4503-A6EC-C3979A330B99}.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608195924259.png)

在 `package.json` 中，我们定义了一个 `build` 脚本，命令是 `babel src --out-dir dist`，表示 Babel 将对 `src` 目录中的文件进行编译，并将结果输出到 `dist` 目录中。

`devDependencies` 中列出了我们需要的依赖项，包括 Babel 核心库、CLI 工具、插件和预设。

### `babel.config.js` 文件
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608200534425.png)

在 Babel 配置文件中，我们指定了使用 `@babel/plugin-transform-arrow-functions` 插件，它的作用是将箭头函数转换为普通的函数表达式。

虽然常见的 `@babel/preset-env` 预设可以处理各种语法转换，但为了演示插件机制，我们在这里只使用了单一的插件来处理箭头函数的转换。

### `src/index.js` 文件
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608200615258.png)

这个文件使用了 ES6 的箭头函数语法，目的是展示如何通过 Babel 将其转换为 ES5 语法。

### 运行 Babel 进行转换

在项目的根目录下，运行以下命令来安装依赖：
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608200710538.png)

安装完成后，可以使用如下命令来运行 Babel 进行编译：
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608200715652.png)

此时，Babel 会读取 `src/index.js` 文件，并根据 `babel.config.js` 的配置将箭头函数转换为普通函数，生成的文件会输出到 `dist/index.js` 文件中。

### 编译后的代码

编译后的代码 `dist/index.js` 会是如下形式：
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608200734689.png)

可以看到，箭头函数 `() => {}` 被转换成了传统的匿名函数 `function () {}`。
## Babel 原理

### Babel 的插件与预设

Babel 本身只是一个编译器，它不会自动转译代码，转译的工作是由插件和预设完成的。每个 Babel 插件负责处理特定的语法或语言特性，比如箭头函数、模板字符串、解构赋值等。

* **插件（Plugins）**：用于处理特定的语法转换，如 `@babel/plugin-transform-arrow-functions` 只处理箭头函数的转换。
* **预设（Presets）**：预设是一组插件的集合，比如 `@babel/preset-env` 是一个非常常用的预设，它包含了许多插件，可以将现代的 JavaScript 语法转译为目标环境支持的语法。

在我们的示例中，我们仅使用了 `@babel/plugin-transform-arrow-functions` 插件，因此 Babel 只会处理箭头函数的转换。

### 转换过程

Babel 的代码转换过程可以分为三个阶段：

* **解析（Parsing）**：Babel 首先将代码解析成抽象语法树（AST），这个过程类似于浏览器的 JavaScript 引擎解析代码的方式。
* **转换（Transformation）**：根据插件和预设的配置，Babel 会对 AST 进行遍历并修改，将不兼容的语法转换为兼容的语法。
* **生成（Generation）**：最终，Babel 将修改后的 AST 重新生成为 JavaScript 代码。

以箭头函数的转换为例，Babel 首先识别出箭头函数的语法节点，然后通过插件将其转换为等价的普通函数表达式，最后输出转换后的代码。

### Babel 和 Polyfill

需要注意的是，Babel 只能转译语法，它不会为新 API 提供 Polyfill。例如，ES6 的 `Promise`、`Map` 等 API 无法通过 Babel 转换。如果需要支持这些 API，需要配合 `core-js` 或 `regenerator-runtime` 等库来实现 Polyfill。
## 拓展

当下，babel 依然不是最受欢迎的前端编译器，目前市面上还有很多比 babel 性能更好的编译器，比如：

* Esbuild
* swc
* oxc
我们可以选择更合适的编译器进行模块编译，这里需要提示一下，在大厂，前端工具链的重构也是一个不错的方向，例如 go 语言写的 esbuild 性能得到了很大提升，再例如基于 rust 的 swc 性能更胜一筹，这些是由底层实现语言特性决定的。

# 【**中高级**】有没有了解过编译原理，了解过编译器的底层实现吗？

编译原理是计算机科学中的一个重要领域，主要研究如何将高级编程语言的源代码转换为机器能理解的目标代码（通常是二进制代码或中间代码）。编译器的底层实现通常包含多个阶段，包括词法分析、语法分析、语义分析和代码生成。我们将通过详细说明这些阶段，并提供代码示例和流程图来帮助理解编译器的工作原理。
编译的使用场景非常多，比如：
* 前端资源构建与编译
* 多端框架编译时处理
* 飞书表格公式运行时编译&执行器实现
![](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608195246662.png)
## 编译过程概述

> 我们的需求是：将 `let x = 10 + 20` 转为 ` var x = 10 + 20`
编译过程分为以下几个步骤：
1. **词法分析**：将源代码 `let x = 10 + 20` 分析为词法单元（Token）。
2. **语法分析**：根据词法单元构建出抽象语法树（AST）。
3. **语义分析**：检查语义，确认变量声明和作用域，确保代码逻辑的正确性。
4. **代码生成**：将 AST 转换为目标代码，将 `let` 转换为 `var`。
## 词法分析（Lexical Analysis）

词法分析是编译器的第一个阶段，它负责将源代码转换为**词法单元流**（Token Stream）。每个词法单元（Token）表示源代码中的一个最小元素，例如变量名、关键字、操作符、数字等。词法分析器会根据语言的定义来识别这些词法单元。
以下是一个简单的 JavaScript 词法分析器（lexer）的实现，它将源代码转换为词法单元流。
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608200947398.png)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608200959001.png)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201124139.png)
对于输入 `"let x = 10 + 20"`，词法分析器将输出如下的词法单元流：
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201138917.png)

## 语法分析（Parsing）

语法分析的任务是将词法单元流转换成**抽象语法树**（AST）。抽象语法树是编译器的核心数据结构，它以树的形式表达了代码的结构。语法分析器会根据语言的语法规则解析词法单元流，并构建出符合语言规范的 AST。

以下是一个简单的语法分析器，它将词法单元流转换为 AST。
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201302097.png)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201310719.png)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201326243.png)

语法分析器将生成以下 AST：
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201334411.png)

## 语义分析（Semantic Analysis）

语义分析在 AST 的基础上进行，负责检查代码的正确性和安全性。例如，进行类型检查、作用域检查、变量声明的合法性等。语义分析确保代码不仅符合语法规则，还要保证程序在逻辑上是正确的。

以下是一个简单的语义分析器，它会检查变量是否已经声明，并抛出错误：
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201341433.png)

## 代码生成（Code Generation）

代码生成是编译器的最后一个阶段，它将经过语法和语义分析后的 AST 转换为目标代码。这个过程可以包括代码优化、生成中间代码（如字节码）、以及生成可执行的目标代码。
以下是一个简单的代码生成器，它将 AST 转换为 JavaScript 代码字符串：
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201350206.png)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201354749.png)

## 编译器整体流程图
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201402390.png)


## 总结

编译器的底层实现通常包括词法分析、语法分析、语义分析和代码生成四个主要阶段。词法分析器将源代码转换为词法单元流，语法分析器将这些词法单元转换为抽象语法树，语义分析器在 AST 上执行类型检查和作用域检查，最后代码生成器将 AST 转换为目标代码。

# 【**专家级**】从零到一架构实现一个类似飞书表格公式字段编译执行器，请简要说说你的设计思路

在构建一个类似于飞书表格中公式字段的编译执行器时，我们需要从如何设计公式编辑器到公式的解析和执行这几个关键点进行详细的设计与实现。主要涉及以下几个方面：
1. 公式编辑器的实现原理和功能。
2. 编译执行器的架构，包括词法分析、语法分析、语义分析及执行过程。
3) 使用 `monaco-editor` 实现语法高亮和编辑功能。
## 公式编辑器的实现原理
### 公式编辑器设计思路

在表格应用中，用户通常会编写类似 `=SUM(A1:B2)` 或 `=A1 + B1 * 2` 这样的公式。公式编辑器需要具备以下功能：
* 支持用户输入常见的算术操作（如加减乘除等）。
* 支持函数调用（如 `SUM()`、`IF()`）。
* 实时反馈错误信息（如括号不匹配或未知函数）。
* 提供自动补全、语法高亮功能，增强用户体验。
### 核心功能
* **Tokenize**：将用户输入的公式拆分为词法单元（token）。
* **Parse**：将词法单元解析为抽象语法树（AST），以便进一步分析和执行。
* **Interpret**：遍历语法树，并结合上下文（表格中的数据）执行公式。
* **Error Handling**：在编辑过程中实时检测语法或执行错误。

### 语法高亮和编辑功能
为提高用户体验，可以使用 `monaco-editor`，它是一个强大的代码编辑器，提供自动补全、语法高亮等功能，特别适用于复杂的公式或表达式输入。
### 设计流程图
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201417210.png)


## 实现过程：编译执行器
### 词法分析（Tokenizer）
首先，我们需要将用户输入的表达式分解为词法单元，例如变量、数字、函数和操作符。下面的 `tokenize` 函数负责这个步骤：
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201433954.png)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201442472.png)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201447557.png)

### 语法分析（Parser）

通过语法分析器，我们将词法单元转化为抽象语法树（AST）。在 AST 中，树的每个节点代表一个操作或操作数。
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201457714.png)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201508110.png)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201517815.png)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201521385.png)

### 解释器（Interpreter）
解释器负责遍历抽象语法树并执行操作。每个节点根据其类型（如 `NumberLiteral`、`CallExpression` 或 `Variable`）进行相应的处理。
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201530762.png)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201536545.png)

### 使用示例
最后，结合上述代码，通过一个示例来展示整个流程，从输入公式到生成结果。
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201542737.png)

## 编辑器支持：Monaco Editor

使用 `monaco-editor` 来实现公式的编辑、自动补全和语法高亮。`monaco-editor` 是微软 VS Code 所使用的编辑器组件，可以为公式编辑器提供高效的开发体验。
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201557630.png)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201608663.png)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201624032.png)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201633362.png)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201644815.png)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250608201649356.png)
