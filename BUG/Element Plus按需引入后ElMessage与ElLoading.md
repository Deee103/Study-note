按照以下步骤解决Element Plus按需引入后ElMessage与ElLoading找不到的名称问题：

### 步骤一：创建全局声明文件

1. 在项目的根目录下新建一个名为 `Element-puls.d.ts` 的文件。
2. 在文件中加入以下内容：

```typescript
declare global {
  const ElMessage: typeof import('element-plus')['ElMessage'];
  const ElLoading: typeof import('element-plus')['ElLoading'];
}
export {}
```

### 步骤二：修改tsconfig.json

1. 打开项目的 `tsconfig.json` 文件，找到 `include` 部分。
2. 在 `include` 数组中添加 `Element-puls.d.ts`，确保路径正确。例如：

```json
{
    "include": [
        "src/**/*.ts",
        "src/**/*.d.ts",
        "src/**/*.tsx",
        "src/**/*.vue",
        "Element-puls.d.ts"
    ]
}
```

### 步骤三：验证配置

1. 保存所有修改后，重启开发服务器以确保新的类型声明生效。
2. 在项目中使用ElMessage和ElLoading时，不再出现“找不到名称”错误。

通过以上步骤，你应能优雅地解决问题，无需安装额外包，仅需五行代码。