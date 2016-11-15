# SSO ( Single Sign On ) 单点登录

[![Travis](https://img.shields.io/travis/cloudinsight/sso.svg?style=flat-square)](https://travis-ci.org/cloudinsight/sso)

`Cloudinsight` 所用的单点登录插件, 只需要在页面里引入对应的 JS 文件就可以在页面上显示跟登录相关的一些功能，
例如导航条和文档链接。

## 例子

> ![](./docs/after.png)

## 使用

**需要哪个组件就在页面中引入对应的文件就可以了**

| 文件                    | 对应组件                    |
|-------------------------|----------------------------|
| `dist/nav.js`           | 顶部快速跳转                |
| `dist/footer.js`        | 底部超链接                  |

## 相关的技术

- 栈格系统基于 `purecss`
- 使用了 `css-modules` 技术， 不会污染全局的 `css`
- 相关图片使用了 `data-url` 编码
- 使用 `ES6` 编写，并用 `webpack` 打包

## 开发

```sh
npm install
npm start
open http://127.0.0.1:8080/
```
