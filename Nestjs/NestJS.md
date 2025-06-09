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
#### ExceptionFilters
---
### 守卫与权限管理
#### AuthGuard
#### 基于角色的访问控制（RBAC）
---
