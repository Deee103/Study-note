# monorepo 两大利器：nx 与 lerna

## 前置说明

在现代软件开发中，Monorepo 是一种管理项目代码的流行策略，特别是在处理多个相互依赖的模块时。Monorepo 是一种将多个项目或包存储在同一个版本控制系统仓库中的做法，旨在促进代码共享和减少依赖管理的复杂性。

NX 和 Lerna 是两个广泛使用的工具，它们都旨在简化 Monorepo 的管理。**NX 提供了一套全面的开发工具，强调代码重用和构建优化，而 Lerna 则专注于简化包的版本管理和发布流程。**

> lerna 已经被 nx 团队维护，它们两者是共生关系！



## Lerna 常见命令及说明

**初始化 Lerna 仓库****(常用)：

- 命令：`lerna init`
- 说明：初始化一个新的 Lerna 仓库，创建必要的 Lerna 配置文件和文件结构。

**添加依赖包****(常用)：

- 命令：`lerna add <package-name> --scope=<package-to-add-to>`
- 说明：向指定的包添加依赖，`<package-name>` 是要添加的依赖包名称，`<package-to-add-to>` 是目标包的名称。

**创建一个新包**：

- 命令：`lerna create <package-name>`
- 说明：在 Lerna 仓库中创建一个新的包，`<package-name>` 是新包的名称。

**引导仓库**：

- 命令：`lerna bootstrap`
- 说明：链接仓库中的交叉依赖，安装所有包的依赖项。

**运行脚本****(常用)：

- 命令：`lerna run <script> --scope=<package-name>`
- 说明：在一个或多个包中运行 npm 脚本，`<script>` 是要运行的脚本，`<package-name>` 是包的名称。

**清理依赖****(常用)：

- 命令：`lerna clean`
- 说明：删除所有包的 node_modules 目录，清理仓库。

**发布包**(常用)：

- 命令：`lerna publish`
- 说明：更新包版本号，提交更改，并发布到 npm。

通过上述命令的介绍，希望能够帮助您更好地理解和使用 NX 和 Lerna 进行项目管理和开发。这些命令覆盖了从项目初始化到开发、构建、测试和发布的整个生命周期。如果您有任何疑问或需要更深入的解释，请随时提问。



## 常见问题

### **`lerna create` 与 `lerna add` **：

- **`lerna create <package-name>`**：
  - **使用情况**：当您想在 Lerna 管理的 Monorepo 仓库中新增一个全新的包时，使用 `lerna create` 命令。这个命令会在仓库中创建一个新的包目录，包含一些基础的模板文件，如 `package.json`。
  - **说明**：适用于开始一个全新的库或组件的开发，为项目新增独立的模块或功能。
- **`lerna add <package-name> --scope=<package-to-add-to>`**：
  - **使用情况**：当您需要在仓库中的某个现有包中添加一个依赖（无论是外部 npm 包还是仓库内的其他包）时，使用 `lerna add` 命令。通过指定 `--scope` 参数，可以精确控制将依赖添加到哪个包中。
  - **说明**：适用于已存在的项目或包需要引入新的依赖库时，如添加工具库或者是项目内部模块间的依赖管理。

### **`lerna bootstrap` 与 `pnpm install` 的区别**：

- **`lerna bootstrap`**：

  - **说明**：`lerna bootstrap` 命令会自动将仓库中的包链接起来，并安装所有包的依赖项。如果仓库中的包相互依赖，`lerna bootstrap` 会处理这些内部依赖的链接，而不需要发布到 npm。
  - **适用场景**：在 Lerna 管理的 Monorepo 中，尤其是包之间存在交叉依赖的情况下，使用 `lerna bootstrap` 来确保正确的依赖关系和链接。

- **`pnpm install`**：

  - **说明**：`pnpm install` 是 `pnpm` 包管理工具用于安装项目依赖的命令，类似于 `npm install` 或 `yarn install`。`pnpm` 特别适用于 Monorepo 结构，因为它通过硬链接和符号链接来节省磁盘空间，并有效管理多包依赖。
  - **适用场景**：在使用 `pnpm` 作为包管理工具的 Monorepo 项目中，可以直接使用 `pnpm install` 来安装和管理依赖。

  

