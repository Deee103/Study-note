# DTO 和 DAO 在 NestJS 中的应用

## 引言
在现代软件开发里，分层架构是一种常见且有效的设计模式，它把应用程序清晰地划分为诸如表示层、业务逻辑层和数据访问层等不同层次。在分层架构体系中，DTO（Data Transfer Object，数据传输对象）和 DAO（Data Access Object，数据访问对象）作为两个极为关键的设计模式，有力地促进了各层之间松耦合与高内聚的实现。而在 NestJS 这个基于 Node.js 的高效后端框架中，DTO 和 DAO 同样扮演着重要角色，它们与 NestJS 的特性紧密结合，助力开发出结构清晰、易于维护和扩展的应用程序。

## DTO 在 NestJS 中的详细解释
### 定义和用途
在 NestJS 中，DTO 依旧是用于在不同层之间传输数据的模式。它通常是使用 TypeScript 编写的类，通过装饰器等方式定义属性和验证规则等。DTO 的核心目的是对传输的数据进行封装，让数据能在诸如控制器（Controller）与服务（Service）、服务与其他外部服务等不同层之间安全高效地传输，同时避免暴露底层复杂的数据结构。例如，在用户注册功能中，可以创建一个 `UserRegisterDTO` 类，用于接收前端传递的用户注册信息，其代码示例如下：
```typescript
import { IsEmail, IsNotEmpty, MinLength } from 'class - validator';

export class UserRegisterDTO {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
```
这里通过 `class - validator` 库的装饰器对属性进行了验证规则的定义，确保传输的数据符合要求。

### 优点
 - **减少网络开销**：和一般情况类似，在 NestJS 应用里，DTO 只包含实际需要传输的必要数据，有效减少了网络传输的数据量，提升了性能表现。比如在获取用户简要信息的接口中，DTO 只包含用户名、头像等基本信息，而非用户的全部详细数据。
 - **松耦合**：使得各层之间的依赖关系仅基于 DTO 的结构，无需了解其他层内部复杂的实现细节。例如控制器只需要关注 DTO 所提供的数据格式和内容，而不关心服务层具体是如何处理这些数据的，增强了系统的可维护性和扩展性。
 - **易于序列化与验证**：NestJS 对 DTO 的设计使得它天然易于进行序列化操作，方便在网络上传输。同时结合 `class - validator` 等工具，能够在数据传输的入口处（如控制器接收前端数据时）方便地进行数据验证，确保数据的合法性和完整性。

### 缺点
 - **增加代码量**：在 NestJS 项目中，同样需要针对每个不同的数据传输场景创建对应的 DTO 类，尤其是当项目规模较大、数据交互复杂时，DTO 类的数量可能会较多，增加了代码的维护成本。
 - **数据映射复杂性**：当从数据库实体对象转换为 DTO 或者反向转换时，可能需要进行数据映射。虽然 NestJS 本身提供了一些便利的方式，但在复杂的数据结构和业务逻辑下，数据映射的实现仍然可能具有一定的复杂性。

### 在 NestJS 中的实际应用例子
在一个 NestJS 构建的博客应用中，当用户发表一篇新文章时，前端会将文章的标题、内容、标签等信息封装成一个 `ArticleCreateDTO` 传输到后端。控制器接收到该 DTO 后，将其传递给服务层进行进一步的处理，如保存到数据库等操作。

## DAO 在 NestJS 中的详细解释
### 定义和用途
在 NestJS 中，DAO 用于封装数据访问逻辑，通常以服务的形式存在。它提供一系列方法，用于执行数据库的常见操作，如添加、删除、更新和查询数据等。其核心目的是将数据访问的具体细节与业务逻辑层彻底分离，使业务逻辑层专注于处理业务规则，无需关心底层数据库的操作细节。例如，可以创建一个 `UserDAO` 服务类，用于处理与用户数据相关的数据库操作，代码示例如下：
```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserDAO {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(user: User) {
    return this.userModel.create(user);
  }

  async findUserById(id: string) {
    return this.userModel.findById(id).exec();
  }

  // 其他数据库操作方法
}
```
这里通过 `@nestjs/mongoose` 与 MongoDB 进行集成，在 `UserDAO` 中封装了用户数据的创建和查询等操作。

