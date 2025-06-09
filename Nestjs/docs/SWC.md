## SWC

[SWC](https://swc.rs/)（Speedy Web Compiler）是一个可扩展的基于Rust的平台，可用于编译和打包。使用Nest CLI与SWC结合是加快开发流程的一种简单而有效的方法。

> SWC编译器的速度大约是默认的TypeScript编译器的**20倍**。

### 安装

要开始使用，请先安装几个软件包：

```
$ npm i --save-dev @swc/cli @swc/core
```

### 开始

安装过程完成后，您可以将 `swc` 构建器与 Nest CLI 一起使用，如下所示：

```
$ nest start -b swc
# OR nest start --builder swc
```

> 如果您的存储库是 [monorepo](#mongorepo)，请查看此部分。

除了传递标志之外， `-b` 您还可以 `"swc"` 在 `nest-cli.json` 文件中将 `compilerOptions.builder` 属性设置为，如下所示：

```json
{
  "compilerOptions": {
    "builder": "swc"
  }
}
```

要自定义构建器的行为，可以传递包含两个属性 `type` （ `"swc"` ） 和 `options` 的对象，如下所示：

```json
"compilerOptions": {
  "builder": {
    "type": "swc",
    "options": {
      "swcrcPath": "infrastructure/.swcrc",
    }
  }
}
```

若要在监视模式下运行应用程序，请使用以下命令：

```bash
$ nest start -b swc -w
# OR nest start --builder swc --watch
```

### 类型检查

SWC 本身不执行任何类型检查（与默认的 TypeScript 编译器相反），因此要打开它，您需要使用以下 `--type-check` 标志：

```bash
$ nest start -b swc --type-check
```

此命令将指示 Nest CLI 与 SWC 一起在 `noEmit` 模式下运行 `tsc` ，SWC 将异步执行类型检查。同样，除了传递标志之外 `--type-check` ，您还可以 `true` 在 `nest-cli.json` 文件中将 `compilerOptions.typeCheck` 属性设置为，如下所示：

```json
{
  "compilerOptions": {
    "builder": "swc",
    "typeCheck": true
  }
}
```

###  CLI 插件 （SWC）

该 `--type-check` 标志将自动执行 NestJS CLI 插件并生成一个序列化的元数据文件，然后应用程序可以在运行时加载该文件。

###  SWC 配置

SWC 构建器经过预配置，可满足 NestJS 应用程序的要求。但是，您可以通过在根目录中创建 `.swcrc` 文件并根据需要调整选项来自定义配置。

```json
{
  "$schema": "https://json.schemastore.org/swcrc",
  "sourceMaps": true,
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "decorators": true,
      "dynamicImport": true
    },
    "baseUrl": "./"
  },
  "minify": false
}
```

###  Monorepo

如果您的存储库是 monorepo，那么 `swc` 您必须配置 `webpack` 为使用 `swc-loader` .

首先，让我们安装所需的软件包：

```bash
$ npm i --save-dev swc-loader
```

安装完成后，在应用程序的根目录中创建一个包含以下内容 `webpack.config.js` 的文件：

```js
const swcDefaultConfig = require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory().swcOptions;

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: swcDefaultConfig,
        },
      },
    ],
  },
};
```

### Monorepo 和 CLI 插件

现在，如果您使用 CLI 插件， `swc-loader` 则不会自动加载它们。相反，您必须创建一个单独的文件来手动加载它们。为此，请在 `main.ts` 文件附近声明一个包含以下内容 `generate-metadata.ts` 的文件：

```ts
import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins';
import { ReadonlyVisitor } from '@nestjs/swagger/dist/plugin';

const generator = new PluginMetadataGenerator();
generator.generate({
  visitors: [new ReadonlyVisitor({ introspectComments: true, pathToSource: __dirname })],
  outputDir: __dirname,
  watch: true,
  tsconfigPath: 'apps/<name>/tsconfig.app.json',
});
```

>  **提示**
> 在这个例子中，我们使用了 `@nestjs/swagger` 插件，但你可以使用你选择的任何插件。

该 `generate()` 方法接受以下选项：

| `watch`            | 是否观察项目的变化。                                         |
| ------------------ | ------------------------------------------------------------ |
| `tsconfigPath`     | `tsconfig.json` 文件的路径。相对于当前工作目录 （ `process.cwd()` ）。 |
| `outputDir`        | 将保存元数据文件的目录的路径。                               |
| `visitors`         | 将用于生成元数据的访问者数组。                               |
| `filename`         | 元数据文件的名称。默认值为 `metadata.ts` 。                  |
| `printDiagnostics` | 是否将诊断程序打印到控制台。默认值为 `true` 。               |

最后，您可以使用以下命令在单独的终端窗口中运行脚本 `generate-metadata` ：

```bash
$ npx ts-node src/generate-metadata.ts
# OR npx ts-node apps/{YOUR_APP}/src/generate-metadata.ts
```

###  常见陷阱

如果您在应用程序中使用 TypeORM/MikroORM 或任何其他 ORM，您可能会偶然发现循环导入问题。SWC 不能很好地处理循环导入，因此应使用以下解决方法：

```typescript
@Entity()
export class User {
  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Relation<Profile>; // <--- see "Relation<>" type here instead of just "Profile"
}
```

>  **提示**
> `Relation` type 将从 `typeorm` 包中导出。

这样做可以防止属性类型保存在属性元数据的转译代码中，从而防止循环依赖关系问题。

如果您的 ORM 没有提供类似的解决方法，您可以自行定义包装器类型：

```typescript
/**
 * Wrapper type used to circumvent ESM modules circular dependency issue
 * caused by reflection metadata saving the type of the property.
 */
export type WrapperType<T> = T; // WrapperType === Relation
```

对于项目中的所有循环依赖注入，您还需要使用上述自定义包装器类型：

```typescript
@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: WrapperType<ProfileService>,
  ) {};
}
```

### Jest + SWC

要将 SWC 与 Jest 一起使用，您需要安装以下软件包：

```bash
$ npm i --save-dev jest @swc/core @swc/jest
```

安装完成后，使用以下内容更新 `package.json` / `jest.config.js` 文件（具体取决于您的配置）：

```json
{
  "jest": {
    "transform": {
      "^.+\\.(t|j)s?$": ["@swc/jest"]
    }
  }
}
```

此外，还需要将以下 `transform` 属性添加到文件中 `.swcrc` ： `legacyDecorator` ， `decoratorMetadata` ：

```json
{
  "$schema": "https://json.schemastore.org/swcrc",
  "sourceMaps": true,
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "decorators": true,
      "dynamicImport": true
    },
    "transform": {
      "legacyDecorator": true,
      "decoratorMetadata": true
    },
    "baseUrl": "./"
  },
  "minify": false
}
```

如果您在项目中使用 NestJS CLI 插件，则必须手动运行 `PluginMetadataGenerator` 。导航到此部分以了解更多信息。

### Vitest

Vitest 是一款快速轻量级的测试运行器，旨在与 Vite 配合使用。它提供了一个现代、快速且易于使用的测试解决方案，可以与 NestJS 项目集成。

#### 安装

若要开始，请先安装所需的软件包：

```bash
$ npm i --save-dev vitest unplugin-swc @swc/core @vitest/coverage-v8
```

#### 配置

在应用程序的根目录中创建一个包含以下内容 `vitest.config.ts` 的文件：

```ts
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    }),
  ],
});
```

此配置文件设置 Vitest 环境、根目录和 SWC 插件。您还应该为 e2e 测试创建一个单独的配置文件，其中包含一个指定测试路径正则表达式的附加 `include` 字段：

```ts
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
  },
  plugins: [swc.vite()],
});
```

此外，还可以设置 `alias` 选项以支持测试中的 TypeScript 路径：

```ts
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    alias: {
      '@src': './src',
      '@test': './test',
    },
    root: './',
  },
  resolve: {
    alias: {
      '@src': './src',
      '@test': './test',
    },
  },
  plugins: [swc.vite()],
});
```

#### 在 E2E 测试中更新导入

将任何 E2E 测试导入更改为 `import * as request from 'supertest'` `import request from 'supertest'` 。这是必要的，因为 Vitest 在与 Vite 捆绑在一起时，需要 supertest 的默认导入。使用命名空间导入可能会导致此特定设置出现问题。

最后，将 package.json 文件中的测试脚本更新为以下内容：

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:cov": "vitest run --coverage",
    "test:debug": "vitest --inspect-brk --inspect --logHeapUsage --threads=false",
    "test:e2e": "vitest run --config ./vitest.config.e2e.ts"
  }
}
```

这些脚本配置 Vitest 以运行测试、监视更改、生成代码覆盖率报告和调试。test：e2e 脚本专门用于使用自定义配置文件运行 E2E 测试。

通过此设置，您现在可以享受在 NestJS 项目中使用 Vitest 的好处，包括更快的测试执行和更现代的测试体验。

>  **提示**
> 您可以[在此存储库](https://github.com/TrilonIO/nest-vitest)中查看工作示例