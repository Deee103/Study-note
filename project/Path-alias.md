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
