
# TypeScript泛型编程
王红元 coderwhy

## 目录
1. TypeScript条件类型
2. 泛型语法的基本使用
3. 泛型接口、类的使用
4. 泛型约束和类型条件
5. TypeScript映射类型
6. 类型工具和类型体操

## TypeScript条件类型
### 认识条件类型
- 条件类型用于描述输入类型和输出类型之间的关系。
- 写法类似于JavaScript中的条件表达式。

### 条件类型的写法
- `SomeType extends OtherType ? TrueType : FalseType;`

### 示例
```typescript
type ConditionType<T> = T extends string ? number : boolean;
```

## 泛型语法的基本使用
### 什么是类型的参数化？
- 类型参数化可以实现类型的参数化，即将类型作为参数传递给函数或接口。
- 通过这种机制，我们可以创建可重用的函数和接口。

### 示例
```typescript
// 泛型函数
function identity<T>(arg: T): T {
    return arg;
}

// 使用泛型函数
const numberIdentity = identity<number>(3);
const stringIdentity = identity<string>("Hello");

console.log(numberIdentity);  // 输出: 3
console.log(stringIdentity);  // 输出: Hello
```

### 多个类型的传入
```typescript
function identity<T, U>(arg1: T, arg2: U): [T, U] {
    return [arg1, arg2];
}

const result = identity<number, string>(3, "Hello");
console.log(result);  // 输出: [3, "Hello"]
```

### 常用的类型缩写
- `T`：类型
- `K、V`：键值对
- `E`：元素
- `O`：对象

### 泛型的基本补充
- 在定义接口的时候也可以使用泛型。
- 继续使用 `T` 作为类型变量。

## 泛型接口
### 示例
```typescript
interface Container<T> {
    item: T;
}

const containerString: Container<string> = { item: "Hello" };
const containerNumber: Container<number> = { item: 123 };
```

## 泛型类
### 示例
```typescript
class Container<T> {
    item: T;

    constructor(item: T) {
        this.item = item;
    }
}

const containerString = new Container<string>("Hello");
const containerNumber = new Container<number>(123);
```

## 泛型约束和类型条件
### 泛型约束（Generic Constraints）
- 约束类型参数的范围，确保类型参数满足某些条件。

### 示例
```typescript
interface Person {
    name: string;
}

function getName<T extends Person>(person: T): string {
    return person.name;
}

const person = { name: "Alice", age: 30 };
const name = getName<Person>(person);
console.log(name);  // 输出: Alice
```

### 在泛型约束中的使用（Using Type Parameters in Generic Constraints）
- 例如，获取对象给定属性名的值，并确保不会获取不存在的属性。

## TypeScript映射类型
### 映射类型（Mapped Types）
- 映射类型通过索引签名的语法，可以创建新的类型。
- 例如，将 `Partial`, `Required`, `Readonly` 等映射类型。

### 示例
```typescript
type PartialDeep<T> = {
    [P in keyof T]?: T[P];
};

type RequiredDeep<T> = {
    [P in keyof T]: T[P];
};

type ReadonlyDeep<T> = {
    [P in keyof T]: Readonly<T[P]>;
};
```

## 类型工具和类型体操
### 映射修饰符（Mapping Modifiers）
- `readonly`：设置属性为只读。
- `?`：设置属性为可选。

### 示例
```typescript
type ReadonlyPartial<T> = {
    [P in keyof T]?: Readonly<T[P]>;
};
```

### 提供的内置工具类型
- `Partial<Type>`：Type下所有属性都设置为可选。
- `Required<Type>`：所有属性都设置为必填。
- `Readonly<Type>`：所有属性都设置为只读。
- `Record<Keys, Type>`：构建一个所有key类型为Keys，所有value类型为Type的对象类型。
- `Pick<Type, Keys>`：从Type中提取出Keys定义的属性。
- `Omit<Type, Keys>`：从Type中移除Keys定义的属性。
- `Exclude<UnionType, ExcludedMembers>`：移除所有可以赋给ExcludedMembers的类型。
- `Extract<Type, Union>`：提取所有可以赋给Union的类型。
- `NonNullable<Type>`：移除所有`null`和`undefined`的类型。
- `ReturnType<Type>`：构建Type中函数返回值的类型。
- `InstanceType<Type>`：构建Type中构造函数的实例类型。

### 示例
```typescript
type NumberArray = Array<number>;

type BooleanArray = Array<false>;  // Invalid, because Array<false> is not a valid type

type NumberOrString = number | string;
type ExcludeNumber = Exclude<NumberOrString, number>;  // 输出: string
type IncludeNumber = Extract<NumberOrString, number>;  // 输出: number
type NonNullableNumber = NonNullable<number | null>;  // 输出: number

type Human = {
    name: string;
    age: number;
};

type RequiredHuman = Required<Human>;  // 输出: { name: string; age: number; }
type PartialHuman = Partial<Human>;  // 输出: { name?: string; age?: number; }
type ReadonlyHuman = Readonly<Human>;  // 输出: { readonly name: string; readonly age: number; }
type RecordKeys = Record<string, number>;  // 输出: { [foo: string]: number; }
type PickHuman = Pick<Human, 'name'>;  // 输出: { name: string; }
type OmitHuman = Omit<Human, 'name'>;  // 输出: { age: number; }
```

## 使用条件类型
### 示例
```typescript
type NullableToNonNullable<T> = T extends null | undefined ? never : T;
type NumberOf<T> = T extends number ? T : never;
type BooleanOf<T> = T extends boolean ? T : never;
type StringOf<T> = T extends string ? T : never;

type Result = NumberOf<123>;  // 输出: 123
type Result2 = BooleanOf<number>;  // 输出: never
type Result3 = StringOf<true>;  // 输出: never
```

## 分发条件类型
### 示例
```typescript
type ToArray<T> = T extends any[]
    ? T
    : T extends (infer U)[]
    ? U[]
    : never;

type Result = ToArray<string | number>;  // 输出: string[] | number[]
```