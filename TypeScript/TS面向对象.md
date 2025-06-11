# TypeScript面向对象
王红元 coderwhy

## 目录
1. 特殊: 严格字面量检测
2. TypeScript类的使用
3. TypeScript中抽象类
4. TypeScript对象类型
5. TypeScript接口补充
6. TypeScript枚举类型

## 特殊: 严格字面量检测
### 什么是严格字面量检测
- 在TypeScript中，对象字面量的严格字面量检测是一种类型检查机制，可以确保对象字面量的属性名称和类型正确无误。

## TypeScript类的使用
### 认识类的使用
- TypeScript作为JavaScript的超集，支持使用 `class` 关键字定义类。
- 类包含属性和方法，并且可以进行静态类型检测。

### 定义一个Person类
```typescript
class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

let person = new Person("Alice", 30);
person.greet();  // 输出: Hello, my name is Alice and I am 30 years old.
```
### 类的属性
- 可以声明类的属性，并且可以设置初始化值。
- 在 `strictPropertyInitialization` 模式下，属性必须初始化。
- 使用 `!` 符号可以声明不需要初始化的属性。

### 构造函数
- 类可以有自己的构造函数，通过 `new` 关键字创建实例时，构造函数会被调用。
- 构造函数不需要返回任何值，默认返回当前创建出来的实例。

### 类的方法
- 类中可以定义方法，定义的方法称为方法。

### 类的继承
- 使用 `extends` 关键字实现继承。
- 子类可以通过 `super` 访问并调用父类的构造函数和方法。
```typescript
class Student extends Person {
    school: string;

    constructor(name: string, age: number, school: string) {
        super(name, age);
        this.school = school;
    }

    introduce() {
        console.log(`I am a student from ${this.school}.`);
    }
}

let student = new Student("Mike", 18, "ABC School");
student.greet();  // 输出: Hello, my name is Mike and I am 18 years old.
student.introduce();  // 输出: I am a student from ABC School.
```

## TypeScript中抽象类
### 抽象类的定义
- 抽象类使用 `abstract` 关键字声明。
- 抽象类中的方法必须使用 `abstract` 关键字声明。
- 抽象类不能被实例化。

### 抽象方法
- 抽象方法没有具体实现，需要子类实现。
- 子类必须实现父类中的所有抽象方法，除非该类也声明为抽象类。
```typescript
abstract class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract makeSound(): void;
}

class Cat extends Animal {
    constructor(name: string) {
        super(name);
    }

    makeSound(): void {
        console.log(`${this.name} says Meow!`);
    }
}

let cat = new Cat("Kitty");
cat.makeSound();  // 输出: Kitty says Meow!
```

## TypeScript对象类型
### 对象类型的属性修饰符
- 可以使用 `public`, `private`, `protected`, `readonly` 修饰符来声明属性。

### 示例
```typescript
class Animal {
    private name: string;  // 私有属性
    protected age: number;  // 受保护的属性
    public gender: string;  // 公有属性
    readonly weight: number;  // 只读属性

    constructor(name: string, age: number, gender: string, weight: number) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.weight = weight;
    }

    getId() {
        return `ID: ${this.name}-${this.age}-${this.gender}-${this.weight}`;
    }
}

let animal = new Animal("Kitty", 1, "Female", 5);
animal.name = "Bob"; // 允许修改
// animal.age = 2; // 不允许修改，因为是只读属性
console.log(animal.getId());  // 输出: ID: Bob-1-Female-5
```

### 访问器（存取器）
- 可以使用 `get` 和 `set` 关键字定义属性的获取和设置方法。
- 这称为存取器。
```typescript
class Car {
    private _model: string;

    constructor(model: string) {
        this._model = model;
    }

    get model(): string {
        return this._model;
    }

    set model(newModel: string) {
        this._model = newModel;
    }
}

let car = new Car("Model S");
console.log(car.model);  // 输出: Model S
car.model = "Model X";
console.log(car.model);  // 输出: Model X
```

### 参数属性
- 参数属性是可以通过构造函数参数直接初始化的属性。
- 构造函数参数可以通过 `public`, `private`, `protected`, `readonly` 修饰符来定义。
```typescript
class Car {
    constructor(public color: string, protected model: string, private year: number) {
        this.color = color;
        this.model = model;
        this.year = year;
    }
}

let car = new Car("Blue", "Model S", 2020);
console.log(car.color);  // 输出: Blue
console.log(car.model);  // 输出: Model S
// console.log(car.year);  // 错误：year 是私有属性，不能访问
```

## TypeScript接口补充
### 接口继承
- 接口可以继承其他接口。
- 使用 `extends` 关键字。
```typescript
interface Animal {
    name: string;
    sound(): void;
}

interface Mammal extends Animal {
    hasFur: boolean;
}

class Cat implements Mammal {
    name: string;
    hasFur: boolean;

    constructor(name: string, hasFur: boolean) {
        this.name = name;
        this.hasFur = hasFur;
    }

    sound() {
        console.log(`${this.name} says Meow!`);
    }
}

let cat = new Cat("Kitty", true);
cat.sound();  // 输出: Kitty says Meow!
console.log(cat.hasFur);  // 输出: true
```

## TypeScript枚举类型
### 枚举类型的定义
- 枚举类型将一组可能出现的值一一列举出来。
- 使用 `enum` 关键字定义。
```typescript
enum Role {
    ADMIN = 1,
    USER,
    GUEST
}

console.log(Role.ADMIN);  // 输出: 1
console.log(Role.USER);   // 输出: 2
console.log(Role.GUEST);  // 输出: 3
```

### 枚举类型的值
- 查看具体值。
```typescript
enum Role {
    ADMIN = 1,
    USER = 100,
    GUEST
}

console.log(Role.ADMIN);  // 输出: 1
console.log(Role.USER);   // 输出: 100
console.log(Role.GUEST);  // 输出: 101
```

### 可以给枚举赋值其他类型
- 也可以给枚举赋值具体的值，实现自定义逻辑。
```typescript
enum Role {
    ADMIN = "admin",
    USER = "user",
    GUEST = "guest"
}

console.log(Role.ADMIN);  // 输出: admin
console.log(Role.USER);   // 输出: user
console.log(Role.GUEST);  // 输出: guest
```

## 严格字面量检测
### 严格字面量检测
- 在TypeScript中，对象字面量的严格字面量检测是一种类型检查机制。
- 如果对象字面量分配给一个变量或传递给一个非空目标类型的参数时，访问一个不存在的属性会导致编译错误。
- 测试对象字面量时，如果 `falsy value` 不是已知类型，则会出现类型控制错误。
- 使用类型断言或对象字面量的类型扩展可以解决这个问题。
```

这个Markdown文档结构清晰，内容详尽地涵盖了TypeScript面向对象的相关知识点。你可以在相应的部分增加示例代码和解释，以便更好地理解和应用这些概念。