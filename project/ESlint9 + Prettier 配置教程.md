
> 观前提示，本文中用到的项目是`pnpm`、`vite`、`typescript`、`vue@3.x`、`ESNext`， 但是`yarn`、`npm`、`webpack`、`CommonJS`、 `vue@2.x`、`react`依然适合。

## 1、准备一个项目

首先准备一个需要配置 ESlint 的项目，如果项目中已经有旧版本的 ESlint，那就先移除掉`package.json`中所有`ESlint`相关的依赖，因为我们要从 0 开始配置`ESlint@9.x`，顺便认识这个家伙。

> 如果你的项目中有`.eslintrc`等配置，可以先保留这份文件，后面会用到，在你升级到最新版后，可以回来复用先前的规则配置，但是避免冲突，请先将其重命名，比如：`__.eslintrc` 。

pnpm remove eslint eslint-plugin-vue ...

什么，手上没项目？那先收藏起来，下次回来看。

又或者可以用以下命令创建一个：

pnpm create vite eslint-demo --template vue-ts

什么，要我的 demo 源码？本文是教你如何学会使用 ESlint，能够在任何项目中上手配置。如果你的项目跟着我的教程安装配置之后，跑不起来。那要么是我说漏了，要么是你做漏了，欢迎评论区提出，我一定给你解决方案。

## 2、项目安装和配置 ESlint

首先我们先只需安装一个`ESlint@9.x`

pnpm add eslint@latest -D

然后你会在`package.json`中看到

|   |   |
|---|---|
||// package.json|
||{|
||"devDependencies": {|
||"eslint": "^9.9.0"|
||}|
||}|

那么

**ESlint 在项目中是如何运行的呢？**

我们在项目中安装`ESlint`，最终是会通过命令`pnpm lint` 或者`pnpm lint:fix` 去执行，这个命令会用项目中安装的`eslint`去检查指定目录/文件的代码，最终输出不符合规则的代码错误信息。

所以接下来就是要配置命令让`ESlint`起作用

|   |   |
|---|---|
||// package.json|
||{|
||"scripts": {|
||"lint": "eslint",|
||"lint:fix": "eslint --fix"|
||},|
||"devDependencies": {|
||"eslint": "^9.9.0"|
||}|
||}|

然后我们试着执行一下

pnpm lint

不出意外的话，就要出意外了。是的没错，你会跟我一样输出以下错误：

