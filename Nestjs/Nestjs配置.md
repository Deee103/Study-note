# Nestjs配置

应用程序通常在不同的**环境**中运行，根据环境的不同，应该使用不同的配置设置。例如，通常本地环境依赖于特定的数据库凭据，仅对本地 DB 实例有效，生产环境将使用一组单独的 DB 凭据。

由于配置变量会更改，所以最佳实践是将配置变量存储在环境中。

应用程序通常在不同的**环境**中运行，根据环境（Development，Production）的不同，应该使用不同的配置设置。

两种方法：

- 使用`@nestjs/config`来实现对`.env`的`key=value`对进行解析
- 使用`config`库解析`yaml`格式的文件

## 官方`@nestjs/config`

### 最简单的用法

```
npm i --save @nestjs/config
```

配置`src/app.module.ts`：

```tsx
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

然后创建：`.env`文件：

```bash
DATABASE_USER=test
DATABASE_PASSWORD=test123
```

下面来使用`src/app.controller.ts`中使用：

```typescript
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    const dbUser = this.configService.get<string>('DATABASE_USER');
    console.log(dbUser); // 这里来测试
    return this.appService.getHello();
  }
}
```



### 进阶用法

![img](https://static.www.toimc.com/blog/picgo/2022/10/21/200-84b8b3.webp)

从这里点进去，我们发现`ConfigModuleOptions`：

```typescript
import { ConfigFactory } from './config-factory.interface';
export interface ConfigModuleOptions {
    cache?: boolean;
    isGlobal?: boolean;
    ignoreEnvFile?: boolean;
    ignoreEnvVars?: boolean;
    envFilePath?: string | string[];
    encoding?: string;
    validate?: (config: Record<string, any>) => Record<string, any>;
    validationSchema?: any;
    validationOptions?: Record<string, any>;
    load?: Array<ConfigFactory>;
    expandVariables?: boolean;
}
```

所支持的参数。

我们可以利用`envFilePath`配合`NODE_ENV`来，在不同的启动命令的时候使用不同的配置。

```bash
npm i cross-env
```

然后添加两个文件：`.env.development`与`.env.production`，比如`.env.production`：

```bash
DATABASE_USER=test1
DATABASE_PASSWORD=test123321
```

下面修改`scripts`：

```
"start:prod": "cross-env NODE_ENV=production node dist/main",
```

可以设置`app.module.ts`中默认是`development`：

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

const envPath = `.env.${process.env.NODE_ENV || 'development'}`;
console.log('🚀 ~ file: app.module.ts ~ line 7 ~ envPath', envPath);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envPath,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

同样，大家可以启动了测试一下：

```bash
➜ npm run start:prod

> nestjs-common-template@0.0.1 start:prod /Users/macos/Projects/nestjs/nestjs-common-template
> cross-env NODE_ENV=production node dist/main

