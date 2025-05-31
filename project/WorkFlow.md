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
 "scripts": {
    "lint:eslint": "eslint --cache --max-warnings 0  \"{src,mock}/**/*.{vue,ts,tsx}\" --fix"
  },
```
## prettier
## stylelint
## husky
## lint-stage
## commitlint
### 统一包管理工具
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
## element-plus/vant ui
## mock

``` bash
npm i mockjs vite-plugin-mock --save-dev
```


## axios
## pinia(persistedstate)
## svg
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

- 在 src/main.js 内引入注册脚本
import 'virtual:svg-icons-register'
## vuerouter
## vueuse

## css-reset