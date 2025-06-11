# TypeScript知识扩展
王红元 coderwhy

## 目录
1. 编写自定义声明文件
2. TypeScript模块使用
3. TypeScript命名空间
4. 内置声明文件的使用
5. 第三方库声明的文件
6. `tsconfig`配置文件解析

## 编写自定义声明文件
### 目的与定义
- `.d.ts` 文件用于声明 TypeScript 类型。
- 这些文件主要用于类型检测，告知 TypeScript 我们有哪些类型。

### 示例
```ts
// index.d.ts
declare module 'lodash' {
    function isNumber(value: any): value is number;
    export = isNumber;
}

import { isNumber } from 'lodash';
console.log(isNumber(123));  // 输出: true
```

## TypeScript模块使用
### JavaScript模块化
- 自2012年，TypeScript 开始支持多种模块化方案。
- ES Modules 是目前最广泛使用的模块化方案。

### ES Module的基本用法
- `import` 和 `export` 语法。
```ts
// file1.ts
export const name = 'Alice';

// file2.ts
import { name } from './file1';
console.log(name);  // 输出: Alice
```

### `import`和`type`组合
- TypeScript 4.5 允许单独的导入，并需要使用 `type` 前缀。
```ts
import type { SomeType } from './someModule';
```

## TypeScript命名空间
### 命名空间的定义
- 命名空间在 TypeScript 早期称为“内部模块”。
- 命名空间用于将模块内部再进行作用域的划分，防止命名冲突。

### 示例
```ts
namespace MathUtils {
    export function add(a: number, b: number): number {
        return a + b;
    }
}

import { add } from './MathUtils';

console.log(add(1, 2));  // 输出: 3
```

### ES Module代替方案
- 如今更推荐使用 ES Modules，因为它们提供了命名空间的大部分特性。
- ES Modules与 JavaScript 发展方向保持一致。

## 内置声明文件的使用
### 内置类型声明
- TypeScript 自带的声明文件，帮助我们处理内置的 JavaScript 运行时 API。
- 例如：`Function`, `String`, `Math`, `Date`, `Window`, `Document` 等。

### 示例
```ts
// 使用内置类型声明
let greeting = 'Hello';
if (typeof greeting === 'string') {
    console.log(greeting.toUpperCase());
}
```

### 声明文件的获取与使用
- 内置声明文件通常位于 `@types` 库中。
- 示例：`lib.d.ts` 文件。
```ts
// lib.d.ts
declare namespace global {
    interface String {
        startsWith(searchValue: string): boolean;
    }
}

String.prototype.startsWith = function (searchValue: string) {
    return this.indexOf(searchValue) === 0;
};

console.log('Hello'.startsWith('H'));  // 输出: true
```

### `target`和`lib`选项
- 通过 `target` 和 `lib` 选项确定使用的内置声明文件。
- 示例：`target: 'es5'` 和 `lib: 'es5'`。

## 第三方库声明的文件
### 声明文件的位置与方式
- 第三方库通常有两种类型声明方式：
  - 在库中编写 `.d.ts` 文件（例如 `axios`）。
  - 通过社区发布的 `@types` 库（例如 `react`）。

### 示例
- ```sh
  npm i @types/react --save-dev
  ```

### 定制声明文件
- 特殊情况下的声明文件，例如纯 JavaScript 库没有声明文件的情况（例如 `lodash`）。
- 自定义声明文件可以声明模块，适用于不自带声明文件的库。

## `tsconfig`配置文件解析
### 文件的作用
- `tsconfig.json` 文件指定了编译项目所需的根目录下的文件以及编译选项。
- `tsconfig.json` 文件有两个主要作用：
  1. **编译设置**：确定如何编译 TypeScript 代码，进行类型检测等。
  2. **编辑器支持**：确保编辑器正确识别 TypeScript 代码。

### `tsconfig.json`文件示例
```json
{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true
    },
    "include": ["src/**/*"]
}
```

### `tsconfig.json`文件生成
- 当使用 TypeScript 模板生成项目时，`tsconfig.json` 文件通常会预先配置好。
- 可以查看文档或者使用 IDE 自动生成。
- 示例：使用 `tsc --init` 命令。

### `tsconfig.json`文件用法
- 在终端：
  ```sh
  tsconfig.json 由当前目录开始向父级目录寻找包含 tsconfig 文件的目录。
  tsc --project path/to/tsconfig.json
  ```
- 在 `webpack` 中使用 `ts-loader` 进行打包时，会自动读取 `tsconfig.json` 文件。

## 总结
- 本章节介绍了 TypeScript 的一些高级语法扩展，包括自定义声明文件、模块化、命名空间、内置声明文件使用和 `tsconfig` 配置文件。
- 掌握这些知识可以帮助你编写更加灵活、可维护的 TypeScript 代码，并充分利用 TypeScript 提供的强大类型系统支持。

希望这些内容对你有所帮助！继续深入了解和实践，提高你的 TypeScript 编程能力。
```

这个Markdown文档结构清晰，内容详尽地涵盖了TypeScript语法扩展的相关知识点。你可以根据实际需要进一步调整和补充内容。