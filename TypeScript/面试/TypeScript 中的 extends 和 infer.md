## `extends` 关键字

### 1. 泛型约束
```typescript
function identity<T extends string>(arg: T): T {
  return arg;
}
```
- 限制泛型参数 `T` 必须是 `string` 或其子类型

### 2. 条件类型
```typescript
type IsString<T> = T extends string ? true : false;
```
- 形式：`T extends U ? X : Y`
- 如果 `T` 可以赋值给 `U`，则返回 `X` 类型，否则返回 `Y`

### 3. 类型继承
```typescript
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}
```
- 接口继承语法

## `infer` 关键字

### 1. 类型推断
```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```
- 只能在 `extends` 条件类型中使用
- 推断函数返回类型

### 2. 常见应用场景

#### 获取数组元素类型：
```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
```

#### 获取 Promise 的解析类型：
```typescript
type PromiseType<T> = T extends Promise<infer U> ? U : never;
```

[Promise对象中提取类型](Promise对象中提取类型.md)
### 3. 多位置推断
```typescript
type ParamType<T> = 
  T extends (arg: infer P) => any ? P : 
  T extends (arg1: infer P1, arg2: infer P2) => any ? [P1, P2] : 
  never;
```

## 组合使用示例

```typescript
type Unpacked<T> = 
  T extends (infer U)[] ? U :
  T extends (...args: any[]) => infer U ? U :
  T extends Promise<infer U> ? U :
  T;

type T1 = Unpacked<Promise<string>>;  // string
type T2 = Unpacked<string[]>;         // string
type T3 = Unpacked<() => number>;     // number
```

| 关键字  | 作用域            | 主要用途                          |
|---------|-------------------|-----------------------------------|
| `extends` | 泛型/类型表达式   | 约束类型参数或进行条件类型判断    |
| `infer`   | 条件类型子句中    | 声明临时类型变量用于类型推断      |