|   |   |
|---|---|
||Oops! Something went wrong! :(|
||ESLint: 9.9.0|
||ESLint couldn't find an eslint.config.(js\|mjs\|cjs) file.|
||From ESLint v9.0.0, the default configuration file is now eslint.config.js.|
||If you are using a .eslintrc.* file, please follow the migration guide|
||to update your configuration file to the new format:|
||https://eslint.org/docs/latest/use/configure/migration-guide|
||If you still have problems after following the migration guide, please stop by|
||https://eslint.org/chat/help to chat with the team.|
||ELIFECYCLE  Command failed with exit code 2.|

不要慌，这说明你的`ESlint`已经正确安装，命令也没有错。错的是我们确实一份`ESlint`配置文件，来告诉`ESlint`去校验哪些文件，用什么规则。

所以我们需要在项目**根目录**中创建一份配置文件，从`ESlint9.x`开始，建议直接用`eslint.config.js`（`ESNext`）或者`eslint.config.mjs`（`CommonJS`）命名的配置文件。

|   |   |
|---|---|
||//eslint.config.js|
||export default [|
||{|
||ignores: [|
||'node_modules',|
||'dist',|
||'public',|
||],|
||},|
||];|

> 因为我们的`lint`命令是没有指定目录或者指定文件类型的，默认`eslit`会去读取项目所有文件进行校验，所以我们需要在配置文件中使用`ignores`字段来告诉`eslint`排除哪些文件，这里也建议写在配置文件里面（更灵活），而不是写在命令那里（比较乱）。

然后我们再来执行一下

pnpm lint

不出意外的话，是没有任何错误输出的，那么说明，`eslint@9.x`配置到这里已经算是成功了。

## 3、规则定制

接下来，我们就要开始定制一些规则，让那些初出茅庐的小伙伴，也能写一手标准的代码，让大家风格统一。

### 3-1、JavaScript 规则

因为`ESlint`是默认支持解析`JavaScript`的，以及有内置一些规则，所以我们只需启用相对于的规则名称就可以了。比如，我们不想在调试代码时在控制台看到各个小伙伴五花八门的 log 日志，非常影响自己调试代码，那么可以添加一下规则：

|   |   |
|---|---|
||// eslint.config.js|
||export default [|
||{|
||ignores: [|
||'node_modules',|
||'dist',|
||'public',|
||],|
||},|
||{|
||rules: {|
||'no-console': 'error',|
||},|
||},|
||];|

然后我们在项目中随便一个 js 文件写一个 console.log

|   |   |
|---|---|
||// xxx.js|
||console.log('🌟🌟🌟🌟🌟TEO', a)|

再执行一下`lint`命令，这时你会看到以下错误

|   |   |
|---|---|
||(base) teo@Friday eslint-demo % pnpm lint|
||> eslint-demo@0.0.0 lint /Users/teo/Code/temp/eslint-demo|
||> eslint|
||/Users/teo/Code/temp/eslint-demo/src/test.js|
||1:1  error  Unexpected console statement  no-console|
||✖ 1 problem (1 error, 0 warnings)|
||ELIFECYCLE  Command failed with exit code 1.|

是不是非常简单！你的`ESlint`配置已经在你的认知范围内起作用了🎉。

你可以在[这里](https://link.juejin.cn/?target=https%3A%2F%2Feslint.org%2Fdocs%2Flatest%2Frules "https://eslint.org/docs/latest/rules")找到更多的`JavaScript`规则。

那么除了用`error`这么强势的启用，还有其他的提示吗？有的，规则可以是`error`、`warn`、`off`。

相比于`error`，`warn`只是警告，不会抛出错误，后面会讲到他们的作用。而`off`则是关闭该规则。

到这里，机会有同学要问了，规则那么多，我要一条一条全部写出来吗？no no no，我们还可以用 ESlint 提供的现成的规则集，要用到`@eslint/js`这个依赖包。

pnpm add @eslint/js -D

|   |   |
|---|---|
||// eslint.config.js|
||import eslint from '@eslint/js';|
|||
||export default [|
||{|
||ignores: [|
||'node_modules',|
||'dist',|
||'public',|
||],|
||},|
||eslint.configs.recommended,|
||];|

> 后面你会看到很多`recommended`，相信在旧的`ESlint`项目中你也会看到这些，这些一般都是相关开发者或者社区所推荐的规则，启用就对了。如果有些规则不是很符合你的项目需求，也可以`off`掉。

到这一步，跟着我做的同学就会发现，`eslint.configs.recommende`d 中并没有`no-console`规则，而且还提示`'console' is not defined`，别急，一步一步来。

首先我们把`no-console`加回去，因为`eslint.configs.recommende`中并没有推荐`no-console`，除非你用`eslint.configs.all`。

|   |   |
|---|---|
||// eslint.config.js|
||import eslint from '@eslint/js';|
|||
||export default [|
||{|
||ignores: [|
||'node_modules',|
||'dist',|
||'public',|
||],|
||},|
||eslint.configs.recommended,|
||/**|
||* JavaScript 规则|
||*/|
||{|
||rules: {|
||'no-console': 'error',|
||},|
||},|
||];|

这里推荐每种规则都单独一个对象框起来，方便管理，因为后面还有`vue`、`typescript`等规则。

### 3-2、启用隐藏的全局变量规则

接下来说说为什么会提示`'console' is not defined`，这是因为`eslint.configs.recommended` 中启用了一条规则`"no-undef": "error"`，`console`是全局变量，默认就可以直接使用，对于`eslint`来说，任何变量都需要定义，不管是否全局变量。这也可避免我们在项目中使用一些真的不存在的变量时导致出现一些低级错误。

打个比方，你可以在任何浏览器环境执行`alert()`，但是你在`nodejs`环境中执行就会报错，`nodejs`中并没有该方法。

所以`eslint`一视同仁，对于任何可用的隐藏全局变量，都需要跟`eslint`打声招呼。于是，我们可以用一个依赖包来配置所有全局变量，那就是`globals`。

pnpm add globals -D

|   |   |
|---|---|
||// eslint.config.js|
||import eslint from '@eslint/js';|
||import globals from 'globals';|
|||
||export default [|
||{|
||ignores: [|
||'node_modules',|
||'dist',|
||'public',|
||],|
||},|
||eslint.configs.recommended,|
||/**|
||* JavaScript 规则|
||*/|
||{|
||rules: {|
||'no-console': 'error',|
||},|
||},|
||/**|
||* 配置全局变量|
||*/|
||{|
||languageOptions: {|
||globals: {|
||...globals.browser,|
||/** 追加一些其他自定义全局规则 */|
||wx: true,|
||},|
||},|
||},|
||];|

这样就解决了隐藏的全局变量定义问题。

这里只是告知`eslint`这些是全局变量，`eslint`便会去掉这些报错。而不是真的给你提供该变量，即便你欺骗`eslint` `xxx` 是全局变量，然后你去使用这个`xxx`时，代码逻辑依旧会报错的。 这里还适合一些通过 cdn 引入的全局变量，可以在这里配置，使用时`eslint`就不会报错了。

### 3-3、Vue 规则

相信配置完`JavaScript`的规则，你对`ESlint`已经有入门级的理解了，接下来我们对项目的`vue`文件进行规则配置。

由于`ESlint`本身只支持识别`JavaScript`，所以对于`vue`文件，还需要一个插件：`eslint-plugin-vue`，假如你的项目也跟我一样用的是`typescript`，那么还需要另一个解析器：`typescript-eslint`

pnpm add eslint-plugin-vue typescript-eslint -D

|   |   |
|---|---|
||// eslint.config.js|
||import eslint from '@eslint/js';|
||import globals from 'globals';|
||import tseslint from 'typescript-eslint';|
||import eslintPluginVue from 'eslint-plugin-vue';|
|||
||export default [|
||{|
||ignores: [|
||'node_modules',|
||'dist',|
||'public',|
||],|
||},|
||eslint.configs.recommended,|
||...eslintPluginVue.configs['flat/recommended'],|
||/**|
||* JavaScript 规则|
||*/|
||{|
||rules: {|
||'no-console': 'error',|
||},|
||},|
||/**|
||* 配置全局变量|
||*/|
||{|
||languageOptions: {|
||globals: {|
||...globals.browser,|
||/** 追加一些其他自定义全局规则 */|
||wx: true,|
||},|
||},|
||},|
||/**|
||* Vue 规则|
||*/|
||{|
||files: ['**/*.vue'],|
||languageOptions: {|
||parserOptions: {|
||/** TypeScript 项目需要用到这个 */|
||parser: tseslint.parser,|
||ecmaVersion: 'latest',|
||/** 允许在 .vue 文件中使用 JSX */|
||ecmaFeatures: {|
||jsx: true,|
||},|
||},|
||},|
||rules: {|
||// 在这里追加 Vue 规则|
||'vue/no-mutating-props': [|
||'error',|
||{|
||shallowOnly: true,|
||},|
||],|
||},|
||},|
||];|

这一步，我们使用了`eslintPluginVue.configs['flat/recommended']`作为 vue 的推荐规则配置。同时，里面还包含了`vue`的`ESlint`插件，用于解析`vue`文件，这也是`ESlint`配置为什么要大改的问题，因为它让`ESlint`配置更加简单了。

同时，如果是`typescript`项目，需要在`languageOptions.parserOptions`中配置解析器来支持`typescript`。

规则中的`files`属性则用于指定匹配的后缀文件或者目录用此规则或者解析器。如果不写`files`，则该规则配置对所有文件起作用。

> 这里还要注意规则的优先级问题，后面的规则会覆盖前面的规则，所以一般会把`recommended`写在最前面，然后后面再去关掉/启用一些其他规则。

对于 vue 的更多规则配置，你可以在[这里](https://link.juejin.cn/?target=https%3A%2F%2Feslint.vuejs.org%2Frules%2F "https://eslint.vuejs.org/rules/")找到。

### 3-4、TypeScript 规则

上面我们已经安装了`typescript-eslint`用于对`vue-ts`的支持，那么它本身也是集成了`typescript`的`recommended`配置以及`ESlint`插件的，即便你不是用在`vue`项目，也可以这样使用：

|   |   |
|---|---|
||import eslint from '@eslint/js';|
||import globals from 'globals';|
||import tseslint from 'typescript-eslint';|
||import eslintPluginVue from 'eslint-plugin-vue';|
|||
||export default [|
||{|
||ignores: [|
||'node_modules',|
||'dist',|
||'public',|
||],|
||},|
||/** JS 推荐配置 */|
||eslint.configs.recommended,|
||/** TS 推荐配置 */|
||...tseslint.configs.recommended,|
||/** Vue 推荐配置 */|
||...eslintPluginVue.configs['flat/recommended'],|
||/**|
||* JavaScript 规则|
||*/|
||{|
||files: ['**/*.{js,mjs,cjs,vue}'],|
||rules: {|
||'no-console': 'error',|
||},|
||},|
||/**|
||* 配置全局变量|
||*/|
||{|
||languageOptions: {|
||globals: {|
||...globals.browser,|
||/** 追加一些其他自定义全局规则 */|
||wx: true,|
||},|
||},|
||},|
||/**|
||* Vue 规则|
||*/|
||{|
||files: ['**/*.vue'],|
||languageOptions: {|
||parserOptions: {|
||/** TypeScript 项目需要用到这个 */|
||parser: tseslint.parser,|
||ecmaVersion: 'latest',|
||/** 允许在 .vue 文件中使用 JSX */|
||ecmaFeatures: {|
||jsx: true,|
||},|
||},|
||},|
||rules: {|
||// 在这里追加 Vue 规则|
||'vue/no-mutating-props': [|
||'error',|
||{|
||shallowOnly: true,|
||},|
||],|
||},|
||},|
||/**|
||* TypeScript 规则|
||*/|
||{|
||files: ['**/*.{ts,tsx,vue}'],|
||rules: {|
||// 在这里追加 TypeScript 规则|
||},|
||},|
||];|

和`vue`的`eslintPluginVue.configs['flat/recommended']`一样，`tseslint.configs.recommended`也会在配置中自动添加插件和规则。

这里我们既然用到了`typescript-eslint`这个插件，那么我们还可以用`tseslint.config`这个函数，来让配置有文件有代码提示，避免写错。

|   |   |
|---|---|
||import eslint from '@eslint/js';|
||import globals from 'globals';|
||import tseslint from 'typescript-eslint';|
||import eslintPluginVue from 'eslint-plugin-vue';|
||import stylistic from '@stylistic/eslint-plugin';|
|||
||export default tseslint.config(|
||{|
||ignores: [|
||'node_modules',|
||'dist',|
||'public',|
||],|
||},|
||/** JS 推荐配置 */|
||eslint.configs.recommended,|
||/** TS 推荐配置 */|
||...tseslint.configs.recommended,|
||/** Vue 推荐配置 */|
||...eslintPluginVue.configs['flat/recommended'],|
||/** Stylistic 自定义规则 */|
||stylistic.configs.customize({|
||indent: 2,|
||quotes: 'single',|
||semi: false,|
||jsx: true,|
||braceStyle: '1tbs',|
||arrowParens: 'always',|
||}),|
||/**|
||* JavaScript 规则|
||*/|
||{|
||files: ['**/*.{js,mjs,cjs,vue}'],|
||rules: {|
||'no-console': 'error',|
||},|
||},|
||/**|
||* 配置全局变量|
||*/|
||{|
||languageOptions: {|
||globals: {|
||...globals.browser,|
||/** 追加一些其他自定义全局规则 */|
||wx: true,|
||},|
||},|
||},|
||/**|
||* Vue 规则|
||*/|
||{|
||files: ['**/*.vue'],|
||languageOptions: {|
||parserOptions: {|
||/** TypeScript 项目需要用到这个 */|
||parser: tseslint.parser,|
||ecmaVersion: 'latest',|
||/** 允许在 .vue 文件中使用 JSX */|
||ecmaFeatures: {|
||jsx: true,|
||},|
||},|
||},|
||rules: {|
||// 在这里追加 Vue 规则|
||'vue/no-mutating-props': [|
||'error',|
||{|
||shallowOnly: true,|
||},|
||],|
||},|
||},|
||/**|
||* TypeScript 规则|
||*/|
||{|
||files: ['**/*.{ts,tsx,vue}'],|
||rules: {|
||// 这里可以添加 TypeScript 相关的规则|
||},|
||},|
||);|

对于`typescript`的更多规则配置，你可以在[这里](https://link.juejin.cn/?target=https%3A%2F%2Ftypescript-eslint.io%2Frules "https://typescript-eslint.io/rules")找到。

这里还推荐用`@stylistic/eslint-plugin`这个插件来提供更多的`typescript`和`JavaScript`的语法风格规则：

pnpm add @stylistic/eslint-plugin -D

|   |   |
|---|---|
||import eslint from '@eslint/js';|
||import globals from 'globals';|
||import tseslint from 'typescript-eslint';|
||import eslintPluginVue from 'eslint-plugin-vue';|
||import stylistic from '@stylistic/eslint-plugin';|
|||
||export default tseslint.config(|
||{|
||ignores: [|
||'node_modules',|
||'dist',|
||'public',|
||],|
||},|
||/** JS 推荐配置 */|
||eslint.configs.recommended,|
||/** TS 推荐配置 */|
||...tseslint.configs.recommended,|
||/** Vue 推荐配置 */|
||...eslintPluginVue.configs['flat/recommended'],|
||/** Stylistic 自定义规则 */|
||stylistic.configs.customize({|
||indent: 2,|
||quotes: 'single',|
||semi: false,|
||jsx: true,|
||braceStyle: '1tbs',|
||arrowParens: 'always',|
||}),|
||/**|
||* JavaScript 规则|
||*/|
||{|
||files: ['**/*.{js,mjs,cjs,vue}'],|
||rules: {|
||'no-console': 'error',|
||},|
||},|
||/**|
||* 配置全局变量|
||*/|
||{|
||languageOptions: {|
||globals: {|
||...globals.browser,|
||/** 追加一些其他自定义全局规则 */|
||wx: true,|
||},|
||},|
||},|
||/**|
||* Vue 规则|
||*/|
||{|
||files: ['**/*.vue'],|
||languageOptions: {|
||parserOptions: {|
||/** TypeScript 项目需要用到这个 */|
||parser: tseslint.parser,|
||ecmaVersion: 'latest',|
||/** 允许在 .vue 文件中使用 JSX */|
||ecmaFeatures: {|
||jsx: true,|
||},|
||},|
||},|
||rules: {|
||// 在这里追加 Vue 规则|
||'vue/no-mutating-props': [|
||'error',|
||{|
||shallowOnly: true,|
||},|
||],|
||},|
||},|
||/**|
||* TypeScript 规则|
||*/|
||{|
||files: ['**/*.{ts,tsx,vue}'],|
||rules: {|
||// 这里可以添加 TypeScript 相关的规则|
||},|
||},|
||);|

好了，到这里如果不出意外的话，恭喜你，入门`ESlint`了，你已经知道 ESlint 是如何去解析每个不同类型的文件了。

当你入门 ESlint 之后，还可以尝试去添加一些其他文件格式的规则，比如`Json`、`Markdown`、`Html`,去搜一下相关的插件，相信你很容易就上手了。

## 二、编辑器中的 ESlint

讲完项目中的`ESlint`，接下来说说开发者工具（VS Code）中的`ESlint`。

为什么我项目中已经安装了`ESlint`，还要在 vscode 中安装`ESlint`扩展呢？

VS Code 中的`ESlint`，本质是可以在你编写代码时，实时看到代码中不符合项目`ESlint`规则配置的错误，比如这样：

![ESlint9 + Prettier 配置教程](https://www.amjun.com/img/uploads/2024/09/66f135b4ee983.webp "ESlint9 + Prettier 配置教程")

那就有同学要问了，为什么不让大家在`vscode`中都安装一个`ESlint`扩展，项目中就不需要了。

其实他们两者使用场景都不一样，项目中安装了`ESlint`，我们可以在脱离了`vscode`之后，去实现一些其他功能。

比如，在自动化部署时，运行`pnpm lint`来确认代码是否存在问题，或者在提交代码时，通过`husky`来阻止存在`ESlint`问题的代码提交。

而`vscode`中的`ESlint`，本质是在你开发时可以立马找到错误的代码位置进行改正修复。

### 1、ESlint 扩展安装

首先，需要在`vscode`中安装`ESlint`扩展插件，安装完后可能要重启`vscode`来生效。

![ESlint9 + Prettier 配置教程](https://www.amjun.com/img/uploads/2024/09/66f135b98e6a8.webp "ESlint9 + Prettier 配置教程")

### 2、ESlint 扩展如何运作

`ESlint`扩展会优先去查找项目根目录中的`eslint.config.js` 配置文件，并且包括配置文件所提到的`ESlint`插件，也就是`npm`依赖包，是的没错，`ESlint`扩展本身所需的`ESlint` 版本和`ESlint`插件，都是来自于`node_modules`，你可以试着把这个目录删了，`vscode`中的`ESlint`扩展就会报错，无法运行。

但你启用`vscode`中的`ESlint`扩展之后，并不会对所有文件生效，你还需要配置`ESlint`扩展的设置来对所需的文件启用校验。

这里建议为每个项目单独添加 vscode 独有的设置，也就是项目根目录中创建一个`.vscode`目录，里面放置一个`settings.json`文件，这样`vscode`就会优先读取该设置：

|   |   |
|---|---|
||// .vscode/settings.json|
||{|
||"eslint.validate": [|
||"javascript",|
||"vue",|
||"vue-html",|
||"typescript",|
||"typescriptreact",|
||"html",|
||"css",|
||"scss",|
||"less",|
||"json",|
||"jsonc",|
||"json5",|
||"markdown"|
||]|
||}|

这样一来，配置中所提到的文件格式，都会被`ESlint`扩展识别。

到这里，ESlint 基本算是可以正常使用了，但是，还没完，`prettier`还没讲呢！

## 三、Prettier 安装和配置

`Prettier`是什么？其实很多人都认识它，它就是一个 vscode 扩展，用于格式化代码。但是用过 ESlint 的人对它又爱又恨，没错它会跟 ESlint 冲突。那么我来讲讲它们是如何冲突，又要如何解决。

### 1、Prettier 如何运作

`prettier`扩展会读取项目根目录中的`.prettierrc`、`.prettierrc.js`之类的配置文件，然后你在 vscode 中用`prettier`执行格式化时，会根据配置文件的要求对代码进行格式化。

那么问题来着，格式化后的结果，有时跟`ESlint`的要求是不一样的，比如`ESlint`要求这个属性要换行，`prettier`要求这个属性不换行。好了，你代码是格式化的漂漂亮亮了，但是 ESlint 不乐意啊，它就给你报红。怎么办呢？

### 2、解决 Prettier 跟 ESlint 冲突

为了解决两者的冲突，我们要使用另一个`ESlint`插件`eslint-plugin-prettier`。

`eslint-plugin-prettier`这个插件不仅提供文件解析，代码`fix`，也顺带提供了一些规则配置，比如它会把跟`prettier`冲突的`ESlint`规则给`off`掉，并使用自己的规则，也就是说，二选一，让你选`prettier`。为什么是`prettier`呢，`prettier`其实只是提供代码风格的规范，也是目前主流的一个风格规范，那我们就跟着主流呗。其他代码逻辑的规范，就交给`ESlint`。

pnpm add eslint-plugin-prettier -D

|   |   |
|---|---|
||import eslint from '@eslint/js';|
||import globals from 'globals';|
||import tseslint from 'typescript-eslint';|
||import eslintPluginVue from 'eslint-plugin-vue';|
||import stylistic from '@stylistic/eslint-plugin';|
||import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';|
|||
||export default tseslint.config(|
||{|
||ignores: [|
||'node_modules',|
||'dist',|
||'public',|
||],|
||},|
||/** JS 推荐配置 */|
||eslint.configs.recommended,|
||/** TS 推荐配置 */|
||...tseslint.configs.recommended,|
||/** Vue 推荐配置 */|
||...eslintPluginVue.configs['flat/recommended'],|
||/** Stylistic 自定义规则 */|
||stylistic.configs.customize({|
||indent: 2,|
||quotes: 'single',|
||semi: false,|
||jsx: true,|
||braceStyle: '1tbs',|
||arrowParens: 'always',|
||}),|
||/**|
||* JavaScript 规则|
||*/|
||{|
||files: ['**/*.{js,mjs,cjs,vue}'],|
||rules: {|
||'no-console': 'warn',|
||},|
||},|
||/**|
||* 配置全局变量|
||*/|
||{|
||languageOptions: {|
||globals: {|
||...globals.browser,|
||/** 追加一些其他自定义全局规则 */|
||wx: true,|
||},|
||},|
||},|
||/**|
||* Vue 规则|
||*/|
||{|
||files: ['**/*.vue'],|
||languageOptions: {|
||parserOptions: {|
||/** TypeScript 项目需要用到这个 */|
||parser: tseslint.parser,|
||ecmaVersion: 'latest',|
||/** 允许在 .vue 文件中使用 JSX */|
||ecmaFeatures: {|
||jsx: true,|
||},|
||},|
||},|
||rules: {|
||// 在这里追加 Vue 规则|
||'vue/no-mutating-props': [|
||'error',|
||{|
||shallowOnly: true,|
||},|
||],|
||},|
||},|
||/**|
||* TypeScript 规则|
||*/|
||{|
||files: ['**/*.{ts,tsx,vue}'],|
||rules: {|
||// 这里可以添加 TypeScript 相关的规则|
||},|
||},|
||/**|
||* Prettier 配置|
||* 会合并根目录下的 prettier.config.js 文件|
||* @see https://prettier.io/docs/en/options|
||*/|
||eslintPluginPrettierRecommended,|
||);|

这里仅仅是添加一句`eslint-plugin-prettier/recommended`，非常简单对吧，它的作用是`off`与它冲突的`ESlint`规则，并且启用自己的`Recommended`规则，并且它会自动合并`prettier.config.js`配置，所以我们还需要在根目录创建一份`prettier.config.js`，配置如下，可根据自己的需求调整配置。

|   |   |
|---|---|
||// prettier.config.js|
||/**|
||* @type {import('prettier').Config}|
||* @see https://www.prettier.cn/docs/options.html|
||*/|
||export default {|
||trailingComma: 'all',|
||singleQuote: true,|
||semi: false,|
||printWidth: 80,|
||arrowParens: 'always',|
||proseWrap: 'always',|
||endOfLine: 'lf',|
||experimentalTernaries: false,|
||tabWidth: 2,|
||useTabs: false,|
||quoteProps: 'consistent',|
||jsxSingleQuote: false,|
||bracketSpacing: true,|
||bracketSameLine: false,|
||jsxBracketSameLine: false,|
||vueIndentScriptAndStyle: false,|
||singleAttributePerLine: false,|
||};|

这里单独一份`prettier.config.js`而不是写进`ESlint`配置里面，是因为`vscode`的`prettier`扩展需要根据它的配置来格式化你的代码。

到这里，`vscode`的`prettier`扩展在格式化代码时，就会解决掉大部分`ESlint`报错，剩下的错误需要你自己手动改一改。

有同学又又要问了，为什么不用`Prettier ESLint`这个扩展来格式化代码。

![ESlint9 + Prettier 配置教程](https://www.amjun.com/img/uploads/2024/09/66f135be6898c.webp "ESlint9 + Prettier 配置教程")

很抱歉，截止目前，它似乎还是不支持`ESlint9.x`，这也是我改用`prettier`的原因，也折腾了很久才明白怎么用`ESlint`。

## 总结

总而言之，使用 ESlint 只需以下几个步骤，就可以完成

### 1、依赖包安装

pnpm add eslint @eslint/js globals typescript-eslint eslint-plugin-vue @stylistic/eslint-plugin eslint-plugin-prettier -D

### 2、创建或者复制已有项目的配置

|   |   |
|---|---|
||// eslint.config.js|
||import eslint from '@eslint/js';|
||import globals from 'globals';|
||import tseslint from 'typescript-eslint';|
||import eslintPluginVue from 'eslint-plugin-vue';|
||import stylistic from '@stylistic/eslint-plugin';|
||import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';|
|||
||export default tseslint.config(|
||{|
||ignores: [|
||'node_modules',|
||'dist',|
||'public',|
||],|
||},|
||/** JS 推荐配置 */|
||eslint.configs.recommended,|
||/** TS 推荐配置 */|
||...tseslint.configs.recommended,|
||/** Vue 推荐配置 */|
||...eslintPluginVue.configs['flat/recommended'],|
||/** Stylistic 自定义规则 */|
||stylistic.configs.customize({|
||indent: 2,|
||quotes: 'single',|
||semi: false,|
||jsx: true,|
||braceStyle: '1tbs',|
||arrowParens: 'always',|
||}),|
||/**|
||* JavaScript 规则|
||*/|
||{|
||files: ['**/*.{js,mjs,cjs,vue}'],|
||rules: {|
||'no-console': 'warn',|
||},|
||},|
||/**|
||* 配置全局变量|
||*/|
||{|
||languageOptions: {|
||globals: {|
||...globals.browser,|
||/** 追加一些其他自定义全局规则 */|
||wx: true,|
||},|
||},|
||},|
||/**|
||* Vue 规则|
||*/|
||{|
||files: ['**/*.vue'],|
||languageOptions: {|
||parserOptions: {|
||/** TypeScript 项目需要用到这个 */|
||parser: tseslint.parser,|
||ecmaVersion: 'latest',|
||/** 允许在 .vue 文件中使用 JSX */|
||ecmaFeatures: {|
||jsx: true,|
||},|
||},|
||},|
||rules: {|
||// 在这里追加 Vue 规则|
||'vue/no-mutating-props': [|
||'error',|
||{|
||shallowOnly: true,|
||},|
||],|
||},|
||},|
||/**|
||* TypeScript 规则|
||*/|
||{|
||files: ['**/*.{ts,tsx,vue}'],|
||rules: {|
||// 这里可以添加 TypeScript 相关的规则|
||},|
||},|
||/**|
||* Prettier 配置|
||* 会合并根目录下的 .prettier.config.js 文件|
||* @see https://prettier.io/docs/en/options|
||*/|
||eslintPluginPrettierRecommended,|
||);|

|   |   |
|---|---|
||// prettier.config.js|
||/**|
||* @type {import('prettier').Config}|
||* @see https://www.prettier.cn/docs/options.html|
||*/|
||export default {|
||trailingComma: 'all',|
||singleQuote: true,|
||semi: false,|
||printWidth: 80,|
||arrowParens: 'always',|
||proseWrap: 'always',|
||endOfLine: 'lf',|
||experimentalTernaries: false,|
||tabWidth: 2,|
||useTabs: false,|
||quoteProps: 'consistent',|
||jsxSingleQuote: false,|
||bracketSpacing: true,|
||bracketSameLine: false,|
||jsxBracketSameLine: false,|
||vueIndentScriptAndStyle: false,|
||singleAttributePerLine: false,|
||};|

|   |   |
|---|---|
||// .vscode/settings.json|
||{|
||"eslint.validate": [|
||"javascript",|
||"vue",|
||"vue-html",|
||"typescript",|
||"typescriptreact",|
||"html",|
||"css",|
||"scss",|
||"less",|
||"json",|
||"jsonc",|
||"json5",|
||"markdown"|
||]|
||}|

|   |   |
|---|---|
||// package.json|
||{|
||"scripts": {|
||"lint": "eslint",|
||"lint:fix": "eslint --fix"|
||},|
||"devDependencies": {|
||"eslint": "^9.9.0"|
||}|
||}|

本文转载自：[2024年｜ESlint9+Prettier从0开始配置教程](https://juejin.cn/post/7402696141495779363#heading-14)