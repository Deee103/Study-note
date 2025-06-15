# 前端工程化工作流配置指南

## 路径别名配置

### Vite 项目配置
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import path from 'path'; // 导入 Node.js 路径处理模块

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 设置 @ -> src 目录的路径映射
      '#': path.resolve(__dirname, 'types') // 建议添加的类型目录别名
    }
  }
});
```

### TypeScript 支持（需同步配置）
```bash
npm install -D @types/node  # 解决Node类型声明问题
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",     // 基础路径
    "paths": {
      "@/*": ["src/*"], // 匹配vite别名配置
      "#/*": ["types/*"]
    },
    "types": ["node"]   // 包含Node类型声明
  }
}
```

---

## ESLint 配置 (v9+)

> **技术栈**：`Vue3 + TypeScript`

```bash
pnpm add eslint@latest -D
```

```javascript
// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vuePlugin from 'eslint-plugin-vue';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  // 基础规则
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Vue支持
  ...vuePlugin.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off' // 允许单文件组件名
    }
  },

  // 环境配置
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        project: './tsconfig.json' // 指定TS配置文件
      }
    }
  },

  // 忽略文件
  { ignores: ['dist/*', '.husky', '*.local', 'public/*'] },

  // Prettier集成（必须置于最后）
  prettierConfig
);
```

**校验命令**:
```json
// package.json
"scripts": {
  "lint": "eslint . --ext .js,.ts,.vue",
  "lint:fix": "eslint --fix"
}
```

---

## Prettier 代码格式化

```bash
pnpm add -D prettier eslint-config-prettier
```

### 配置文件
```json
// .prettierrc
{
  "printWidth": 100,            // 单行最大长度
  "tabWidth": 2,                // 缩进空格数
  "useTabs": false,             // 禁用tab缩进
  "semi": true,                 // 语句末尾分号
  "singleQuote": true,          // 使用单引号
  "trailingComma": "all",       // 多行尾随逗号
  "bracketSpacing": true,       // 对象空格: { foo: bar }
  "arrowParens": "always",      // 箭头函数参数括号: (x) => x
  "endOfLine": "lf",            // 换行符类型
  "htmlWhitespaceSensitivity": "ignore"
}
```

### ESLint 集成
```json
// package.json
"scripts": {
  "format": "prettier --write 'src/**/*.{js,ts,vue,scss}'"
}
```

---

## Stylelint CSS 校验

```bash
pnpm add -D stylelint stylelint-config-standard-scss
```

```json
// .stylelintrc.json
{
  "extends": "stylelint-config-standard-scss",
  "rules": {
    "selector-class-pattern": null, // 禁用类名格式强制校验
    "no-descending-specificity": null // 禁用特异性警告
  }
}
```

**校验命令**:
```json
// package.json
"scripts": {
  "stylelint": "stylelint 'src/**/*.scss'"
}
```

---

## Git 工作流工具链

### 1. Husky (Git Hooks)
```bash
npx husky-init && pnpm install
```

### 2. Lint-Staged (增量检查)
```bash
pnpm add -D lint-staged
```

```json
// package.json
"lint-staged": {
  "*.{js,ts,vue}": ["eslint --fix"],
  "*.{scss,css}": ["stylelint --fix"],
  "*": "prettier --write --ignore-unknown"
}
```

### 3. Commitlint (提交信息规范)
```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional
```

```js
// commitlint.config.js
export default { 
  extends: ['@commitlint/config-conventional'] 
}
```

**钩子配置**:
```bash
# .husky/pre-commit
pnpm lint-staged
```

```bash
# .husky/commit-msg
npx --no-install commitlint --edit $1
```

---

## 核心工具库配置

### Mock 数据
```bash
pnpm add -D mockjs vite-plugin-mock
```

```ts
// vite.config.ts
import { viteMockServe } from 'vite-plugin-mock';

export default {
  plugins: [
    viteMockServe({
      mockPath: 'src/mock', // 存放mock文件的目录
      localEnabled: true    // 开发环境启用
    })
  ]
}
```

### SVG 图标处理
```bash
pnpm add -D vite-plugin-svg-icons
```

```ts
// vite.config.ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default {
  plugins: [
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, 'src/icons')],
      symbolId: 'icon-[name]' // 简化ID格式
    })
  ]
}
```

---

## 样式体系配置

### Sass 预处理器
```bash
pnpm add -D sass
```

```scss
// src/assets/styles/variables.scss
$primary-color: #1890ff;
$font-size-base: 14px;
```

```ts
// vite.config.ts
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@use "@/assets/styles/variables.scss" as *;` 
    }
  }
}
```

### PostCSS 适配方案
```bash
pnpm add -D postcss-pxtorem autoprefixer
```

```js
// postcss.config.js
export default {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 16, // 基准值（1rem = 16px）
      propList: ['*', '!border*'] // 排除border属性
    }),
    require('autoprefixer')() // 自动添加浏览器前缀
  ]
}
```

---

## 最佳实践提示

1. **路径别名统一**：
   - 在 `vite.config.ts`、`tsconfig.json`、`eslint.config.js` 中保持相同别名配置

2. **配置优先级**：
   ```
   .eslintrc.local > eslint.config.js > package.json
   ```

3. **提交消息规范**：
   ```
   feat(login): 添加双因素认证
   fix(router): 修复导航守卫重定向问题 (close #123)
   ```



## 待学习
commitizen
monorepo
tailwind
