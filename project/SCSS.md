```node
npm i sass sass-loader --save-dev
```

## 配置SCSS全局共享变量
vite.config.js

``` js 
 css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 variables.scss 这样就可以在全局中使用 variables.scss中预定义的变量了
        // 给导入的路径最后加上 ; 
        additionalData: '@use "@/assets/style/variables.scss" as *;'
      }
    }
  }
```

