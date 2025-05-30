``` javascript
// vite.config.js
import { defineConfig } from 'vite';
import path from 'path'; // 导入 Node.js 的 path 模块
 
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 设置 @ 别名指向 src 目录
    },
  },
});
```

```
npm add -D @types/node
```


## vite + TS 项目
配置vite.config.js的同时还要配置tsconfig.json，还需要配置tsconfig.app.json和tsconfig.node.json，里面都要加上如下配置：
```json
"compilerOptions": {
	// ... 其他配置
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
    },
  },
```

