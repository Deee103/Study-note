# Redis文档

## 常见问题

1. 数据库 vs Redis，有什么优缺点？为什么不直接把 Redis 当成是数据库来读写？

   数据库支持：数据持久性、事务支持、复杂查询支持，缺点是读取速度上与内存相比差很多，可扩展性上价格贵；

   Redis：读取速度快、易扩展、数据结构丰富，但是数据容量受限、成本也高、持久性会存在问题；

   虽然 Redis 可以进行数据的读写操作，但由于其设计初衷是作为快速的内存数据存储系统，不具备传统数据库的一些关键特性，如复杂的事务处理、关系数据处理等。此外，Redis 的数据持久性和一致性保障不如关系数据库严格，因此它通常不适合作为主数据库来存储关键业务数据。

2. 为什么 Redis 适合替代数据库的读取？

   由于 Redis 的高速读取能力，它非常适合作为数据库的缓存层，尤其在高读取、低写入的场景中。当应用需要频繁读取同一数据时，使用 Redis 可以大幅减少对数据库的访问次数，从而减轻数据库的压力并提高总体性能。

3. Redis 适合写吗？写的性能为何不如数据库？

   Redis 也支持数据的写入操作，写入性能通常很高，因为它是直接操作内存。然而，与传统数据库相比，Redis 在以下方面可能存在不足：

   **数据安全性**：在默认配置下，如果在数据写入到磁盘之前服务器发生故障，那么最近写入的数据可能会丢失；

   **写入瓶颈**：在大量写入操作时，虽然 Redis 本身处理速度快，但持久化过程（如 RDB 快照或 AOF 日志记录）可能成为性能瓶颈。



## Redis客户端比较

`node-redis`（也称为 `redis`）和 `ioredis` 是两个流行的 Node.js 库，用于与 Redis 数据库交互。它们都提供了丰富的 API 来操作 Redis，并且都可以在生产环境中广泛使用。不过，它们在一些关键方面有所不同，以下是这两个库的主要区别：

1. 功能性和 API 设计

- **ioredis**:
  - 支持所有 Redis 命令，并且频繁更新以支持最新的 Redis 特性。
  - 支持 Redis 集群、哨兵模式和流水线（pipeline）。
  - 提供了更多的自定义选项和高级特性，如自动重连、离线队列和 Lua 脚本支持。
  - API 设计支持使用 Promises，可以很好地与现代的异步编程模式配合使用。
- **node-redis**:
  - 传统上被认为是更“轻量级”的库，相比之下 API 较为简单。
  - 支持 Redis 的基本功能，包括订阅/发布模式和事务。
  - 最初只支持回调方式，但自从 v4.0.0 开始，也支持 Promises，使其与现代应用开发更为契合。

2. 集群支持

- **ioredis** 具备完整的集群支持。它可以直接连接到 Redis 集群，并自动处理节点间的重定向和故障转移。
- **node-redis** 在早期版本中并不直接支持集群，需要额外的库如 `redis-cluster` 来实现这一功能，但最新版本已开始增加对集群的支持。

3. 性能

- **性能比较**：`ioredis` 和 `node-redis` 在性能上通常很接近，<u>但由于 `ioredis` 提供了更多的功能和灵活性，它可能在某些复杂场景下表现稍微有些开销。</u>
- 不过，实际性能差异通常取决于具体使用场景。在大多数常规操作中，两者的性能差异不会太明显。

4. 社区支持和文档

- **ioredis** 拥有非常详尽的文档，覆盖了其提供的各种高级功能，对于需要深入了解和利用 Redis 高级特性的开发者非常有用。
- **node-redis** 的文档相对简洁，足以满足大多数基本使用情况。

5. 错误处理和连接管理

- **ioredis** 提供了更为复杂的错误处理和连接管理功能，如自动重新连接、故障转移等。
- **node-redis** 提供了基本的错误处理和连接管理，但没有 `ioredis` 那么全面。

**老师推荐：**如果你需要一个功能全面、支持集群和多种高级特性的客户端，并且不介意稍微复杂的配置，`ioredis` 是一个很好的选择



## Redis镜像

官方镜像：`https://hub.docker.com/_/redis`

第三方镜像：`https://hub.docker.com/r/bitnami/redis`

> 哪个镜像好？
>
> 官方镜像就只提供了一个redis-server命令
>
> bitnami提供了非常丰富的环境变量与功能，参考说明文档：https://github.com/bitnami/containers/blob/main/bitnami/redis/README.md



## Redis Docker-compose配置

其他示例：https://github.com/codewithrajranjan/awesome-docker-compose/redis

