在 TypeScript 中，`never` 类型主要用于表示永远不会返回的值或函数。这种类型的使用场合通常涉及以下几种情况：

1. **死循环**：表示函数永远不会返回一个有效的值，因为它是无限循环的。
2. **抛出异常**：表示函数在执行过程中的某些情况下会抛出异常，从而导致函数无法继续执行。
3. **条件语句中的断言**：表示某些条件下的类型断言无法满足，从而抛出错误。
4. **条件分支**：表示某些情况下的分支永远不会执行。

下面通过具体的代码示例来详细说明 `never` 类型的应用场景。

### 1. 死循环
死循环不会返回任何值，因此使用 `never` 类型可以明确表示这种情况。

```typescript
function neverReturns(): never {
  while (true) {
    // 无限循环
  }
}

// 函数可以返回 undefined，但永远不会返回
const infiniteLoop = neverReturns();
// 这里可以安全使用 infiniteLoop 的 undefined
console.log(infiniteLoop);
```

### 2. 抛出异常
在某些情况下，函数可能会抛出异常，导致无法返回。使用 `never` 类型可以表示这种情况。

```typescript
function throwError(): never {
  throw new Error('Throwing an error');
}

try {
  const result = throwError();
  console.log(result);  // 不会执行到此处
} catch (error) {
  console.error(error);
}
```

### 3. 条件语句中的断言
在某些情况下，类型断言如果无法满足，可能会导致类型为 `never`。

```typescript
function log(value: any) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    // 在这里类型为 never，因为不能赋值
    (value as never)["log"](); 
  }
}

log(123);  // 输出：123
```

### 4. 条件分支
在某些条件语句分支中，结果不会被实际返回，但类型需要明确该分支永远不会实现。

```typescript
function conditionallyThrow(value: string | number): string | never {
  if (typeof value === "string") {
    return value;
  } else {
    // 逻辑错误：不可能运行此分支，返回 never
    (value as never)["log"]();
    return never;  // 无效语法，用于说明
  }
}

const result = conditionallyThrow(123);
console.log(result);  // 不会执行到此处
```

### 5. 联合类型与 `never`
结合联合类型使用 `never` 可以创建特殊用途的类型。

```typescript
function getLength(value: string | number | undefined): string | number | never {
  if (typeof value === "string") {
    return value.length;
  } else if (typeof value === "number") {
    return value;
  } else {
    throw new Error("Unsupported type");
  }
}

try {
  const length = getLength(undefined);
  console.log(length);
} catch (error) {
  console.error(error);  // 会捕获错误
}
```

### 6. 递归类型中的终止条件
在递归类型定义中，终止条件可以使用 `never` 类型。

```typescript
type RecursiveUnion = (string | number | RecursiveUnion) | never;

// 由于 recursiveUnion 必须包含一个终止条件，这里会报错
// type InvalidRecursive = string | number | InvalidRecursive;
```

### 总结
`never` 类型是一种特殊类型，用于表示某些永远不会返回的值或函数条件。通过合理使用 `never` 类型，可以使代码更加健壮和易于维护。特别适用于处理死循环、异常抛出、条件分支等复杂逻辑。通过以上示例可以看出，`never` 类型在 TypeScript 中的应用非常广泛，能够帮助开发者更好地理解和处理代码中的复杂情况。