# Node.js开发环境初始化

## 什么是 Node.js

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. 

`Node.js` `是`一个基于 Chrome V8 引擎的 `JavaScript` `运行环境`。 

通俗的理解：Node.js 为 JavaScript 代码的正常运行，提供的必要的环境。

Node.js 的官网地址: https://nodejs.org/zh-cn/



## Node运行时

![Node.js runtime architecture](https://static.www.toimc.com/blog/picgo/2022/09/15/1-txgFPN5LaUZvPOXelJlSuA-6fb58f.jpeg)

注意：

- Node.js 是 JavaScript 的`后端`运行环境。（正常情况下，Nodejs要安装到服务器上）
- Node.js 中无法调用 DOM 和 BOM 等 浏览器内置 API



## 安装Node(nvm)

方案：

- 官网下载直装：[https://nodejs.org/zh-cn/download/](https://nodejs.org/zh-cn/download/)

- 使用nvm（Node Version Management，node版本管理工具）安装**（推荐）**

  - mac：[https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)， 国内镜像仓库地址：[https://gitee.com/mirrors/nvm/](https://gitee.com/mirrors/nvm/)

    安装脚本：

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    # or
    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    
    # 国内
    curl -o- https://gitee.com/mirrors/nvm/raw/master/install.sh | bash
    ```

    国内加速：

    ```
    export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
    ```

  - windows：[https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)

    安装包：[1.1.10.zip](https://gh.api.99988866.xyz/https://github.com/coreybutler/nvm-windows/releases/download/1.1.10/nvm-setup.zip)

****

  配置nvm环境，找到如下位置的文件（如果没有则新建）：

  - M1：`~/.zprofile`
  - Intel：`~/.bash_profile`， `~/.zshrc`，`~/.profile`或者 `~/.bashrc`

  添加如下内容：

  ```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
  ```

  并重启终端工具。

  

  常见nvm命令(Mac)：

  ```
# 查看有哪些可以下载的版本 mac&Linux
nvm ls-remote

# 安装指定的版本
nvm install v16.14.0

# 使用特定的版本
nvm use v16.14.0

# 设置别名，对应的是nvm unalias mac&Linux
nvm alias v16 v16.14.0
# 设置了之后就可以使用别名了
nvm use v16

# 设置默认的版本 mac&Linux
nvm alias default v16.14.0
  ```

  

## 包管理器npm&yarn&pnpm

介绍

- npm：node默认的包管理工具(自带)

  npm（node  package  manage）node 包 管理器，管理node包的工具。

  包是什么？包就是模块，一个包可以包括一个或多个模块。

  > npm不需要额外的安装，只需要安装node，即会自动的安装npm。

- yarn：特点扁平化依赖，并行安装，本地缓存 

  ```
  npm i -g yarn
  
  # 这样才能国内加速安装
  yarn config set registry https://registry.npmmirror.com
  
  # yarn的命令与npm有出入
  # 参考：http://www.imooc.com/wiki/yarnlesson
  ```

- pnpm：特点

  - 节约磁盘空间，缓存技术加持
  - 速度快
  - 支持 monorepo
  - 安全性高

  ```
  npm i -g pnpm
  ```

  官方地址：[https://pnpm.io/zh/motivation](https://pnpm.io/zh/motivation)

  核心：创建非扁平化的 node_modules 文件夹

  ![img](https://static.www.toimc.com/blog/picgo/2022/09/15/node-modules-structure-8ab301ddaed3b7530858b233f5b3be57-cfe79d.jpg)

  使用 npm 或 Yarn Classic 安装依赖项时，所有包都被提升到模块目录的根目录。 因此，项目可以访问到未被添加进当前项目的依赖。

  默认情况下，pnpm 使用软链的方式将项目的直接依赖添加进模块文件夹的根目录。 

  如果你想了解 pnpm 关于 `node_modules` 结构设计的更多细节，以及为什么它在 Node.js 生态成为了后起之秀，请参考：

  - [扁平的 node_modules 不是唯一的方法](https://pnpm.io/zh/blog/2020/05/27/flat-node-modules-is-not-the-only-way)
  - [基于符号链接的 node_modules 结构](https://pnpm.io/zh/symlinked-node-modules-structure)



下载速度对比：

![Snipaste_2022-02-25_16-53-34](https://static.www.toimc.com/blog/picgo/2022/09/15/Snipaste_2022-02-25_16-53-34-6a0e2c.jpg)

node12下，benchmark对比：

![Snipaste_2022-02-25_16-53-56](https://static.www.toimc.com/blog/picgo/2022/09/15/Snipaste_2022-02-25_16-53-56-eab854.jpg)





## npm国内加速(npm换源)

初始化之后，就可以在当前文件夹中安装第三方模块了

```bash
# 直接修改npm源
# 参考：https://npmmirror.com/
npm config set registry http://mirrors.cloud.tencent.com/npm/
npm config set registry https://registry.npmmirror.com/
npm config set registry https://mirrors.huaweicloud.com/repository/npm/

# 使用cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install xxx
```

或者使用第三方包`nrm`：

```bash
# 安装
cnpm i -g nrm

# 查看
➜ nrm ls
  npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
* taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
  npm2 --------- https://registry.npmjs.org/
  local -------- http://localhost:4873/
  
# 切换
nrm use taobao
```

更多用法参考`nrm --help`

### 常见命令

```bash
# 正常的下载安装
npm install 模块名

# 简写install为i
npm i 模块名

# 一次性安装多个模块
npm i 模块名 模块名 模块名

# 卸载模块
npm uninstall 模块名
```



关于本地模块的说明

- 下载安装的模块，存放在当前文件夹的 `node_modules` 文件夹中，同时还会生成一个记录下载的文件 `package-lock.json`
- 下载的模块，在哪里可以使用
  - 在当前文件夹
  - 在当前文件夹的子文件夹
  - 在当前文件夹的子文件夹的子文件夹
  - ......
  - 翻过来讲，当查找一个模块的时候，会在当前文件夹的 node_modules 文件夹查找，如果找不到，则去上层文件夹的node_modules文件夹中查找，.....依次类推。

> **重要**：代码文件夹不能有中文；代码文件夹不能和模块名同名。



### 版本号管理

![image-20220528102521776](https://static.www.toimc.com/blog/picgo/2022/09/15/image-20220528102521776-49d91e.png)

npm version命令是用来管理package.json中的version属性的。

相比于使用git tag命令，npm version = 修改package.json中的version + git tag打标签。

并且，npm version针对于语义化的版本号，设置了不同的命令：

预发布相关：

- prerelease
- prepatch
- preminor
- premajor

正式发布相关

- patch
- minor
- Major