🚀 ~ file: app.module.ts ~ line 7 ~ envPath .env.production
```



如果需要读取公共的`.env`文件，则需要使用到`ConfigModule.forRoot`的`load`方法：

- 安装依赖：

  ```
  npm i dotenv
  ```

- 修改`app.module.ts`文件：

  ```typescript
  import { Module } from '@nestjs/common';
  import { UserModule } from './user/user.module';
  import { ConfigModule } from '@nestjs/config';
  import * as dotenv from 'dotenv';
  
  const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;
  
  @Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath,
        // 这里新增.env的文件解析
        load: [() => dotenv.config({ path: '.env' })],
      }),
      UserModule,
    ],
    controllers: [],
    providers: [],
  })
  export class AppModule {}
  ```

- 配置`.env`文件：

  ```bash
  DB=mysql
  DB_HOST=127.0.0.1
  
  DB_URL=www.imooc.com
  ```

  设置测试：

  ```typescript
      const url = this.configService.get('DB_URL');
      console.log(
        '🚀 ~ file: user.controller.ts ~ line 23 ~ UserController ~ getUsers ~ url',
        url,
      );
  ```

- 运行测试：

  ```
  🚀 ~ file: user.controller.ts ~ line 15 ~ UserController ~ getUsers ~ db mysql-dev 127.0.0.1
  🚀 ~ file: user.controller.ts ~ line 23 ~ UserController ~ getUsers ~ url www.imooc.com
  ```

  

### 解析`yaml`格式的配置

步骤：

- 下载`js-yaml`与`@types/js-yaml`

  ```
  npm i js-yaml
  npm i -D @types/js-yaml
  ```

- 创建配置：`config.yml`

  ```yaml
  http:
    host: 'localhost'
    port: 8080
  
  db:
    postgres:
      url: 'localhost'
      port: 5432
      database: 'yaml-db'
  
    sqlite:
      database: 'sqlite.db'
  ```

- 配置自定义文件`configuration.ts`

  ```typescript
  import { readFileSync } from 'fs';
  import * as yaml from 'js-yaml';
  import { join } from 'path';
  
  const YAML_CONFIG_FILENAME = 'config.yml';
  const filePath = join(__dirname, YAML_CONFIG_FILENAME);
  
  export default () => {
    return yaml.load(readFileSync(filePath, 'utf8'));
  };
  ```

- 调用`forRoot`中的load方法

  ```typescript
  import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  import { ConfigModule } from '@nestjs/config';
  import Configuration from './config/configuration'; // 这里调整
  
  @Module({
    imports: [
      ConfigModule.forRoot({
        load: [Configuration], // load方法
      }),
    ],
    controllers: [AppController],
    providers: [AppService],
  })
  export class AppModule {}
  ```

- 修改`app.controller.ts`中的代码：

  ```typescript
  import { Controller, Get } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { AppService } from './app.service';
  import { DatabaseConfig } from './interface';
  
  @Controller()
  export class AppController {
    constructor(
      private readonly appService: AppService,
      private configService: ConfigService,
    ) {}
  
    @Get()
    getHello(): string {
      const db = this.configService.get<DatabaseConfig>('db');
      console.log(db);
      return this.appService.getHello();
    }
  }
  ```

- 定义`src/interface.ts`：

  ```typescript
  export interface DatabaseConfig {
    postgres: PostgresConfig;
    sqlite: SqliteConfig;
  }
  
  export interface PostgresConfig {
    url: string;
    port: number;
    database: string;
  }
  
  export interface SqliteConfig {
    database: string;
  }
  ```

- 最后测试：

  ```
  {
    postgres: { url: 'localhost', port: 5432, database: 'yaml-db' },
    sqlite: { database: 'sqlite.db' }
  }
  ```




## 使用`config`库解析

步骤：

- 安装第三方包`config`

  ```bash
  npm i config -S
  npm i cross-env -D
  ```

- 新建 配置文件`config/default.json`，同样还可以建立`development.json`, `production.json`

  ```json
  {
    "server": {
      "happy": "my default value"
    }
  }
  ```

  `development.json`:

  ```json
  {
    "server": {
      "port": 3001,
      "host": "localhost",
      "username": "test",
      "password": "test"
    }
  }
  ```

  `production.json`:

  ```json
  {
    "server": {
      "port": 3002,
      "host": "localhost",
      "username": "prod",
      "password": "prod"
    }
  }
  ```

  在`app.controller.ts`中使用：

  ```typescript
  import { Controller, Get } from '@nestjs/common';
  import { AppService } from './app.service';
  import * as config from 'config';
  
  @Controller()
  export class AppController {
    constructor(private readonly appService: AppService) {}
  
    @Get()
    getHello(): string {
      const server = config.get('server');
      console.log(server);
      return this.appService.getHello();
    }
  }
  ```

- 配置脚本：

  ```bash
  "start:dev": "cross-env NODE_ENV=development nest start --watch",
  "start:prod": "cross-env NODE_ENV=production node dist/main",
  ```

- 运行结果：

  ```bash
  ➜ npm run start:dev
  {
    happy: 'my default value',
    port: 3001,
    host: 'localhost',
    username: 'test',
    password: 'test'
  }
  
  ➜ npm run start:prod
  
  > nestjs-common-template@0.0.1 start:prod /Users/macos/Projects/nestjs/nestjs-common-template
  > cross-env NODE_ENV=production node dist/main
  
  {
    happy: 'my default value',
    port: 3002,
    host: 'localhost',
    username: 'prod',
    password: 'prod'
  }
  ```

  

  


## 配置验证

配置验证，主要是指在应用程序启动时，如果没有提供所需的环境变量或不符合某些验证规则，就会抛出一个异常。`@nestjs/config`包实现了两种不同的方式来实现这一点。

- `Joi`内置验证器。通过[Joi](https://www.npmjs.com/package/joi)，你可以定义一个对象模式，并根据它验证JavaScript对象
- 一个自定义的`validate()`函数，它将环境变量作为输入



### Joi用法

特别说明：

- 最新版本的`joi`需要你运行Node v12或更高版本。旧版本的node请安装`v16.1.8`。这主要是因为在`v17.0.2`发布后，在构建的时候会出现错误。更多信息请参考其17.0.0发布说明，[点击这里](https://joi.dev/resources/changelog/)。
- joi最好配合官方的`@nestjs/config`进行使用

步骤：

- 安装依赖

  ```
  npm install --save joi
  ```

- 定义验证Schema：

  ```typescript
  import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  import * as Joi from 'joi';
  import { ConfigModule } from '@nestjs/config';
  
  const envPath = `.env.${process.env.NODE_ENV || 'development'}`;
  
  @Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath: envPath,
        // 这里多了一个属性：validationSchema
        validationSchema: Joi.object({
          NODE_ENV: Joi.string()
            .valid('development', 'production', 'test', 'provision')
            .default('development'),
          PORT: Joi.number().default(3000),
          DATABASE_USER: Joi.string().required()
        }),
      }),
    ],
    controllers: [AppController],
    providers: [AppService],
  })
  export class AppModule {}
  
  ```

- 验证测试

  配置`错误`脚本：

  ```
  "start:dev": "cross-env NODE_ENV=development PORT=toimc nest start --watch",
  ```

  配置正确的脚本：

  ```
  "start:dev": "cross-env NODE_ENV=development PORT=3000 nest start --watch",
  ```

  测试命令

  ```
  npm run start:dev
  ```

  错误的提示：

  ```bash
  [下午7:33:38] Found 0 errors. Watching for file changes.
  
  /Users/macos/Projects/nestjs/nestjs-common-template/node_modules/_@nestjs_config@0.6.3@@nestjs/config/dist/config.module.js:61
                  throw new Error(`Config validation error: ${error.message}`);
                  ^
  
  Error: Config validation error: "PORT" must be a number
      at Function.forRoot (/Users/macos/Projects/nestjs/nestjs-common-template/node_modules/_@nestjs_config@0.6.3@@nestjs/config/dist/config.module.js:61:23)
      at Object.<anonymous> (/Users/macos/Projects/nestjs/nestjs-common-template/dist/app.module.js:21:35)
      at Module._compile (internal/modules/cjs/loader.js:1063:30)
      at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
      at Module.load (internal/modules/cjs/loader.js:928:32)
      at Function.Module._load (internal/modules/cjs/loader.js:769:14)
      at Module.require (internal/modules/cjs/loader.js:952:19)
      at require (internal/modules/cjs/helpers.js:88:18)
      at Object.<anonymous> (/Users/macos/Projects/nestjs/nestjs-common-template/dist/main.js:4:22)
      at Module._compile (internal/modules/cjs/loader.js:1063:30)
  ```

  或者修改`.env.development`中的配置信息：

  ```
  DATABASE_USER=
  DATABASE_PASSWORD=test123
  ```

  错误提示：

  ```bash
  /Users/macos/Projects/nestjs/nestjs-common-template/node_modules/_@nestjs_config@0.6.3@@nestjs/config/dist/config.module.js:61
                  throw new Error(`Config validation error: ${error.message}`);
                  ^
  
  Error: Config validation error: "DATABASE_USER" is not allowed to be empty
      at Function.forRoot (/Users/macos/Projects/nestjs/nestjs-common-template/node_modules/_@nestjs_config@0.6.3@@nestjs/config/dist/config.module.js:61:23)
      at Object.<anonymous> (/Users/macos/Projects/nestjs/nestjs-common-template/dist/app.module.js:21:35)
      at Module._compile (internal/modules/cjs/loader.js:1063:30)
      at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
      at Module.load (internal/modules/cjs/loader.js:928:32)
      at Function.Module._load (internal/modules/cjs/loader.js:769:14)
      at Module.require (internal/modules/cjs/loader.js:952:19)
      at require (internal/modules/cjs/helpers.js:88:18)
      at Object.<anonymous> (/Users/macos/Projects/nestjs/nestjs-common-template/dist/main.js:4:22)
      at Module._compile (internal/modules/cjs/loader.js:1063:30)
  ```

结论：使用`Joi`可以很方便对传入应用程序的参数进行验证，可以限制传入的数据类型。



除了上面写的验证以外，还可以加入以下属性来验证输入的**命令参数**：

```typescript
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envPath,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_USER: Joi.string().required()
      }),
      validationOptions: { // 这里加
        allowUnknown: false,
        abortEarly: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

`@nestjs/config`包使用的默认设置是：

- `allowUnknown`：控制是否允许在环境变量中使用未知键。默认为true；
- `abortEarly`：如果为true，则在第一个错误时停止验证；如果为false，则返回所有错误。默认值为false；



注意上面的Joi的用法：

- 主要是校验`process.env`传入的参数
- 主要是校验`envFilePath`初次加载的时候的参数



### 使用`class-validator`

步骤：

- 安装依赖`class-validator`与`class-transformer`

  ```
  npm i class-validator class-transformer
  ```

- 配置效验文件`src/env.validation.ts`

  ```typescript
  import { plainToClass } from 'class-transformer';
  import { IsEnum, IsNumber, validateSync } from 'class-validator';
  
  enum Environment {
    Development = "development",
    Production = "production"
  }
  
  class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;
  
    @IsNumber()
    PORT: number;
  }
  
  export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(
      EnvironmentVariables,
      config,
      { enableImplicitConversion: true },
    );
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });
  
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  }
  ```

- 调整`app.module.ts`文件

  ```typescript
  import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  import { ConfigModule } from '@nestjs/config';
  import { validate } from './env.validation';
  
  const envPath = `.env.${process.env.NODE_ENV || 'development'}`;
  
  @Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath: envPath,
        validate,
      }),
    ],
    controllers: [AppController],
    providers: [AppService],
  })
  export class AppModule {}
  ```

与使用`Joi`验证结果一致。



## 小结 

  - 使用第三方的包`config`，可以方便的读取配置信息，但是校验却需要在读取的位置来加，对于不需要验证，而需要全局使用的配置项可以使用这种方式；

  - 官方的`@nestjs/config`可以方便的导入`.env`的文件，同时结合`js-yaml`也可以导入`yaml`格式的配置。

    配置灵活，而且可以配合验证工具`Joi`进行参数的验证（推荐）

    自定义的校验第三方包`class-validator`这里只是冰山一角，后面在学习数据验证的时候还会使用到它；

  