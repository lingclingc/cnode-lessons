目标：学习使用package.json来管理Node.js项目  

另外，此节通过 在sublimetext3中安装markdown editing来高效编辑markdown文件  

安装了sublimegit来快速的提交版本；

git 提交的时候需要将文件先`staged`，然后在本地`commit`，然后再`push`到`github`上

使用
``` shell
$npm init 
```
来初始化一个package.json文件

使用
```shell
$npm install express utility --save
```
来安装依赖
其中`--save`会在安装依赖的同时，将依赖写入package.json文件

关于这些依赖是做什么的，可以上npmjs官网查看，有详细的说明
