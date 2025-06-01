## Path-alias
``` javascript
// vite.config.js
import { defineConfig } from 'vite';
import path from 'path'; // 导入 Node.js 的 path 模块
 
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 设置 @ 别名指向 src 目录
    },
  },
});
```
---
**TS 项目**
```bash
# 配置前置
npm add -D @types/node
```

```json
"compilerOptions": {
	// ... 其他配置
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
    },
  },
```
---
## ESlint
> [!tip]
> "eslint": "^9.27.0"

[ESLint](https://eslint.org/docs/head/use/getting-started)
```bash
pnpm add eslint@latest -D
```

``` js
//eslint.config.js
import js from '@eslint/js'

import globals from 'globals'

import tseslint from 'typescript-eslint'

import pluginVue from 'eslint-plugin-vue'

import { defineConfig } from 'eslint/config'

import eslintConfigPrettier from 'eslint-config-prettier/flat'

  

export default defineConfig([

  {

    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],

    plugins: { js },

    extends: ['js/recommended']

  },

  {

    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],

    languageOptions: { globals: globals.browser }

  },

  tseslint.configs.recommended,

  {

    ...pluginVue.configs['flat/essential'],

    rules: {

      'vue/multi-word-component-names': 'off'

    }

  },

  {

    files: ['**/*.vue'],

    languageOptions: { parserOptions: { parser: tseslint.parser } }

  },

  {

    ignores: [

      'config/*',

      '.husky',

      '.local',

      'public/*',

      '.vscode',

      'node_modules'

    ]

  },

  eslintConfigPrettier

])
```


``` json
//package.json
 "scripts": { "lint": "eslint", "lint:fix": "eslint --fix", }
```
## Prettier
[Prettier 中文网 · Prettier 是一个“有态度”的代码格式化工具](https://www.prettier.cn/)
**安装**
`eslint-plugin-prettier`： 将 Prettier 作为 ESlint 的扩展插件，成为 ESlint 语法检查规则的扩展部分。
`eslint-config-prettier` ：关闭所有与Prettier冲突的ESLint规则

``` bash
pnpm add -D prettier eslint-plugin-prettier eslint-config-prettier
```

``` js
//eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
// 新增的插件
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';
// 引入Prettier相关插件
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      // 替换为类型感知的配置
      ...tseslint.configs.recommendedTypeChecked,
      // 添加Prettier配置，必须放在最后以覆盖其他样式规则
      prettierConfig,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-x': reactX,
      'react-dom': reactDom,
      // 添加Prettier插件
      'prettier': prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...reactX.configs['recommended-typescript'].rules,
      ...reactDom.configs.recommended.rules,
      // 添加Prettier规则，将格式问题报告为错误
      'prettier/prettier': 'error',
      'no-console': 'off',
      'no-debugger': 'off',
      'max-len': 'off',
      'no-multi-spaces': 'off', // 由Prettier处理
      'no-return-assign': 'off',
      'semi': 'off', // 由Prettier处理
      'eqeqeq': 'error',
      'jsx-quotes': 'off', // 由Prettier处理
      'import/prefer-default-export': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'no-multiple-empty-lines': 'off', // 由Prettier处理
      'no-param-reassign': 'off',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/indent': 'off', // 由Prettier处理
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  }
);

```

```json
//.prettierrc.json**
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": true,
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 150,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "trailingComma": "all",
  "bracketSameLine": false,
  "embeddedLanguageFormatting": "auto",
  "useTabs": false,
  "htmlWhitespaceSensitivity": "ignore"
}

```

```json
//package.json
"scripts": { "format": "prettier --write src/", .... }
```

## Stylelint

安装 [Stylelint](https://www.stylelint.cn/user-guide/get-started) 并创建配置：

```
npm init stylelint
```

让 Stylelint 处理项目中的所有 CSS 文件：

```
npx stylelint "**/*.css"
```

[stylelint-config-standard-scss](https://www.npmjs.com/package/stylelint-config-standard-scss)

```shell
npm install --save-dev stylelint-config-standard-scss
```

```json
//.stylelintrc.json
{

  "extends": "stylelint-config-standard-scss"

}
```
## Husky
[Husky](https://typicode.github.io/husky/zh/get-started.html)
```bash
npm install --save-dev husky
```
**husky init** 
`init` 命令简化了项目中的 husky 设置。它会在 `.husky/` 中创建 `pre-commit` 脚本，并更新 `package.json` 中的 `prepare` 脚本。随后可根据你的工作流进行修改。

```shell
npx husky init
```


## Lint-Stage
[lint-staged - npm](https://www.npmjs.com/package/lint-staged)
```shell
npm install --save-dev lint-staged
```

```json
//package.json
"scripts": {
    "lint-staged": "lint-staged"
  },
"lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "eslint --max-warnings 0"
    ],
    "src/**/*.{vue,less,postcss,css,scss}": [
      "stylelint --max-warnings 0"
    ]
  }
```

``` bash
#.husky/pre-commit
pnpm lint-staged
```
## Commitlint
[Commitlint](https://commitlint.js.org/guides/getting-started.html)
```shell
npm install -D @commitlint/cli @commitlint/config-conventional
```

```js
//commitlint.config.js
export default { extends: ['@commitlint/config-conventional'] }
```

```shell
# .husky/commit-msg
npx --no-install commitlint --edit $1
```

## 统一包管理工具
在根目录创建scritps/preinstall.js

``` bash
if(!/npm/.test(process.env.npm_execpath||'')){
console.warn(
`\u001b[33mThis repository must using npn as the package manager`+
`for scripts to work properly.\u001b[39m\n`,
)
process.exit(1)
}
```
package.json中配置命令

``` js
"preinstall":"node ./scripts/preinstall.js"
```

当使用yarn或pnpm来安装包的时候就会报错，因为install 的时候会触发preinstall（npm提供的生命周期钩子）
## Mockjs

``` bash
npm i mockjs vite-plugin-mock --save-dev
```

```ts
//vite.config.ts
import { viteMockServe } from 'vite-plugin-mock'
plugins: [
    viteMockServe({
      mockPath: 'src/mock/',
      logger: true,
      enable: true
    }),
  ],
```

## Axios
## Pinia(persistedstate)
## Svg
``` bash
yarn add vite-plugin-svg-icons -D 
# or 
npm i vite-plugin-svg-icons -D 
# or
pnpm install vite-plugin-svg-icons -D
```
- vite.config.ts 中的配置插件
```js
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' 
import path from 'path' 
export default () => { 
return { 
plugins: [ createSvgIconsPlugin({
// 指定需要缓存的图标文件夹 
iconDirs: [path.resolve(process.cwd(), 'src/icons')],
// 指定symbolId格式 
symbolId: 'icon-[dir]-[name]',
/** * 自定义插入位置 * @default: body-last */
// inject?: 'body-last' | 'body-first' 
/** * custom dom id * @default: __svg__icons__dom__ */
// customDomId: '__svg__icons__dom__',
}), ], } }
```
## Vue-router
## Vueuse
## Css-reset
## SASS
```shell
pnpm install -D sass sass-loader

```

```ts
//vite.config.ts
css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 variables.scss 这样就可以在全局中使用 variables.scss中预定义的变量了
        // 给导入的路径最后加上 ;
        additionalData: '@use "@/assets/style/variables.scss" as *;'
      }
    },
  }
```

#### 重置全局样式
![](img/reset.scss)

```scsss
//src/assets/style/index.scss
@use 'reset.scss';
```

```ts
//main.ts
import '@/assets/style/index.scss'
```
## PostCss
#postcss-pxtorem #postcss #postcss-scss

```ts
//vite.config.ts
css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          // 自适应，px>rem转换
          rootValue: 75,
          propList: ['*'] // 需要转换的属性，这里选择全部都进行转换
        })
      ]
    }
  }
```