# demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 一、环境配置

##### 安装vue-cli

```
`npm install -g vue-cli`
```



##### 本机的本地电脑配置

1、 window host 路径：C:\Windows\System32\drivers\etc
2、 mac host 路径：直接用快捷键 command+shift+g，弹出框，输入 /etc/hosts

```
// 在host中添加
127.0.0.1 test.open-iot.tmall.com
```



##### 创建项目、安装开发环境

```
vue init aligenie-iot-team/genie-iot-cli my-project // 创建项目
cd my-project // 进入项目
npm install // 安装依赖
```



##### 开发调试

```
npm run dev // 运行项目
```



##### 打包、压缩、发布

1. ###### 本地代码打包

   ```text
   npm run build
   ```

2. ###### 安装lzip压缩包工具

   ```text
   // 全局安装 lzip
   npm install -g lzip
   ```

3. ###### 生成压缩包

   ```text
   // 在 my-project 处使用
   lzip
    
   // 在my-project 平级目录 生成压缩包 成功
   my-project.zip
    
   // 上传压缩包的格式说明
   my-project    （ 打包格式的一级目录为 my-project -> dist -> ... ）
       dist
           index.html
           app.css
           app.js
           ... 等等资源
   ```

   