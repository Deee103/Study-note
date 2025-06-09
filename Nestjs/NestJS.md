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
### IoC容器
[IoC（控制反转）和 DI（依赖注入）详解](docs/IoC（控制反转）和%20DI（依赖注入）详解.md)
#### Providers（服务提供者）
#### 服务的注册与使用
---
### 依赖注入
[IoC（控制反转）和 DI（依赖注入）详解](docs/IoC（控制反转）和%20DI（依赖注入）详解.md)
[NestJS 依赖注入](docs/NestJS%20依赖注入.md)
[DTO 和 DAO](docs/DTO%20和%20DAO.md)
#### Constructor Injection（构造函数注入）
#### 属性注入
#### 动态模块
---
### 生命周期管理
![{145F3095-52D6-405D-80C4-D85E1731BE4E}.png](https://cdn.jsdelivr.net/gh/Deee103/note-picbed/20250609173225571.png)

#### 依赖的创建，管理与销毁
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
#### 模块之间的依赖关系
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

### 配置

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