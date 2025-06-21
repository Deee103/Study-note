#review 

### 1. 泛型约束的高级用法

```typescript
// 约束多个类型
<T extends string | number>(value: T): T => {...}

// 约束对象形状
<T extends { id: number }>(obj: T): void => {
  console.log(obj.id);
}

// 函数类型约束
<T extends () => boolean>(fn: T): boolean => fn()
```

### 2. 条件类型的实际应用

```typescript
// 类型保护
type Result<T> = T extends Error ? 'error' : 'success';

// 递归类型解析
type DeepReadonly<T> = T extends object 
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

// 映射类型过滤
type FunctionProps<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T];
```

### 3. 类型继承的扩展模式

```typescript
// 多重继承
interface Logger {
  log(message: string): void;
}

interface Timestamped extends Animal, Logger {
  createdAt: Date;
}

// 工具类型组合
type BusinessEntity = Readonly<Dog & Timestamped>;

// 类实现继承
class ServiceDog extends Dog implements Logger {
  log(message: string) {
    console.log(`[${this.name}] ${message}`);
  }
}
```

### 4. 分布式条件类型示例

```typescript
// 联合类型的分布式处理
type Box<T> = T extends any ? { value: T } : never;
type Boxed = Box<string | number>; 
// 等价于 { value: string } | { value: number }

// 过滤特定类型
type NumbersOnly<T> = T extends number ? T : never;
type Num = NumbersOnly<1 | 'a' | 2 | true>; // 1 | 2
```

### 5. 高级约束技巧

```typescript
// 构造函数类型约束
type Constructor<T> = new (...args: any[]) => T;

function createInstance<T>(ctor: Constructor<T>): T {
  return new ctor();
}

// 索引签名约束
type StringRecord<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : never
};
```

这些补充示例展示了 TypeScript `extends` 关键字的强大灵活性：

1. 泛型约束确保类型安全性
2. 条件类型实现类型逻辑分支
3. 类型继承构建复杂类型系统
4. 分布式特性处理联合类型
5. 高级模式用于框架和库开发

关键要点：  
🛡️ `extends` 在泛型中建立类型安全防护  
🧠 条件类型本质是类型系统的 if/else 逻辑  
🧬 类型继承实现接口组合和复用  
✨ 分布式特性是处理联合类型的秘密武器