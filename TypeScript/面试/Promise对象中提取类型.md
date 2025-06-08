
# 从Promise对象中提取类型的方法

在TypeScript中，处理异步操作时，我们常常会遇到Promise对象。Promise对象代表了一个异步操作的结果，它会最终解析成一个具体的类型。为了从Promise对象中提取它的解析类型，我们可以使用TypeScript提供的类型工具和自定义的类型工具。以下是几种常用的方法：

## 方法一：使用内置的`PromiseResult`类型工具

TypeScript提供了一个内置的类型工具`PromiseResult`，它可以用来提取Promise的解析类型。使用方法如下：

```typescript
const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => resolve("Hello TypeScript"), 1000);
});

type ResultType = PromiseResult<typeof promise>; // string
```

这里，`typeof promise`得到的是`Promise<string>`，然后`PromiseResult`提取出`string`类型。

## 方法二：自定义类型工具使用`infer`关键字

如果我们不想依赖内置的类型工具，或者需要处理更复杂的类型情况，可以自定义一个类型工具，使用`infer`关键字来推断Promise的解析类型。

```typescript
type ExtractPromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => resolve("Hello TypeScript"), 1000);
});

type ResultType = ExtractPromiseType<typeof promise>; // string
```

在这个自定义类型工具中，`T`被约束为`Promise<any>`，然后使用`infer U`来推断Promise的解析类型`U`。如果`T`不是Promise类型，则返回`never`。

## 方法三：结合`ReturnType`提取函数返回的Promise类型

如果我们有一个函数返回一个Promise，我们可以先提取函数的返回类型，再从中提取Promise的解析类型。

```typescript
function fetchUser(): Promise<User> {
  // 实际代码
}

type ExtractPromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
type UserType = ExtractPromiseType<ReturnType<typeof fetchUser>>; // User
```

这里，`ReturnType<typeof fetchUser>`得到的是`Promise<User>`，然后`ExtractPromiseType`提取出`User`类型。

## 方法四：使用`Awaited`类型工具（TypeScript 4.5+）

从TypeScript 4.5开始，引入了`Awaited`类型工具，它可以用来提取Promise的解析类型。

```typescript
const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => resolve("Hello TypeScript"), 1000);
});

type ResultType = Awaited<typeof promise>; // string
```

`Awaited`类型工具可以用来提取Promise的解析类型，或者处理其他可等待的类型（如Generator）。

## 总结

从Promise对象中提取类型的方法有多种，可以根据具体需求选择合适的方法：

1. **使用内置的`PromiseResult`类型工具**：适用于简单的Promise类型提取。
2. **自定义类型工具使用`infer`关键字**：适用于更复杂的类型情况，或者需要自定义提取逻辑的场景。
3. **结合`ReturnType`提取函数返回的Promise类型**：适用于从函数返回的Promise中提取解析类型。
4. **使用`Awaited`类型工具**：适用于TypeScript 4.5及以上版本，提供更简洁的提取方式。

通过以上方法，我们可以轻松地从Promise对象中提取出它的解析类型，从而在TypeScript中进行更精细的类型控制和推断。