### **在使用 `pnpm` 时是否还需要 `lerna bootstrap`**

如果您的项目使用 `pnpm` 作为包管理工具，并且利用了 `pnpm` 的工作区功能来管理 Monorepo 的依赖，通常不需要再使用 `lerna bootstrap`。`pnpm` 的工作区功能能够有效地处理包之间的依赖关系，包括链接工作区内的包。

然而，**如果您在使用 `lerna` 管理版本控制和发布流程，同时希望利用 `pnpm` 的高效依赖管理特性，可以将两者结合使用，但在这种情况下，使用 `pnpm` 的工作区命令替代 `lerna bootstrap` 通常更为高效**。



## NX 常见命令及说明

nx 的命令结构：

![image-20240225111546261](https://static.www.toimc.com/blog/picgo/2024/02/25/image-20240225111546261-bb864a.webp)

**初始化 NX 工作区****(常用)：

- 命令：`npx create-nx-workspace@latest <workspace-name>`
- 说明：创建一个新的 NX 工作区，其中 `<workspace-name>` 是您的工作区名称。

**添加应用****(常用)：

- 命令：`nx generate @nrwl/react:application <app-name>`
- 说明：在 NX 工作区中添加一个新的应用，这里以 React 应用为例，`<app-name>` 是应用的名称。

**添加库****(常用)：

- 命令：`nx generate @nrwl/react:lib <lib-name>`
- 说明：添加一个新的库到您的工作区中，这里以 React 库为例，`<lib-name>` 是库的名称。

**构建应用**(常用)**：

- 命令：`nx build <app-name>`
- 说明：构建指定的应用，`<app-name>` 是您想要构建的应用名称。

**运行单元测试**：

- 命令：`nx test <app-or-lib-name>`
- 说明：执行指定应用或库的单元测试，`<app-or-lib-name>` 是应用或库的名称。

**执行端到端测试**：

- 命令：`nx e2e <app-name>`
- 说明：执行指定应用的端到端测试，`<app-name>` 是应用的名称。

**依赖图分析****(常用)：

- 命令：`nx dep-graph`
- 说明：生成工作区的依赖图，帮助您可视化项目之间的依赖关系。

![image-20240225111816762](https://static.www.toimc.com/blog/picgo/2024/02/25/image-20240225111816762-ef0aa7.webp)

**并行执行任务****(常用)：

- 命令：`nx run-many --target=build --projects=<project1,project2>`
- 说明：并行执行多个项目的构建任务，`<project1,project2>` 替换为您想要构建的项目名称，用逗号分隔。

![image-20240225111559625](https://static.www.toimc.com/blog/picgo/2024/02/25/image-20240225111559625-1cc7f0.webp)

### `nx run build xxx` 与 `nx build xxx` 的区别

- **`nx run build xxx`**：

  这是使用 `nx run` 通用命令格式指定的构建命令，其中 `xxx` 是项目的名称。这种格式允许您为构建过程指定额外的配置或选项；例如，如果您有一个名为 `my-app` 的应用，并希望使用特定的配置进行构建，可以使用命令 `nx run my-app:build:production`。

- **`nx build xxx`**：

  `nx build xxx` 是一个更简洁的命令，专用于构建项目，其中 `xxx` 同样是项目的名称。这个命令是 `nx run xxx:build` 的简写形式。使用这个命令，NX 会查找并执行项目中定义的 `build` 目标。这种形式简化了命令，**但在默认情况下，它不允许直接指定额外的配置或选项（除非通过命令行选项提供）。**

**主要区别**：

- 使用 `nx run` 命令时，您可以<u>更灵活地指定任务、配置和选项</u>，这对于需要细粒度控制的场景特别有用；
- 使用 `nx build` 命令时，则更便捷、直接，适用于常规的构建任务，特别是当您不需要指定额外配置或只使用命令行选项时。



**使用示例**：

假设您有一个名为 `my-app` 的项目，并且想要使用生产环境的配置进行构建：

- 使用 `nx run`：`nx run my-app:build:production`
  - 这个命令明确指定了项目名、任务和配置，适用于需要精确控制的情况。
- 使用 `nx build`：`nx build my-app --configuration=production`
  - 这个命令使用了简写形式，并通过命令行选项指定了配置，适用于常规构建需求。

