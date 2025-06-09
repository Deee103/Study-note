![image-1749462851917-0.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250609175422281.png)

## 一、DI 概述
在 NestJS 中，依赖注入（Dependency Injection，简称 DI）是一种强大的设计模式，它允许将类的依赖关系从类内部解耦出来，由外部提供所需的依赖对象。这使得代码更具可维护性、可测试性和可扩展性。NestJS 内置了一个功能强大的 DI 容器来管理这些依赖关系。

## 二、DI 容器工作原理
### 1. 注册可注入类
NestJS 的 DI 容器会扫描应用程序中所有使用 `@Injectable()` 装饰器注解的类。`@Injectable()` 用于标识一个类可以被注入到其他类中，这些类通常是服务（Services），但也可以是其他提供特定功能的类。例如：
```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  // 服务的具体逻辑
  getUsers() {
    return ['Alice', 'Bob'];
  }
}
```
所有带有 `@Injectable()` 注解的类以及在模块（Module）的 `providers` 数组中声明的类都会被容器注册。

### 2. 分析依赖关系
DI 容器通过类的构造函数（Constructor）来了解类与类之间的依赖关系。如果一个类的构造函数中声明了对其他类的依赖，容器就会识别出这种依赖关系。比如：
```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserController {
  constructor(private userService: UserService) {}

  getUsers() {
    return this.userService.getUsers();
  }
}
```
在 `UserController` 的构造函数中注入了 `UserService`，容器通过这种方式知道 `UserController` 依赖于 `UserService`。

### 3. 创建实例
NestJS 会自动创建被 `@Injectable()` 注解的类的实例。不仅如此，对于有依赖关系的类，容器会先创建其依赖类的实例，然后再创建当前类的实例。例如，先创建 `UserService` 的实例，再创建 `UserController` 的实例，确保依赖关系得到满足。

### 4. 按需调用
一旦实例创建完成，NestJS 会根据应用程序的需要，在合适的时机调用这些实例。比如当客户端发起一个请求到 `UserController` 的某个路由时，`UserController` 中依赖注入的 `UserService` 实例就会被用来执行相关的业务逻辑。

## 三、依赖注入的好处
### 1. 解耦
通过依赖注入，类不再负责创建自己的依赖对象，而是由外部容器提供。这使得类与类之间的耦合度降低，修改一个类的依赖实现不会影响到其他类。例如，如果要更换 `UserService` 的实现方式，只要保持接口一致，`UserController` 不需要做任何改动。

### 2. 可测试性
在编写单元测试时，依赖注入使得可以轻松地替换真实的依赖对象为模拟对象（Mock）。比如在测试 `UserController` 时，可以创建一个模拟的 `UserService`，并注入到 `UserController` 中，方便对 `UserController` 的逻辑进行单独测试，而不受 `UserService` 具体实现的影响。

### 3. 可扩展性
当应用程序需要添加新的功能或替换现有的依赖实现时，依赖注入使得这些操作变得更加容易。可以在不改变大量代码的情况下，通过配置 DI 容器来使用新的依赖类。

## 四、在模块中配置依赖注入
在 NestJS 中，通过模块（Module）来管理应用程序的结构和依赖关系。在模块中，可以在 `providers` 数组中声明需要被容器管理的类（服务等），在 `controllers` 数组中声明使用这些服务的控制器。例如：
```typescript
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
```
这样，`UserService` 就会被注册到 DI 容器中，并可以被 `UserController` 注入使用。

## 五、总结
NestJS 的依赖注入机制通过其 DI 容器的工作原理，实现了高效的依赖管理。它为开发人员提供了一种强大的方式来构建松耦合、可测试和可扩展的应用程序。理解和熟练运用依赖注入，对于编写高质量的 NestJS 应用至关重要。 