### 优点
 - **封装数据访问逻辑**：将数据库相关的代码集中封装在 DAO 中，使得业务逻辑层的代码更加简洁和专注，只需要调用 DAO 提供的方法即可完成数据访问操作，提高了代码的可读性和可维护性。
 - **提高代码的可维护性**：由于数据访问逻辑集中在 DAO 类中，当数据库结构发生变化或者需要更换数据库类型时，只需要在 DAO 层进行修改，而不会影响到业务逻辑层的大量代码。
 - **支持多种数据源**：借助 NestJS 的模块化和依赖注入特性，DAO 可以很方便地切换不同的数据源。比如从 MySQL 数据库切换到 PostgreSQL 数据库，或者集成 NoSQL 数据库如 MongoDB 等，只需要对 DAO 中的数据访问实现进行相应调整即可。

### 缺点
 - **增加代码量**：在 NestJS 项目里，同样需要为每个不同的数据实体创建对应的 DAO 类，特别是在数据模型较多的情况下，会导致代码量显著增加，需要花费更多的精力进行管理和维护。
 - **数据映射复杂性**：在将数据库查询结果转换为业务逻辑层所需的对象，或者将业务对象转换为适合存储到数据库的格式时，可能需要进行复杂的数据映射操作。尽管可以借助一些工具来简化这个过程，但在复杂业务场景下，仍然可能面临挑战。

### 在 NestJS 中的实际应用例子
在上述的博客应用中，`ArticleDAO` 可以用于从 MongoDB 中查询文章列表、根据文章 ID 获取单篇文章详情、添加新文章以及更新文章内容等数据库操作。业务逻辑层通过调用 `ArticleDAO` 提供的方法来完成与文章数据相关的业务功能。

## DTO 和 DAO 在 NestJS 中的关系
在 NestJS 应用中，DTO 和 DAO 虽然作用不同但紧密协作。DTO 主要负责在不同层之间传输数据，而 DAO 专注于数据的访问操作。通常在数据从数据库到业务逻辑层的流转过程中，DAO 从数据库获取数据后，可能会将其转换为 DTO 格式传递给业务逻辑层；在业务逻辑层处理完数据需要存储到数据库时，又会将 DTO 转换为适合数据库存储的格式传递给 DAO。例如，`UserDAO` 从数据库中获取用户数据后，将其转换为 `UserDTO` 传递给业务逻辑层进行处理；业务逻辑层在处理用户更新请求时，将 `UserUpdateDTO` 转换为适合的格式传递给 `UserDAO` 进行数据库更新操作。

## 在 NestJS 实际项目中的实现最佳实践
### 分层架构
严格遵循 NestJS 的模块化架构思想，将应用程序清晰地划分为控制器层、服务层（业务逻辑层）和数据访问层等。控制器负责接收和处理外部请求，调用服务层的方法；服务层处理具体的业务逻辑，调用数据访问层的 DAO 方法获取或存储数据；数据访问层的 DAO 专注于与数据库的交互操作。通过这种分层方式，使得各层职责明确，代码结构清晰。

### 数据映射工具
可以使用诸如 `class - transformer` 等工具来简化在 NestJS 中 DTO 和数据库实体对象之间的数据映射过程。`class - transformer` 能够方便地将对象从一种格式转换为另一种格式，减少手动编写映射代码的工作量和出错概率。例如在将数据库查询得到的实体对象转换为 DTO 时，可以使用 `class - transformer` 的 `plainToClass` 方法进行快速转换。

### 依赖注入
充分利用 NestJS 强大的依赖注入机制来管理 DAO 和 DTO。通过 `@Injectable()` 装饰器标记 DAO 和相关服务类，在模块的 `providers` 数组中进行声明，然后在需要使用的地方（如控制器或其他服务）通过构造函数注入。这样可以实现对象的生命周期管理和松耦合，提高代码的可测试性和可维护性。例如在控制器中注入 `UserService`（可能依赖于 `UserDAO`）：
```typescript
import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDTO } from './user - register.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async registerUser(@Body() userDTO: UserRegisterDTO) {
    return this.userService.register(userDTO);
  }
}
```
这里 `UserController` 通过构造函数注入了 `UserService`，`UserService` 内部可能进一步依赖 `UserDAO` 来完成业务操作，整个过程通过 NestJS 的依赖注入机制进行管理。

## 总结
在 NestJS 开发中，DTO 和 DAO 是实现分层架构、保证系统松耦合和高内聚的重要设计模式。DTO 专注于数据在不同层之间的安全传输，而 DAO 负责封装数据访问逻辑。它们在实际项目中需要协同工作，以实现高效的数据流转和访问。通过遵循诸如严格分层、合理使用数据映射工具和依赖注入等最佳实践，可以确保在 NestJS 项目中 DTO 和 DAO 的实现更加高效、可靠且易于维护，助力开发出高质量的后端应用程序。 