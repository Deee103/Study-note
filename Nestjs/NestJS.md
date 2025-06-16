---
tags:
  - NestJS
---
---
## 面向切面编程（AOP）
---
### AOP基本概念
[面向切面编程（AOP）及其在 NestJS 中的应用](docs/面向切面编程（AOP）及其在%20NestJS%20中的应用.md)
#### 拦截器（Interceptors）
#### 中间件（Middleware）

![Uploading file...mxj5w]()


#### 守卫（Guards）
---
### 动态代理
#### 方法前后增强
#### 横切关注点处理
---
## 控制反转（IoC）
---
![](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250610223505868.png)
### IoC容器
[IoC（控制反转）和 DI（依赖注入）详解](docs/IoC（控制反转）和%20DI（依赖注入）详解.md)
#### Providers（服务提供者）
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250616000732682.png)

##### 工厂提供器：`useFactory`[#](https://nest.nodejs.cn/fundamentals/custom-providers#%E5%B7%A5%E5%8E%82%E6%8F%90%E4%BE%9B%E5%99%A8%EF%BC%9Ausefactory)

`useFactory` 语法允许动态创建提供程序。实际提供器将由工厂函数返回的值提供。工厂功能可以根据需要简单或复杂。一个简单的工厂可能不依赖于任何其他提供器。更复杂的工厂本身可以注入计算结果所需的其他提供器。对于后一种情况，工厂提供器语法有一对相关的机制：

1. 工厂函数可以接受（可选）参数。
    
2. （可选的）`inject` 属性接受一组提供器，Nest 将在实例化过程中解析这些提供器并将其作为参数传递给工厂函数。此外，这些提供程序可以标记为可选。这两个列表应该是相关的：Nest 将以相同的顺序将 `inject` 列表中的实例作为参数传递给工厂函数。下面的示例演示了这一点。

```typescript

const connectionProvider = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: MyOptionsProvider, optionalProvider?: string) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [MyOptionsProvider, { token: 'SomeOptionalProvider', optional: true }],
  //       \______________/             \__________________/
  //        This provider                The provider with this token
  //        is mandatory.                can resolve to `undefined`.
};

@Module({
  providers: [
    connectionProvider,
    MyOptionsProvider, // class-based provider
    // { provide: 'SomeOptionalProvider', useValue: 'anything' },
  ],
})
export class AppModule {}
```



#### 服务的注册与使用
---
### 依赖注入
[IoC（控制反转）和 DI（依赖注入）详解](docs/IoC（控制反转）和%20DI（依赖注入）详解.md)
[NestJS 依赖注入](docs/NestJS%20依赖注入.md)
[DTO 和 DAO](docs/DTO%20和%20DAO.md)
#### Constructor Injection（构造函数注入）

