包管理器 npm （node package manage）
===============
npm 可以自动管理包的依赖. 只需要安装你想要的包, 不必考虑这个包的依赖包.
Node.js 的依赖是以项目为单位管理的，直接就安装在项目的 node_modules 目录下。

安装express
$ npm install express --registry=https://registry.npm.taobao.org
$ npm list  查看是否安装成功
$ node app.js 执行某个文件

端口号是一个 16位的 uint, 所以其范围为 1 to 65535 (对TCP来说, port 0 被保留，不能被使用. 对于UDP来说, source端的端口号是可选的， 为0时表示无端口).

