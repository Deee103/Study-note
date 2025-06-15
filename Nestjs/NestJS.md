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



#### 服务的注册与使用
---
### 依赖注入
[IoC（控制反转）和 DI（依赖注入）详解](docs/IoC（控制反转）和%20DI（依赖注入）详解.md)
[NestJS 依赖注入](docs/NestJS%20依赖注入.md)
[DTO 和 DAO](docs/DTO%20和%20DAO.md)
#### Constructor Injection（构造函数注入）
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

#### 模块的导入与导出
---
### 核心模块
#### AppModule （应用根模块）
#### Feature Modules （功能模块）
#### Shared Modules （共享模块）
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