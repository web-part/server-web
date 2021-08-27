# @webpart 自动化开发工具

> @webpart 是一套用于辅助 web 开发者快速构建和开发 web 页面的 node 工具包，主要包括了用于编译母版页与 html 片段树、自动动态批量引入和编译 css、less、html 片段、js 等资源的核心功能的 `@webpart/master` 工具包。整套自动化开发工具解决了辅助生成源代码的问题，输出符合 W3C 标准的 HTML、CSS、JS 源代码，就如同是人写出来的一样易读，把开发者从繁杂而重复的工作中解放出来，提高前端团队成员间的分工与协作效率。

## 1  特点
 - 纯 node 编写。
 - 配置多样化。
 - 命令简单化。
 - 输出日志详尽。
 - 开发环境和构建环境独立。
 - 智能化。
 - 项目数据管理的可视化。

## 2 框架架构
![](http://www.definejs.com/data/upload/paste/2021-08-23/113516-7CBD.png)

## 3 组成部分

### 3.1 核心工具 
 - 包名：`@webpart/master`
 - 作用：html 片段化开发的核心工具包，用于辅助 web 开发者快速开发和构建 web 页面，主要包含了以下功能模块：

#### 3.1.1 单个静态文件的监控与编译
 - 单个静态 css 文件的监控。
 - 单个静态 less 文件的监控与编译。
 - 单个静态 html 片段文件的监控与混入（编译）。
 - 单个静态 js 文件的监控与编译（babel转换时用到编译）。

####  3.1.2 批量动态文件的监控与编译
 - 批量动态 html 片段树的监控与混入（编译）。
 - 批量动态 less 文件的监控与编译。
 - 批量动态 js 文件的监控与编译（babel转换时用到编译）。
 
####  3.1.3 静态页面的生成
从母版页开始，编译所有关联的资源文件，生成最终的、可在浏览器运行的静态页面。

####  3.1.4 单独包的生成
> 把首屏视图中不需要用到的模块、视图和资源等剥离出去单独打包，在需要到时再加载到单页中运行，让首屏加载瘦身，提高加载速度，提升用户体验。

使用单独打包模式命令选项时，将指定的一组资源文件分别打包成相应类型的静态文件和一个配置 json 文件。


####  3.1.5 网站的构建与优化

构建生产环境的代码，主要包括文件合并、代码压缩、清理无用文件和空目录等，尽一切可能进行优化、瘦身，以提高生产环境的产品质量和用户体验。

### 3.2 开发服务器 
 - 包名：`@webpart/server`
 - 作用：用于开发阶段的本地 web 服务器。
 - 安装：`npm install @webpart/server`   
   此工具包由命令行工具 `@webpart/cli` 调用，无需单独安装。

### 3.3 命令行工具 
 - 包名：`@webpart/cli`   
 - 作用：webpart 提供了一整套配套的命令行工具，包含了日常开发中常用到的功能，以便提高开发效率。

#### 3.3.1 安装

建议使用全局安装命令行工具，以便在任意目录都可以全局地使用 `webpart` 命令。

`npm install -g @webpart/cli` 

安装成功后，即可开始使用以下命令列表：

#### 3.3.2 命令列表


 - `webpart init <template-name> [project-name]` 使用指定的模板初始化一个项目。
 - `webpart watch` 编译整个网站项目，完成后开启对文件进行监控。
 - `webpart build` 编译整个网站项目以用于生产环境。
 - `webpart parse` 解析整个网站项目。
 - `webpart server` 用默认端口以当前目录为根目录创建一个服务器。
 - `webpart info <id>` 显示指定模块的信息。
 - `webpart list [id]`  默认显示指定 id 或所有的模块列表。
 - `webpart pair [id]` 把 js 模块和 html 模块作匹配。
 - `webpart rename <id> <new-id>` 对指定模块及所有子模块进行重命名。
 - `webpart require <id>` 获取指定模块的依赖关系。
 - `webpart tree [id]` 显示指定模块或所有模块的模块树组织架构图。
 - `webpart find [id]` 查找指定的模块或全部模块。
 - `webpart babel <src-file> [dest-file]`  把指定的源文件作 babel 转码后输出到目标文件。
 - `webpart md5 [patterns]` 显示当前工作目录下指定模式的所有文件的 md5 值。
 - `webpart minify <src-file> [dest-file]` 压缩指定的源文件，并输出到目标文件（如果指定）。

### 3.4 统计工具

 - 包名：` @webpart/stat`
 - 作用：统计开发阶段中的文件信息和用 Tree-CMD 模式定义的模块信息。
 - 安装：`npm install @webpart/stat`
   此工具包由 `@webpart/cli` 中调用，无需单独安装。
 
### 3.5 插件工具

> 为了使用项目能应用于不同的浏览器环境，`webpart` 使用了针对不同浏览器环境的差异化代码的插件机制进行处理。在编译或构建项目时，可以通过指定特定的选项来使用代码适应于指定的浏览器环境。

插件工具的名包均为 `@webpart/process-xxx` 的形式，主要包括：

#### 3.5.1 babel 转换 
包名：`@webpart/process-babel`   
此工具包仅由 `@webpart/process-compat` 调用使用。

用于对 js 内容或 js 文件做 babel 转换的插件，以便生成 `.babel.js` 文件或渲染成相应的 html 内容。


#### 3.5.2 兼容模式处理 
包名：`@webpart/process-compat`   
用于针对非标准浏览器的降级处理，主要针对运行在 PC 端低版本的 IE。 

##### 3.5.2.1 命令及选项
在命令上体现为带有 `-c` 或 `--compat` 选项，如：
 - `webpart watch --compat` 或 `webpart watch -c`  
 使用兼容模式编译整个网站项目，完成后开启对文件进行监控。此阶段仅用于开发阶段。
 - `webpart build --compat` 或 `webpart build -c`  
 使用兼容模式编译整个网站项目，生成优化后的代码，以用于生产环境。
 

##### 3.5.2.2 主要完成的功能
此处以开发阶段的命令 `webpart watch --compat` 为例进行说明。

 - 1，对最外层的 `<template>` 标签内的 innerHTML 用一层 `<script type="text/template"></script>` 包裹起来。
 - 2，删除所有元数据 `data-meta` 属性里含有 `mode="normal"` 的 `<script>` 标签。
 - 3，对符合条件的 `<script>` 标签做 babel 转码，修正 `src` 属性以引用到 babel 版本的文件。
 
##### 3.5.2.3 针对独立打包的方式
命令行中使用了 `webpart watch --compat --pack` 开头的的命令。  
主要完成的功能：
 - 1，对合并后、压缩前的 html 包文件进行 `<template>` 标签转换，参考上述的第 1 点。
 - 2，对合并后、压缩前的 js 包文件进行 babel 转换。
 
#### 3.5.3 标准模式处理
包名： `@webpart/process-normal`   
此工具包用于处理针对标准浏览器的项目代码。  
使用命令时，**不**含有 `compat` 参数。

主要完成的功能：
 - 删除所有元数据 `data-meta` 属性里含有 `mode="compat"` 的 `<script>` 标签。

#### 3.5.4 html 模板处理 
包名：`@webpart/process-template`  
此工具包仅由 `@webpart/process-compat` 调用使用。

用于对指定的 html 内容中所有首层的 `<template>` 标签进行转换，即把所有首层的 `<template>` 标签的 innerHTML 用一对 `<script type="text/template"></script>` 包裹起来。    

> 首层 `<template>` 标签是指它的所有父节点中，不存在 `<template>` 节点。  
换言之，如果一个 `<template>` 节点 A 位于另一个 `<template>` 节点 B 中，则节点 A 不属于首层 `<template>` 标签。  


### 3.6 模板工具

> 为了方便快速开始搭建一个项目，webpart 提供了若干套针对不同环境的网站模板，在项目开始开发之前，可以通过使用命令 `webpart init <template-name> [project-name]` 进行项目的初始化，初始化后的项目包含一些文件和目录，以便在此基础上进一步开发，避免完全从空白项目开始。

以下模板工具包仅由 `@webpart/cli` 调用和下载。

#### 3.6.1 默认模板 
 - 包名：`@webpart/template-default`
 - 用法：`webpart init default [project-name]`
 - 作用：用于创建针对 PC 端或移动端具有最简单初始文件的网站模板。

#### 3.6.2 pc 端标准模板 
 - 包名：`@webpart/template-pc`
 - 用法：`webpart init pc [project-name]`
 - 作用：用于创建针对 PC 端标准模式下的网站模板。


#### 3.6.3 pc 端兼容模板 
 - 包名：`@webpart/template-compat`
 - 用法：`webpart init compat [project-name]`
 - 作用：用于创建针对 PC 端兼容模式的网站的模板。


#### 3.6.4 移动端模板 
 - 包名：`@webpart/template-mobile`
 - 用法：`webpart init mobile [project-name]`
 - 作用：用于创建移动端标准模式的网站的模板。


### 3.7 日志
 - 包名：`@webpart/console`
 - 作用：在原生 console 的基础上增加输出日志到指定文件里的功能。