**DI常识[#](https://nest.nodejs.cn/fundamentals/custom-providers#di-%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86)**
当Nest IoC 容器实例化 `CatsController` 时，它首先查找任何依赖*。当它找到 `CatsService` 依赖时，它会根据注册步骤（上面的#3）对 `CatsService` 令牌执行查找，返回 `CatsService` 类。假设 `SINGLETON` 作用域（默认行为），Nest 将创建 `CatsService` 的实例，缓存它并返回它，或者如果已经缓存了一个实例，则返回现有实例。

*这个解释有点简化以说明这一点。我们忽略的一个重要字段是分析代码依赖的过程非常复杂，并且发生在应用引导期间。一个关键特性是依赖分析（或 "创建依赖图"）是可传递的。在上面的示例中，如果 `CatsService` 本身有依赖，那么这些依赖也会被解析。依赖图确保依赖以正确的顺序解决 - 本质上是 "自下而上"。这种机制使开发者不必管理如此复杂的依赖图。

#### 属性注入[#](https://nest.nodejs.cn/providers#%E5%9F%BA%E4%BA%8E%E5%B1%9E%E6%80%A7%E7%9A%84%E6%B3%A8%E5%85%A5)

在某些特定情况下，基于属性的注入可能很有用。例如，如果你的顶层类依赖于一个或多个提供程序，则在子类中将它们一直传递到 `super()` 可能会变得很麻烦。为了避免这种情况，你可以在属性级别直接使用 `@Inject()` 装饰器。

> [!warning]
> 如果你的类不扩展其他类，通常最好使用基于构造函数的注入。构造函数明确指定了需要哪些依赖，与使用 @Inject 注释的类属性相比，它提供了更好的可见性并使代码更易于理解。


---
#### 动态模块
---
### 生命周期管理
![{145F3095-52D6-405D-80C4-D85E1731BE4E}.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250609173225571.png)

#### 依赖的创建，管理与销毁

提供程序通常具有与应用生命周期一致的生命周期 ("scope")。当应用启动时，必须解析每个依赖，这意味着每个提供程序都会被实例化。同样，当应用关闭时，所有提供程序都将被销毁。但是，也可以使提供程序具有请求范围，这意味着其生命周期与特定请求而不是应用的生命周期相关联。你可以在 [注入范围](https://nest.nodejs.cn/fundamentals/injection-scopes) 章节中了解有关这些技术的更多信息。



---
## 模块化设计
---
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250609173323065.png)
### 模块的基本概念

#模块初始化

``` bash
nest g module user
nest g controller user
```
#### @Module 装饰器

`@Module()` 装饰器采用具有描述模块的属性的单个对象：

|               |                                                                         |
| ------------- | ----------------------------------------------------------------------- |
| `providers`   | 将由 Nest 注入器实例化并且至少可以在该模块中共享的提供程序                                        |
| `controllers` | 此模块中定义的必须实例化的控制器集                                                       |
| `imports`     | 导出此模块所需的提供程序的导入模块列表                                                     |
| `exports`     | 这个模块提供的 `providers` 的子集应该在导入这个模块的其他模块中可用。你可以使用提供器本身或仅使用其令牌（`provide` 值） |

---
#### 模块之间的依赖关系

模块默认封装提供程序，这意味着你只能注入当前模块的一部分或从其他导入模块明确导出的提供程序。从模块导出的提供程序本质上充当模块的公共接口或 API。
##### 共享模块[#](https://nest.nodejs.cn/modules#%E5%85%B1%E4%BA%AB%E6%A8%A1%E5%9D%97)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250616001415435.png)
每个模块自动成为共享模块。一旦创建，它就可以被任何模块重用。假设我们想要在其他几个模块之间共享 `CatsService` 的一个实例。为此，我们首先需要将 `CatsService` 提供程序添加到模块的 `exports` 数组中来导出它。

现在，任何导入 `CatsModule` 的模块都可以访问 `CatsService`，并将与导入它的所有其他模块共享同一个实例。

如果我们直接在每个需要它的模块中注册 `CatsService`，它确实可以工作，但这会导致每个模块都获得自己单独的 `CatsService` 实例。由于创建了同一服务的多个实例，这可能会导致内存使用量增加，并且还可能导致意外行为，例如如果服务保持任何内部状态，则会导致状态不一致。

通过将 `CatsService` 封装在模块（例如 `CatsModule`）中并将其导出，我们确保在导入 `CatsModule` 的所有模块中重用相同的 `CatsService` 实例。这不仅可以减少内存消耗，还可以导致更可预测的行为，因为所有模块共享同一个实例，从而更容易管理共享状态或资源。这是 NestJS 等框架中模块化和依赖注入的主要优势之一 - 允许在整个应用中有效共享服务。


#### 模块的导入与导出

##### 模块重新导出[#](https://nest.nodejs.cn/modules#%E6%A8%A1%E5%9D%97%E9%87%8D%E6%96%B0%E5%AF%BC%E5%87%BA)

如上所示，模块可以导出其内部提供程序。此外，他们可以重新导出他们导入的模块。在下面的示例中，`CommonModule` 既被导入到 `CoreModule` 中，又被从 `CoreModule` 中导出，从而使其可用于导入该模块的其他模块。

```typescript

@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```
---
### 核心模块
#### AppModule （应用根模块）
#### Feature Modules （功能模块）
#### Shared Modules （共享模块）
#### 全局模块[#](https://nest.nodejs.cn/modules#%E5%85%A8%E5%B1%80%E6%A8%A1%E5%9D%97)

如果你必须在所有地方导入相同的模块集，它会变得乏味。与 Nest 不同，[Angular](https://angular.dev/)`providers` 是在全局作用域内注册的。一旦定义，它们随处可用。然而，Nest 将提供程序封装在模块作用域内。如果不首先导入封装模块，则无法在其他地方使用模块的提供程序。

当你想要提供一组开箱即用的提供程序（例如辅助程序、数据库连接等）时，请使用 `@Global()` 装饰器使模块全局化。

`@Global()` 装饰器使模块具有全局作用域。全局模块应该只注册一次，通常由根模块或核心模块注册。

---

## 微服务与模块化拆分
---
### 微服务架构
#### 微服务模块设计
#### GRPC与Kafka集成
---

### 模块间通信
#### 基于事件驱动的通信
#### Message Patterns 与订阅
---
## 消息队列与异步任务
---
### 任务调度
#### @Corn 装饰器
#### Task Scheduler 模块
---
### 消息队列
#### Redis 集成
#### RabbitMQ 集成
---
## 数据库与持久化
---
### 数据库集成
#### TypeORM 支持
#### Mongoose 支持
---
### 事务管理
#### 数据库事务
#### 一致性管理
---
## 其他重要特性
---
### 中间件与拦截器
#### 中间件的注册与链式调用
#### 拦截器的执行顺序
---
### 管道与过滤器
#### ValidationPipes
#### ExceptionFilters[#](https://nest.nodejs.cn/exception-filters)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250609183315512.png)

Nest 带有一个内置的异常层，负责处理应用中所有未处理的异常。当你的应用代码未处理异常时，该层会捕获该异常，然后自动发送适当的用户友好响应。

开箱即用，此操作由内置的全局异常过滤器执行，该过滤器处理 `HttpException` 类型（及其子类）的异常。当异常无法识别时（既不是 `HttpException` 也不是继承自 `HttpException` 的类），内置异常过滤器会生成以下默认 JSON 响应：

```json

{
  "statusCode": 500,
  "message": "Internal server error"
}
```

> **提示**全局异常过滤器部分支持 `http-errors` 库。基本上，任何包含 `statusCode` 和 `message` 属性的抛出异常都将被正确填充并作为响应发回（而不是用于无法识别的异常的默认 `InternalServerErrorException`）。

##### 抛出标准异常[#](https://nest.nodejs.cn/exception-filters#%E6%8A%9B%E5%87%BA%E6%A0%87%E5%87%86%E5%BC%82%E5%B8%B8)

Nest 提供了一个内置的 `HttpException` 类，从 `@nestjs/common` 包中暴露出来。对于典型的基于 HTTP REST/GraphQL API 的应用，最佳做法是在发生某些错误情况时发送标准 HTTP 响应对象。

¥Nest provides a built-in `HttpException` class, exposed from the `@nestjs/common` package. For typical HTTP REST/GraphQL API based applications, it's best practice to send standard HTTP response objects when certain error conditions occur.

例如，在 `CatsController` 中，我们有一个 `findAll()` 方法（一个 `GET` 路由处理程序）。假设此路由处理程序出于某种原因抛出异常。为了证明这一点，我们将硬编码如下：

```typescript

@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

> **提示**我们这里使用的是 `HttpStatus`。这是从 `@nestjs/common` 包导入的辅助枚举。

当客户端调用此端点时，响应如下所示：

```json

{
  "statusCode": 403,
  "message": "Forbidden"
}
```

`HttpException` 构造函数采用两个必需的参数来确定响应：

- `response` 参数定义 JSON 响应主体。它可以是 `string` 或 `object`，如下所述。
    
- `status` 参数定义了 [HTTP 状态代码](https://web.nodejs.cn/en-US/docs/Web/HTTP/Status)。
    

默认情况下，JSON 响应主体包含两个属性：

- `statusCode`：默认为 `status` 参数中提供的 HTTP 状态代码
    
- `message`：基于 `status` 的 HTTP 错误的简短描述
    

要仅覆盖 JSON 响应正文的消息部分，请在 `response` 参数中提供一个字符串。要覆盖整个 JSON 响应主体，请在 `response` 参数中传递一个对象。Nest 将序列化该对象并将其作为 JSON 响应主体返回。

第二个构造函数参数 - `status` - 应该是有效的 HTTP 状态代码。最佳做法是使用从 `@nestjs/common` 导入的 `HttpStatus` 枚举。

有第三个构造函数参数（可选） - `options` - 可用于提供错误 [cause](https://nodejs.cn/blog/release/v16.9.0/#error-cause)。此 `cause` 对象未序列化到响应对象中，但它可用于记录目的，提供有关导致 `HttpException` 被抛出的内部错误的有价值信息。

这是一个覆盖整个响应主体并提供错误原因的示例：

```typescript

@Get()
async findAll() {
  try {
    await this.service.findAll()
  } catch (error) {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, HttpStatus.FORBIDDEN, {
      cause: error
    });
  }
}
```

使用上面的内容，这就是响应的样子：

```json

{
  "status": 403,
  "error": "This is a custom message"
}
```

##### 异常日志记录[#](https://nest.nodejs.cn/exception-filters#%E5%BC%82%E5%B8%B8%E6%97%A5%E5%BF%97%E8%AE%B0%E5%BD%95)

默认情况下，异常过滤器不会记录内置异常（如 `HttpException`）（以及从它继承的任何异常）。抛出这些异常时，它们不会出现在控制台中，因为它们被视为正常应用流程的一部分。相同的行为适用于其他内置异常，如 `WsException` 和 `RpcException`。

这些异常都继承自基本 `IntrinsicException` 类，该类从 `@nestjs/common` 包中导出。此类有助于区分属于正常应用操作的异常和非正常应用操作的异常。

如果要记录这些异常，可以创建自定义异常过滤器。我们将在下一节中解释如何执行此操作。

##### 自定义异常[#](https://nest.nodejs.cn/exception-filters#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%BC%82%E5%B8%B8)

在许多情况下，你不需要编写自定义异常，并且可以使用内置的 Nest HTTP 异常，如下一节所述。如果你确实需要创建自定义异常，那么最好创建你自己的异常层次结构，其中你的自定义异常继承自 `HttpException` 基类。通过这种方法，Nest 将识别你的异常，并自动处理错误响应。让我们实现这样一个自定义异常：

```typescript

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
```

由于 `ForbiddenException` 扩展了基 `HttpException`，它将与内置异常处理程序无缝协作，因此我们可以在 `findAll()` 方法中使用它。

```typescript

@Get()
async findAll() {
  throw new ForbiddenException();
}
```

##### 内置 HTTP 异常[#](https://nest.nodejs.cn/exception-filters#%E5%86%85%E7%BD%AE-http-%E5%BC%82%E5%B8%B8)

Nest 提供了一组继承自基 `HttpException` 的标准异常。这些是从 `@nestjs/common` 包中公开的，代表了许多最常见的 HTTP 异常：

- `BadRequestException`
    
- `UnauthorizedException`
    
- `NotFoundException`
    
- `ForbiddenException`
    
- `NotAcceptableException`
    
- `RequestTimeoutException`
    
- `ConflictException`
    
- `GoneException`
    
- `HttpVersionNotSupportedException`
    
- `PayloadTooLargeException`
    
- `UnsupportedMediaTypeException`
    
- `UnprocessableEntityException`
    
- `InternalServerErrorException`
    
- `NotImplementedException`
    
- `ImATeapotException`
    
- `MethodNotAllowedException`
    
- `BadGatewayException`
    
- `ServiceUnavailableException`
    
- `GatewayTimeoutException`
    
- `PreconditionFailedException`



---
### 守卫与权限管理
#### AuthGuard
#### 基于角色的访问控制（RBAC）
---

# NestJS 开发插件

### 配置[#](docs/Nestjs配置.md)

应用通常运行在不同的环境中。根据环境，应使用不同的配置设置。例如，通常本地环境依赖于特定的数据库凭证，仅对本地数据库实例有效。生产环境将使用一组单独的数据库凭据。由于配置变量发生变化，最佳做法是在环境中使用 [存储配置变量](https://12factor.net/config)。

外部定义的环境变量通过 `process.env` 全局变量在 Node.js 内部是可见的。我们可以尝试通过在每个环境中单独设置环境变量来解决多个环境的问题。这很快就会变得笨拙，尤其是在需要轻松模拟和/或更改这些值的开发和测试环境中。

在 Node.js 应用中，通常使用 `.env` 文件，保存键值对，其中每个键代表一个特定值，以表示每个环境。在不同的环境中运行应用只是交换正确的 `.env` 文件的问题。

在 Nest 中使用此技术的一个好方法是创建一个 `ConfigModule`，它公开一个 `ConfigService`，它加载适当的 `.env` 文件。虽然你可以选择自己编写这样的模块，但为了方便起见，Nest 提供了开箱即用的 `@nestjs/config` 包。我们将在本章介绍这个包。
#### 安装[#](https://nest.nodejs.cn/techniques/configuration#%E5%AE%89%E8%A3%85)

要开始使用它，我们首先安装所需的依赖。

```bash

$ npm i --save @nestjs/config
```

> **提示**`@nestjs/config` 包内部使用 [dotenv](https://github.com/motdotla/dotenv)。
#### 架构验证[#](https://nest.nodejs.cn/techniques/configuration#%E6%9E%B6%E6%9E%84%E9%AA%8C%E8%AF%81)

如果未提供所需的环境变量或它们不符合某些验证规则，则在应用启动期间抛出异常是标准做法。`@nestjs/config` 包支持两种不同的方式来做到这一点：

- [Joi](https://github.com/sideway/joi) 内置验证器。使用 Joi，你可以定义一个对象模式并根据它验证 JavaScript 对象。
- 将环境变量作为输入的自定义 `validate()` 函数。

要使用 Joi，我们必须安装 Joi 包：

```bash

$ npm install --save joi
```

### 第三方日志方案
#winston #pino

### 集成Redis
#ioredis[@nestjs-modules/ioredis - npm](https://www.npmjs.com/package/@nestjs-modules/ioredis)
![image.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250610173049883.png)
#### 安装[#](https://nest.nodejs.cn/microservices/redis#%E5%AE%89%E8%A3%85)

要开始构建基于 Redis 的微服务，首先安装所需的包：

```bash

$ npm i --save ioredis
```

#### 概述[#](https://nest.nodejs.cn/microservices/redis#%E6%A6%82%E8%BF%B0)

要使用 Redis 传输器，请将以下选项对象传递给 `createMicroservice()` 方法：

content_copymain.ts

JS

```typescript

const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.REDIS,
  options: {
    host: 'localhost',
    port: 6379,
  },
});
```

> **提示**`Transport` 枚举是从 `@nestjs/microservices` 包导入的。