```yaml
version: "3.3"
services:
  redis:
    image: redis:latest
    container_name: redis
    restart: always
    volumes:
      - redis_volume_data:/data
    ports:
      - 6379:6379
      
  redis_insight:
    image: redislabs/redisinsight:latest
    container_name: redis_insight
    restart: always
    ports:
      - 8001:8001
    volumes:
      - redis_insight_volume_data:/db

volumes:
  redis_volume_data:
  redis_insight_volume_data:
```



## Redis桌面端客户端

https://goanother.com/cn/

![image-20240428142638987](https://static.www.toimc.com/blog/picgo/2024/04/28/image-20240428142638987-f6b27e.webp)

## Redis配置

官方配置列表：https://redis.io/docs/latest/operate/oss_and_stack/management/config/

- The self documented [redis.conf for Redis 7.2](https://raw.githubusercontent.com/redis/redis/7.2/redis.conf).
- The self documented [redis.conf for Redis 7.0](https://raw.githubusercontent.com/redis/redis/7.0/redis.conf).
- The self documented [redis.conf for Redis 6.2](https://raw.githubusercontent.com/redis/redis/6.2/redis.conf).
- The self documented [redis.conf for Redis 6.0](https://raw.githubusercontent.com/redis/redis/6.0/redis.conf).
- The self documented [redis.conf for Redis 5.0](https://raw.githubusercontent.com/redis/redis/5.0/redis.conf).
- The self documented [redis.conf for Redis 4.0](https://raw.githubusercontent.com/redis/redis/4.0/redis.conf).
- The self documented [redis.conf for Redis 3.2](https://raw.githubusercontent.com/redis/redis/3.2/redis.conf).
- The self documented [redis.conf for Redis 3.0](https://raw.githubusercontent.com/redis/redis/3.0/redis.conf).
- The self documented [redis.conf for Redis 2.8](https://raw.githubusercontent.com/redis/redis/2.8/redis.conf).
- The self documented [redis.conf for Redis 2.6](https://raw.githubusercontent.com/redis/redis/2.6/redis.conf).
- The self documented [redis.conf for Redis 2.4](https://raw.githubusercontent.com/redis/redis/2.4/redis.conf).

官方配置：https://redis.io/docs/latest/operate/oss_and_stack/management/config-file/

7.2官方配置：https://raw.githubusercontent.com/redis/redis/7.2/redis.conf



Redis 目录下有一个`redis.conf` 配置文件，里面会有Redis 的默认配置，通过修改该配置，可以对Redis 达到一定程度的优化；或者根据业务的不同也可以修改该配置文件。

以下为redis 的部分配置文件以属性值：

| 配置名                        | 含义                                                         | 默认值                                            | 可选值                                                       | 是否支持热生效                 |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 常规配置                      |                                                              |                                                   |                                                              |                                |
| daemonize                     | 是否是守护进程                                               | no                                                | yes\|no                                                      | 不支持                         |
| supervised                    | 是upstart还是systemd接管redis进程                            | no                                                | no\|upstart\|systemd\|auto                                   | 不支持                         |
| pidfile                       | 进程文件                                                     | /var/run/redis.pid                                | 可自定义文件路径                                             | 不支持                         |
| loglevel                      | 日志级别                                                     | notice                                            | debug\|verbose\|notice\|warning                              | 可以                           |
| logfile                       | 日志文件路径                                                 | 空                                                | 自定义                                                       | 不支持                         |
| syslog-enabled                | redis系统日志                                                | no                                                | yes\|no                                                      | 不支持                         |
| syslog-facility               | 系统日志facility                                             | local0                                            | local0-local7                                                | 不支持                         |
| databases                     | 可用的数据库数                                               | 16                                                | 整数                                                         | 不支持                         |
| 文件引用                      |                                                              |                                                   |                                                              |                                |
| include                       | 包含外部的配置文件                                           | 空                                                | 可自定义文件路径                                             | 不支持                         |
| 网络                          |                                                              |                                                   |                                                              |                                |
| bind                          | 如果不配置，则可接受来自于所有网络的连接                     | 127.0.0.1                                         | ip\|多个ip                                                   | 不支持                         |
| protected-mode                | 可与bind 组合使用，默认开启，如果redis 没有设置密码，同时bind为空，则在使用客户端连接的时候会进行提示 | yes                                               | yes\|no                                                      | 不支持                         |
| unixsocket                    | unix套接字                                                   | 空（不通过unix 套接字来监听）                     | 指定套接字文件                                               | 不支持                         |
| unixsocketperm                | unix套接字权限                                               | 0                                                 | Linux三位数权限                                              | 不支持                         |
| timeout                       | 客户端N秒没有发送数据，自动断开连接 默认禁用                 | 0                                                 | 整数                                                         | 不支持                         |
| tcp-keepalive                 | 如果值非0，单位是秒 表示将周期性的使用SO_KEEPALIVE检测客户端是否还处于健康状态 避免服务器一直阻塞，官方给出的建议值是300S（3.2.1之后） | 0                                                 | 整数                                                         | 不支持                         |
| RDB快照                       |                                                              |                                                   |                                                              |                                |
| save                          | RDB的保存条件 900秒更新了一个key 300秒更新了10个key 60秒更新了10000个key 都会进行rdb 保存 | save 900 1 save 300 10 save 60 10000              | 如果没有该配置 则使用自动RDB策略                             | 支持                           |
| stop-writes-on-bgsave-error   | bgsave执行错误 是否停止Redis接收写请求                       | yes                                               | yes\|no                                                      | 支持                           |
| rdbcompression                | RDB文件是否压缩                                              | yes                                               | yes\|no                                                      | 支持                           |
| rdbchecksum                   | RDB文件是否使用校验和                                        | yes                                               | yes\|no                                                      | 支持                           |
| dbfilename                    | RDB文件名称                                                  | dump.rdb                                          | 自命名 建议使用dump-{port}.rdb                               | 支持                           |
| dir                           | RDB文件存放目录                                              | redis安装目录                                     | 自定义文件路径                                               | 支持                           |
| 主从复制                      |                                                              |                                                   |                                                              |                                |
| slaveof                       | 指定当前从节点复制哪个主节点                                 | 空                                                | ip port                                                      | 不支持 但可以用slaveof命令设置 |
| requirepass                   | 密码                                                         | 空                                                | 自定义                                                       | 支持                           |
| masterauth                    | 主节点密码                                                   | 空                                                | 主节点的密码                                                 | 支持                           |
| slave-serve-stale-data        | 当从节点与主节点连接中断时，如果此参数设置为yes 则从节点可以继续处理客户端的请求。 否则除info和slaveof命令之外，拒绝所有的请求并统一回复： "SYNC with master in progress" | yes                                               | yes\|no                                                      | 支持                           |
| slave-read-only               | 从节点是否只读                                               | yes                                               | yes\|no                                                      | 支持                           |
| repl-diskless-sync            | 是否开启无盘复制                                             | no                                                | yes\|no                                                      | 支持                           |
| repl-diskless-sync-delay      | 开启无盘复制后，延迟多少秒后进行RDB的操作，一般用于同时加入多个从节点时，保证多个从节点共享RDB | 5                                                 | 整数                                                         | 支持                           |
| repl-ping-slave-period        | 主节点定期向从节点发送ping命令，用来判断从节点是否存活（单位：秒） | 10                                                | 整数                                                         | 支持                           |
| repl-timeout                  | 主节点复制超时时间，秒                                       | 60                                                | 整数                                                         | 支持                           |
| repl-disable-tcp-nodelay      | 是否开启主从复制socket的NO_DELAY选项： yes:Redis会合并小的TCP包来节省带宽，但是这要增加同步延迟，造成主从 数据不一致； no:主节点会立即同步数据，没有延迟。 | no                                                | yes\|no                                                      | 支持                           |
| repl-backlog-size             | 复制积压缓冲区大小                                           | 1M                                                | 整数                                                         | 支持                           |
| repl-backlog-ttl              | 主节点在没有从节点的情况下多久后释放复制积压缓存区空间       | 3600                                              | 整数                                                         | 支持                           |
| slave-priority                | 从节点的优先级                                               | 100                                               | 0-100                                                        | 支持                           |
| min-slaves-to-write           | 当主节点发现从节点数量小于min-slaves-to-write 且延迟小于等于min-slaves-max-lag时，master停止写操作。 | 0                                                 | 整数                                                         | 支持                           |
| min-slaves-max-lag            | 10                                                           | 整数                                              | 支持                                                         |                                |
| slave-announce-ip             | Redis Sentinel可以使用该信息来发现slave实例。                | 空                                                | ip                                                           | 支持                           |
| slave-announce-port           | 空                                                           | port                                              | 支持                                                         |                                |
| 安全                          |                                                              |                                                   |                                                              |                                |
| requirepass                   | 密码                                                         | 空                                                | 自定义                                                       | 支持                           |
| 内存策略                      |                                                              |                                                   |                                                              |                                |
| maxclients                    | 最大客户端连接数                                             | 10000                                             | 整数                                                         | 支持                           |
| maxmemory                     | 节点的最大内存                                               | 无限制                                            | 不能大于物理内存                                             | 支持                           |
| maxmemory-policy              | redis 内存淘汰策略                                           | noeviction                                        | volatile-lru：在设置过期时间的key中，剔除最少使用的key allkeys-lru：在所有的key中剔除最少使用的Key volatile-random：在过期时间key中，随机剔除 allkeys-random：在所有的key中，随机剔除 volatile-ttl：在设置过期的key中，优先剔除即将过期的key noeviction：不做任何操作，直接返回oom异常 | 支持                           |
| maxmemory-samples             | 上面LRU和最小TTL策略并非严谨的策略，而是大约估算的方式，因此可以选择取样值以便检查 | 5                                                 | 整数                                                         | 支持                           |
| AOF相关配置                   |                                                              |                                                   |                                                              |                                |
| appendonly                    | 是否开启AOF持久化模式                                        | no                                                | yes\|no                                                      | 支持                           |
| appendfilename                | aof文件名称                                                  | appendonly.aof                                    | 建议：appendonly-{port}.aof                                  | 不支持                         |
| appendfsync                   | aof同步磁盘频率                                              | everysec                                          | everysec\|always\|no                                         | 支持                           |
| no-appendfsync-on-rewrite     | 设置为yes，表示rewrite期间对新的写操作不fsync，暂时放入缓冲区，等rewrite完成之后再写入 | no                                                | yes\|no                                                      | 支持                           |
| auto-aof-rewrite-percentage   | 触发rewrite的AOF文件增长比例条件                             | 100                                               | 整数                                                         | 支持                           |
| auto-aof-rewrite-min-size     | 触发rewrite的AOF文件最小阀值（单位：兆）                     | 64                                                | 整数+m                                                       | 支持                           |
| aof-load-truncated            | 加载AOF文件时，是否忽略AOF文件不完整的情况                   | yes                                               | yes\|no                                                      | 支持                           |
| Lua脚本                       |                                                              |                                                   |                                                              |                                |
| lua-time-limit                | Lua脚本超时时间单位：毫秒                                    | 5000                                              | 整数，但是此超时不会真正停止脚本运行                         | 支持                           |
| Redis集群                     |                                                              |                                                   |                                                              |                                |
| cluster-enabled               | 是否开启redis 集群                                           | yes                                               | yes\|no                                                      | 不支持                         |
| cluster-config-file           | 集群配置文件                                                 | nodes-6379.conf                                   | nodes-{port}.conf                                            | 不支持                         |
| cluster-node-timeout          | 集群节点超时时间，单位毫秒                                   | 15000                                             | 整数                                                         | 支持                           |
| cluster-slave-validity-factor | 从节点有效性判断因子，当从节点与主节点最后通信时间超过(cluster-node-timeout * slave-validity-factor + repl-ping-slave-period)时，对应从 节点不具备故障转移资格，防止断线时间过长的从节点进行故障转称。设置为0表示从节点永不过期。 | 10                                                | 整数                                                         | 支持                           |
| cluster-migration-barrier     | 主从节点切换需要的从节点数最小个数。                         | 1                                                 | 整数                                                         | 支持                           |
| cluster-require-full-coverage | 集群是否需要所有的slot都分配给在线节点。才能正常访问。       | yes                                               | yes\|no                                                      | 不支持                         |
| 慢查询                        |                                                              |                                                   |                                                              |                                |
| slowlog-log-slower-than       | 慢查询被记录的阀值。单位：微秒                               | 10000                                             | 整数                                                         | 支持                           |
| slowlog-max-len               | 慢查询记录的条数。                                           | 128                                               | 整数                                                         | 支持                           |
| latency-monitor-threshold     | Redis服务内存延迟监控，0代表关闭                             | 0                                                 | 整数                                                         | 支持                           |
| 高级选项                      |                                                              |                                                   |                                                              |                                |
| hash-max-ziplist-entries      | hash数据结构优化参数                                         | 512                                               | 整数                                                         | 支持                           |
| hash-max-ziplist-value        | hash数据结构优化参数                                         | 64                                                | 整数                                                         | 支持                           |
| list-max-ziplist-size         | list数据结构优化参数                                         | -2                                                | -5\|-4\|-3\|-2\|-1                                           | 支持                           |
| list-compress-depth           | list数据结构优化参数，0代表不可用                            | 0                                                 | 0\|1\|2\|3                                                   | 支持                           |
| set-max-intset-entries        | set数据结构优化参数                                          | 512                                               | 整数                                                         | 支持                           |
| zset-max-ziplist-entries      | zset数据结构优化参数                                         | 128                                               | 整数                                                         | 支持                           |
| zset-max-ziplist-value        | zset数据结构优化参数                                         | 64                                                | 整数                                                         | 支持                           |
| hll-sparse-max-bytes          | hyperLogLog数据结构优化参数                                  | 3000                                              | 整数                                                         | 支持                           |
| client-output-buffer-limit    | 客户端输出缓冲区限制                                         | normal 0 0 slave 256mb 64mb 60 pubsub 32mb 8mb 60 | 整数                                                         | 支持                           |