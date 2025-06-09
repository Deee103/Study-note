### 一、问题：

配置eslint和**prettier** 时，频频报错：Delete `␍`eslint([prettier](https://so.csdn.net/so/search?q=prettier&spm=1001.2101.3001.7020 "prettier")/[prettier](https://so.csdn.net/so/search?q=prettier&spm=1001.2101.3001.7020))，vscode全页面爆红。

经过多次尝试与试验后，最终多种方式结合解决了这个问题。
### 二、报错原因是：

安装了**prettier** 插件指定了文件结尾的[换行符](https://so.csdn.net/so/search?q=%E6%8D%A2%E8%A1%8C%E7%AC%A6&spm=1001.2101.3001.7020 "换行符")与系统的不一样所导致的。

Windows在换行的时候，同时使用了回车符CR和[换行符](https://so.csdn.net/so/search?q=%E6%8D%A2%E8%A1%8C%E7%AC%A6&spm=1001.2101.3001.7020)LF，即[CRLF](https://so.csdn.net/so/search?q=CRLF&spm=1001.2101.3001.7020 "CRLF"); 而项目仓库中默认是Linux环境下提交的代码，文件默认是以LF结尾的，这也是工程化的需要。
### 三、解决办法

配置.prettierrc文件，

在文件对象中添加下面的配置即可，然后重启

```XML
"endOfLine": "auto"
```