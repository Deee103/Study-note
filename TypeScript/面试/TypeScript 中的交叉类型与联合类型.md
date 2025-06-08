
# TypeScript 中的交叉类型与联合类型

## 联合类型（Union Types）

### 基本语法
```typescript
type Status = 'success' | 'error' | 'pending';
```

### 主要特点
- 用 `|` 分隔多个类型
- 表示取值可以是多种类型中的一种
- 类型系统会自动进行类型收窄（Type Narrowing）

### 实际应用
```typescript
function printId(id: number | string) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
```

| 特性 | 说明 |
|------|------|
| 类型推断 | 访问成员时只能访问共有的属性/方法 |
| 类型守卫 | 常用于 `typeof`/`instanceof`/字面量检查 |
| 默认行为 | 未窄化时只能使用联合类型的公共方法 |

## 交叉类型（Intersection Types）

### 基本语法
```typescript
type Admin = Person & Permission;
```

### 主要特点
- 用 `&` 连接多个类型
- 将多个类型合并为一个类型（相当于并集）
- 新类型将包含所有类型的特性

### 实际应用
```typescript
interface Button {
  label: string;
  onClick: () => void;
}

interface Icon {
  icon: string;
}

type IconButton = Button & Icon;
// 等价于：
// { label: string; onClick: () => void; icon: string }
```

| 特性 | 说明 |
|------|------|
| 类型合并 | 同名属性会被合并为交叉类型 |
| 冲突处理 | 基础类型的同名属性会变成 `never` |
| 常用场景 | mixin模式/合并第三方类型定义 |

## 核心区别对比

| 对比维度       | 联合类型(`|`)            | 交叉类型(`&`)            |
|---------------|-------------------------|-------------------------|
| 语义           | "或"关系                | "与"关系                |
| 类型结构       | 创建类型选项             | 合并类型特征            |
| 成员访问       | 只能访问共有成员         | 可以访问所有成员        |
| 常用操作       | 类型收窄                | 类型扩展                |
| 典型应用场景   | 状态字段/错误处理       | 组合对象/Mixin模式      |

## 组合使用示例

```typescript
type User = { name: string } & ({ 
  role: 'admin'; 
  access: string[] 
} | { 
  role: 'user';
  lastLogin: Date 
});

function handleUser(user: User) {
  console.log(user.name);  // 公共属性
  if (user.role === 'admin') {
    console.log(user.access);  // 类型收窄
  } else {
    console.log(user.lastLogin);
  }
}
```
```