
---

### 一、JavaScript 的痛点
1. **无类型检测机制**
   - 错误在运行时才能暴露（如参数类型错误）
   - 大型项目中安全隐患多
   ```javascript
   function getLength(str) {
     return str.length; // 若传入非字符串会报错
   }
   ```

2. **类型思维缺失**
   - 开发人员需手动验证类型（增加冗余代码）
   - 协作时缺乏类型契约，降低代码可维护性

---

### 二、TypeScript 核心价值
| **特性**      | **作用**                | **示例**                        |
| ----------- | --------------------- | ----------------------------- |
| **静态类型检测**  | 编译时捕获类型错误             | `let msg: string = "Hello";`  |
| **渐进式类型系统** | 支持 `.js` → `.ts` 逐步迁移 | 旧项目可部分改造                      |
| **高级语言特性**  | 支持枚举、元组等扩展类型          | `enum Direction { Up, Down }` |
| **编译为纯净JS** | 兼容所有JS环境              | 通过 `tsc` 编译                   |

> 💡 **Atwood 定律**：*"任何能用 JS 写的系统，最终都会用 JS 实现"* → TS 正成为大型项目首选

---

### 三、环境搭建
1. **安装编译器**
```bash
npm install typescript -g  # 全局安装
tsc --version             # 验证安装
```

2. **运行方案对比**
| **方案**          | **适用场景**               | **命令**               |
|-------------------|---------------------------|------------------------|
| 编译后运行        | 生产环境部署            | `tsc file.ts && node file.js` |
| `ts-node`         | 开发调试快捷方式          | `ts-node file.ts`      |
| Webpack+TS Loader | 工程化项目                | 需配置 `webpack.config.js` |

---

### 四、基础类型系统
#### 1. 原生JS类型增强
| **类型**      | **示例**                          | **关键特性**                     |
|---------------|-----------------------------------|----------------------------------|
| `number`      | `let age: number = 25;`           | 支持二/八/十六进制 (`0b1010`)    |
| `string`      | `let name: string = "why";`       | 支持模板字符串 `${name}`         |
| `boolean`     | `let isDone: boolean = false;`    | 仅接受 `true/false`              |
| `Array`       | `let list: number[] = [1,2,3];`   | 或泛型写法 `Array<number>`       |
| `Symbol`      | `const key: symbol = Symbol();`   | 解决对象属性名冲突             |

#### 2. TS特有类型
| **类型**       | **使用场景**                                  | **示例**                          |
|----------------|---------------------------------------------|-----------------------------------|
| `any`          | 动态类型（慎用）                             | `let obj: any = crossPlatformLib();` |
| `unknown`      | 安全版 `any`（需类型校验后操作）             | ⬇️ 见下方对比                  |
| `void`         | 函数无返回值                                 | `function warn(): void { ... }`   |
| `never`        | 永不返回的函数（死循环/抛异常）              | `function error(): never { throw.. }` |
| `tuple`        | 固定长度+类型的数组                         | `let point: [number, string] = [10, "x"];` |
| 枚举 `enum`    | 具名常量集合                                 | `enum Color { Red, Green }`       |

#### 🔄 `any` vs `unknown`
```typescript
let a: any = "test";
a.toFixed(2); // 编译通过 → 运行时报错!

let b: unknown = "test";
(b as string).toUpperCase(); // 需显式类型断言
```

---

### 五、函数类型实践
#### 1. 参数与返回值注解
```typescript
// 参数类型+返回值类型
function add(x: number, y: number): number {
  return x + y;
}
```
![{DDC0761B-B3E5-4548-ABCA-3EED40B01AF8}.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250602180430307.png)

#### 2. 对象类型约束
```typescript
// 对象作为参数
type User = {
  name: string;
  age?: number;  // 可选属性
};

function register(user: User) {
  console.log(user.name);
}
```

#### 3. 上下文类型推导
```typescript
// 匿名函数自动推导item类型
["a", "b"].forEach(item => console.log(item.toUpperCase()));
```

---

### 六、高级类型应用场景
#### 1. **元组 (Tuple)** → 严格约束的数组
```typescript
// HTTP响应示例：[状态码, 状态消息]
const response: [number, string] = [200, "OK"];
```

#### 2. **枚举 (Enum)** → 替代魔法字符串
```typescript
enum LogLevel {
  Error = 0,
  Warn  = 1,
  Info  = 2
}

function log(level: LogLevel, message: string) { ... }
```

#### 3. **类型守卫处理 unknown**
```typescript
function isNumber(x: unknown): x is number {
  return typeof x === "number";
}

let value: unknown = fetchExternalData();
if (isNumber(value)) {
  value.toFixed(2); // 安全操作
}
```

---

### 附：最佳实践指南
1. **规避 `any` 陷阱**
   - 优先使用 `unknown` + 类型守卫
   - 第三方库缺失类型时声明 `.d.ts`

2. **善用类型推导**
   - 变量初始化时无需显式注解（如 `let count = 10`）

3. **对象接口规范**
   - 大型项目抽离类型定义到独立文件
   ```typescript
   // types/user.d.ts
   declare interface User {
     id: string;
     name: string;
   }
   ```

> **趋势**：Vue3+TS、React+TS、Node.js+TS 已成为工业级开发现范式 🚀

--- 

此笔记涵盖TS核心概念与高频使用场景，重点解决 **类型思维建立** 与 **JS到TS平滑过渡** 问题。完整工程配置可参考讲师原文提供的Webpack教程链接。