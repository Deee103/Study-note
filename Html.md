# 页面导入样式时，使用link和@import有什么区别？
+ 区别1：link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；[@import](https://github.com/import)属于CSS范畴，只能加载CSS。
+ 区别2：link引用CSS时，在页面载入时同时加载；[@import](https://github.com/import)需要页面网页完全载入以后加载。所以会出现一开始没有css样式，闪烁一下出现样式后的页面(网速慢的情况下)
+ 区别3：link是XHTML标签，无兼容问题；[@import](https://github.com/import)是在CSS2.1提出的，低版本的浏览器不支持。
+ 区别4：link支持使用Javascript控制DOM去改变样式；而[@import](https://github.com/import)不支持。

# html的元素有哪些（包含H5）？区分出行内元素、块级元素、空元素并在后面简要标注下作用
**块级元素：**

+ head -
+ meat - 申明页面的诸多属性
+ title - 窗口标题
+ style - 样式
+ body - 文本内容
+ header - 头部块
+ section - 内容块
+ footer - 底部块
+ article - 文章标签
+ aside
+ nav
+ menu
+ bir
+ hr - 下划线
+ h1-h6 描述标题
+ div
+ p
+ ul
+ li
+ ol
+ oi
+ dl
+ dt
+ dd
+ form
+ table
+ theader
+ tbody
+ tr
+ th

**行内元素**

+ label
+ a
+ span
+ td
+ input
+ button
+ strong
+ b
+ i

**去除的元素**

+ font

![](https://gitee.com/dee1711/piclist/img/屏幕截图 2025-05-15 003625.png)