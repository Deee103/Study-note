## 安装并使用

前提条件：内置 SSL 支持的 [Node.js](https://nodejs.org/en/) 版本（`^12.22.0`、`^14.17.0` 或 `>=16.0.0`），如果你使用的是官方 Node.js 发行版，那么已经内置了 SSL 支持。

你可以使用该命令安装并配置 ESLint：

```shell
npm init @eslint/config
```
如果你想使用托管在 npm 上的指定可共享配置，你可以使用 `--config` 选项并指定包名：

```shell
# 使用 `eslint-config-semistandard` 可共享配置
# npm 6.x
npm init @eslint/config --config semistandard
# ⚠️ npm 7+ 需要使用额外的双杠：
npm init @eslint/config -- --config semistandard
# 或（可以省略 `eslint-config` 前缀）
npm init @eslint/config -- --config eslint-config-semistandard
```
`--config` 标志也支持传递数组

```shell
npm init @eslint/config -- --config semistandard,standard
# 或
npm init @eslint/config -- --config semistandard --config standard
```
**注意**：使用 `npm init @eslint/config` 时，运行目录需要已经有 `package.json` 文件了。如果还没有该文件，请确保在此之前运行 `npm init` 或 `yarn init`。
在此之后，你可以像这样使用 ESLint 检查任一文件或目录：

```shell
npx eslint yourfile.js

# 或

yarn run eslint yourfile.js
```

也可以全局安装 ESLint 而不仅限于本地（使用 `npm install eslint --global`）。但并不推荐这样做，因为无论使用哪种安装方式，你都需要在本地安装插件和可共享配置。
## 配置

**注意**：如果你正在使用 1.0.0 以前的版本，请阅读[迁移指南](https://zh-hans.eslint.org/docs/latest/use/migrating-to-1.0.0)。

在运行 `npm init @eslint/config` 后，你的目录下会有 `.eslintrc.{js,yml,json}` 文件。在里面你可以看到类似于这样的一些已经配置好了的规则：

```json
{
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
}
```

`"semi"` 和 `"quotes"` 是 ESLint [规则](https://zh-hans.eslint.org/docs/latest/rules/)的名称。第一个值代表规则的错误级别，有以下几种可供选择：

- `"off"` 或 `0` - 关闭该规则
- `"warn"` 或 `1` - 启用并警告（不影响现有代码）
- `"error"` 或 `2` - 启用并报错（错误代码 1）

你可以调节这三档错误级别以精准控制 ESLint 规则实施方式（更多配置项和细节，参见[配置文档](https://zh-hans.eslint.org/docs/latest/use/configure/)）。

你的 `.eslintrc.{js,yml,json}` 配置文件也会包括这一行：

```json
{
    "extends": "eslint:recommended"
}
```

这一行将启用[所有标记为“推荐”的规则](https://zh-hans.eslint.org/docs/latest/rules)。另外，你也可以通过在 [npmjs.com](https://www.npmjs.com/search?q=eslint-config) 上搜索“eslint-config”并使用别人创建的配置。在没有使用别人的可共享配置或在配置中明确启用规则时，ESLint 不会检查你的代码。
## 手动设置

你也可以在项目中手动设置 ESLint.

在开始前你必须确保存在 `package.json` 文件。如果不存在，请优先运行 `npm init` 或 `yarn init` 来创建此文件。

1. 在项目中安装 ESLint 包：
    
    ```shell
    npm install --save-dev eslint
    ```
    
2. 添加任一[支持的配置文件格式](https://zh-hans.eslint.org/docs/latest/use/configure/configuration-files#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F)的 `.eslintrc` 文件。
    
    ```shell
    # 创建 JavaScript 配置文件
    touch .eslintrc.js
    ```
    
3. 在 `.eslintrc` 文件中添加配置。阅读[配置 ESLint 文档](https://zh-hans.eslint.org/docs/latest/use/configure/)学习如何添加规则、环境、自定义配置、插件以及其他内容。
    
    ```js
    // .eslintrc.js 示例
    module.exports = {
      "env": {
          "browser": true,
          "es2021": true
      },
      "extends": "eslint:recommended",
      "parserOptions": {
          "ecmaVersion": "latest",
          "sourceType": "module"
      },
    }
    ```
    
4. 使用 ESLint 命令行检查代码：
    
    ```shell
    npx eslint project-dir/ file1.js
    ```