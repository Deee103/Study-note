### 🧙‍♂️ TypeScript 装饰器详解

TypeScript 装饰器（Decorators）是一种**特殊类型的声明**，使用 `@expression` 语法，可以附加到类、方法、属性或参数上，**在不修改原始代码的前提下**对其行为进行扩展。装饰器本质上是**高阶函数**，在编译阶段（非运行时）被自动调用。

#### 🌟 **核心概念图解**：
```
@decorator        // 装饰器语法
class MyClass {
  @propertyDecorator
  name: string

  @methodDecorator
  save(@paramDecorator data: any) {
    //...
  }
}
```

---

### 🔍 **装饰器的类型与功能**

#### 1. 类装饰器（Class Decorators）
```typescript
// 日志追踪装饰器
function LogClass(ctor: Function) {
  console.log(`类实例化: ${ctor.name}`);
}

@LogClass
class UserService {
  //...
}
// 输出：类实例化: UserService
```

**执行位置**：类**声明前**执行

**核心功能**：
- 类元信息扩展
- 添加/重载构造函数
- 拦截实例化过程

---

#### 2. 方法装饰器（Method Decorators）
```typescript
// 性能度量装饰器
function MeasureTime() {
  return (target: any, key: string, desc: PropertyDescriptor) => {
    const original = desc.value;
    desc.value = function(...args: any[]) {
      const start = performance.now();
      const result = original.apply(this, args);
      console.log(`${key} 耗时: ${(performance.now() - start).toFixed(2)}ms`);
      return result;
    }
  }
}

class DataProcessor {
  @MeasureTime()
  processData(data: any[]) {
    // 复杂数据处理...
  }
}
```

**执行位置**：方法**执行前/后**注入逻辑

**参数说明**：
1. 目标类（静态方法）或原型对象（实例方法）
2. 方法名称
3. 属性描述符（可修改）

---

#### 3. 属性装饰器（Property Decorators）
```typescript
// 属性验证装饰器
function Email(target: any, key: string) {
  let value = target[key];

  // Getter/Setter 拦截
  Object.defineProperty(target, key, {
    get: () => value,
    set: (newVal: string) => {
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newVal)) {
        throw new Error("无效的邮箱格式");
      }
      value = newVal;
    }
  });
}

class User {
  @Email
  email!: string;
}
```

**执行位置**：定义类成员时

**典型应用**：
- 数据格式验证
- 自动初始化
- 依赖注入元数据标记

---

#### 4. 参数装饰器（Parameter Decorators）
```typescript
// 依赖注入参数装饰器
function Inject(service: string) {
  return (target: Object, key: string | symbol, index: number) => {
    console.log(`参数位置 ${index} 需要注入: ${service}`);
    Reflect.defineMetadata("inject", service, target, key);
  }
}

class AuthController {
  login(@Inject("AuthService") authService: any) {
    //...
  }
}
```

**执行位置**：方法**参数声明前**执行

**重要参数**：
1. 目标对象原型
2. 方法名称
3. 参数索引位置

---

#### 5. 访问器装饰器（Accessor Decorators）
```typescript
// 只读保护装饰器
function Readonly<T>() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    descriptor.writable = false;
    return descriptor;
  }
}

class Payment {
  private _amount = 0;

  @Readonly()
  get amount() {
    return this._amount;
  }
}
```

---

### 🚀 **装饰器执行顺序**
```typescript
@ClassDecorator         // 1. 类装饰器
class Example {
  @PropertyDecorator    // 2. 属性装饰器
  prop!: string;

  @AccessorDecorator    // 3. 访问器装饰器
  get value() { /*...*/ }

  @MethodDecorator      // 4. 方法装饰器
  process(
    @ParamDecorator arg // 5. 参数装饰器
  ) { /*...*/ }
}
```
**执行阶段**：
1. 参数 → 方法（访问器）→ 属性 → 类装饰器
2. 从下到上（从距离类最近的元素开始）
3. 从右到左（同类型装饰器）

---

### 🧩 **设计模式应用**

#### 🌉 桥接模式 + 装饰器
```typescript
// 通知系统装饰器
interface Notifier {
  send(message: string): void;
}

function SMSNotifier(sender: string): Function {
  return (target: any, key: string, desc: PropertyDescriptor) => {
    const original = desc.value;
    desc.value = async function(...args: any[]) {
      await original.apply(this, args);
      console.log(`[SMS] ${sender}: ${args[0]} 已通知`);
    }
  }
}

class AlertSystem {
  @SMSNotifier("Admin")
  triggerAlarm(message: string) {
    console.log("警报触发:", message);
  }
}
```

---

### 🔧 **配置与启用**
1. 修改 `tsconfig.json`:
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

2. 依赖安装 (元数据支持):
```bash
npm install reflect-metadata
```

3. 项目入口文件引入:
```typescript
import "reflect-metadata";
```

---

### 💡 **最佳实践指南**
1. **明确职责**：单个装饰器仅做一件事
   - ✅ `@Log` | `@Validate` | `@Cache`
   - ❌ `@LogAndValidateAndCache`

2. **避免状态存储**：装饰器函数应为纯函数

3. **区分应用阶段**：
   ```ts
   // 类级别 → 适用于整个框架逻辑
   @Controller('/users')
 
   // 方法级别 → 业务逻辑增强
   @Deprecated
   ```

4. **元数据分析**：
   ```ts
   // 获取元数据
   const meta = Reflect.getMetadata("design:type", Class, property);
   // 返回类型: Function | Number | String...
   ```

5. **框架集成**：
   | 框架         | 装饰器作用               |
   |--------------|--------------------------|
   | **Angular** | @Component / @Injectable |
   | **NestJS**  | @Controller / @Get       | 
   | **TypeORM** | @Entity / @Column        |

> ⚠️ **重要提示**:
> 装饰器仍是 ECMAScript 的**实验性特性**（Stage 3），使用时需权衡项目兼容性需求。在大型项目中，建议配合依赖注入框架规范使用。