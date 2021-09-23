# 示例项目说明

`@webpart` 提供了一套完整的命令行工具和对应的可视化 web 管理界面。前者提供常用的命令来提升开发效率，后者提供可视化的界面进行项目管理，如展示模块的树结构、查找模块的依赖信息等。

可视化管理界面已集成到 `@webpart/cli` 命令行工具中，安装后即可使用。  

此示例项目展示和管理的是它自身的代码和模块等信息；而实际中，可视化管理界面展示的是被开发的那个项目的代码和模块等信息。

在开发阶段能打开的页面地址通常有三个：

- `http://localhost:3001/` 可视化管理界面，它展示的是 `htdocs` 目录里的代码和模块等信息。
- `http://localhost:3001/htdocs` 实际被开发的项目，即实际开发的 web 项目。
- `http://localhost:3001/build` 实际被开发的项目，构建后用于生产环境的输出。

## 1. 安装
进入项目，在 `package.json` 所在的目录，打开一个命令行窗口。

### 1.1 全局安装

 - `npm install -g @webpart/cli` 
 
该命令可以全局安装 `@webpart/cli` 命令行工具，安装完后可以在任意目录运行 `webpart` 相关的命令。

``` js
micty@MacBook-Pro web % npm install -g @webpart/cli
npm WARN deprecated uglify-es@3.3.9: support for ECMAScript is superseded by `uglify-js` as of v3.13.0

added 483 packages, changed 1 package, and audited 485 packages in 36s

30 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
micty@MacBook-Pro web % 


```

安装成功后通过运行 `webpart` 即可查看所有的子命令：

***输出示例：***

```
micty@MacBook-Pro web % webpart 
Usage: webpart <command> [options]

Options:
  -v, --version   output the version number
  -h, --help      display help for command

Commands:
  babel           babel a file.
  build           compile website for production stage.
  compile         compile website for development stage.
  find            find a module to its file.
  info            stat module info with specific id.
  init            generate a new project from a template.
  list            stat modules output their ids ad a list.
  md5             md5 a file.
  minify          minify js、css、html、json files.
  pair            pair match JS module and HTML module.
  parse           parse website.
  rename          rename a module and its children.
  require         find who require the module.
  server          start a local web server for development stage. 
  tree            stat modules and output their ids ad a tree.
  watch           compile website and watch files for development stage.
  help [command]  display help for command
```
### 1.2 本地安装

 - `npm install`

在 `package.json` 所在的目录运行上述命令即可安装项目所依赖的包，包括用于开发阶段的命令行工具。

## 2. 开发阶段

进入项目，在 `package.json` 所在的目录，打开两个命令行窗口。

### 2.1 编译与监控

 - `webpart watch` 运行的是全局命令行工具。
 - `npm run watch` 运行的是项目局部的命令行工具。
 
在命令行窗口运行上述命令之一，即可编译所有页面及样式文件，并在完成后开启对文件资源的监控。只要文件发生变化，即可自动编译，无需手动编译。

***输出示例：***

``` js
micty@MacBook-Pro web % webpart watch
------init-----
写入 htdocs/packages/all.json
匹配到 1 个母版页:
    htdocs/index.master.html
------------------------------------------------------------------------------
>> 开始编译 htdocs/index.master.html
混入 htdocs/modules/loading/panel.html
混入 htdocs/modules/markdoc/Markdoc/header/panel.html
...
混入 htdocs/modules/master/Master/page-list/panel.html
编译 htdocs/f/codemirror-5.61.1/theme/3024-day.css
写入 htdocs/style/css/f.codemirror-5.61.1.theme.3024-day.css
...
编译 htdocs/f/codemirror-5.61.1/theme/zenburn.css
写入 htdocs/style/css/f.codemirror-5.61.1.theme.zenburn.css
编译 htdocs/style/less/global.less
写入 htdocs/style/css/style.less.global.css
...
混入 htdocs/lib/outline/panel.html
混入 htdocs/lib/pager/panel.html
混入 htdocs/lib/sidebar-tree/panel.html
混入 htdocs/lib/table/panel.html
混入 htdocs/lib/table-resizer/panel.html
混入 htdocs/lib/text-tree/panel.html
写入 htdocs/index.html
<< 完成编译 htdocs/index.master.html
准备开始监控，请稍候...
=================================全部编译完成=================================
耗时 1746 ms
watch.done!
写入 ./output/watch.json
>> @webpart/server-web watching...

```
 

### 2.2 开启服务器

 - `webpart server --open`，运行的是全局命令行工具。
 - `npm run server`，运行的是项目局部的命令行工具。

在命令行窗口运行上述命令之一，即可开启一个针对开发阶段的 web 服务器。  
参数 `--open` 或 `-o` 表示运行成功后立即在默认浏览器打开可视化的 web 管理页面：`http://localhost:3001/`

***输出示例：***

``` js
micty@MacBook-Pro web % webpart server

[HPM] Proxy created: /  -> http://120.76.123.129:8090/
[HPM] Proxy rewrite rule created: "^/proxy/" ~> "/"
webpart server is running at
local:
   http://localhost:3001/
   http://localhost:3001/htdocs
   http://localhost:3001/build
network:
   http://192.168.0.100:3001/
   http://192.168.0.100:3001/htdocs
   http://192.168.0.100:3001/build
写入 ./output/server.json
```

## 3. 构建部署

开发完成后，需要把整个网站项目进行编译、打包和压缩成适用于生产环境的代码。

 - `webpart build --open`，运行的是全局命令行工具。
 - `npm run build`，运行的是项目局部的命令行工具。 
 
在命令行窗口运行上述命令之一，即可把整个项目打包成用于生产环境的包。  
该包会尽可能地优化项目，如移除无用文件、压缩代码、删除空目录等。  
构建后用于生产环境的资源包位于 `output/build/` 目录。把该目录拷贝到生产环境的服务器用于静态资源即可使用。

参数 `--open` 或 `-o` 表示运行成功后立即在默认浏览器打开 web 页面：`http://localhost:3001/build`

***输出示例：***

``` js
编译 output/build/htdocs/views/markdoc/view.less
...
编译 output/build/htdocs/views/tool/view.less
写入 output/build/htdocs/style/css/91576F125A02244A4F7DD905D43AE31B.css
混入 output/build/htdocs/views/404/view.html
...
混入 output/build/htdocs/lib/text-tree/panel.html
合并 9 个文件:
    output/build/htdocs/partial/begin.js
    output/build/htdocs/f/codemirror-5.61.1/addon/mode/overlay.js
    ...
    output/build/htdocs/partial/end.js
写入 output/build/htdocs/2ACA5B005DB8F0CB1A9BC2FE1A956889.js
合并 422 个文件:
    output/build/htdocs/partial/begin.js
    output/build/htdocs/config.js
    ...
    output/build/htdocs/index.js
    output/build/htdocs/partial/end.js
写入 output/build/htdocs/E2156D266424DCCF64B9C13C7EE93CAF.js
写入 output/build/htdocs/index.html
<< 完成构建 output/build/htdocs/index.master.html
------------------------------------------------------------------------------
清理 7 个目录:
    output/build/htdocs/data/
    ...
    output/build/htdocs/routers/
------------------------------------------------------------------------------
清理 157 个文件:
    output/build/htdocs/f/codemirror-5.61.1/addon/mode/overlay.js
    ...
    output/build/htdocs/index.js
开始递归清理空目录...
------------------------------------------------------------------------------
清理 252 个空目录:
    output/build/htdocs/api/
    ...
    output/build/htdocs/style/less/
=================================全部构建完成=================================
耗时 6675 ms
build.done!
micty@MacBook-Pro web % 
```
## 4. 更多命令

`@webpart/cli` 命令行工具提供了更多的常用命令来提高开发效率。  
此处仅列举几个常用的命令，完整的命令列表请查阅完整的文档。

### 4.1 查找模块

例如要查找模块 `/FileList/Sidebar` 所在的文件，可运行命令：

- `webpart find /FileList/Sidebar`

***输出示例：***
``` js
micty@MacBook-Pro web % webpart find /FileList/Sidebar
/FileList/Sidebar →  htdocs/views/file/FileList/sidebar/Sidebar.js
micty@MacBook-Pro web % 
```

### 4.2 显示指定模块的树结构

例如要显示模块 `/Home` 的模块树结构，可运行命令：
 - `webpart tree /Home`
 
 ***输出示例：***
 
``` js
micty@MacBook-Pro web % webpart tree /Home
└── (empty)
    └── Home
        ├── FileList
        │   ├── API
        │   ├── Loading
        │   └── Main
        │       └── Data
        ├── JsModule
        │   ├── API
        │   ├── Loading
        │   └── Main
        │       └── Data
        ├── Project
        │   ├── API
        │   ├── Loading
        │   └── Main
        └── Server
            ├── API
            ├── Loading
            ├── Main
            └── Status
micty@MacBook-Pro web % 
``` 

### 4.3 显示模块详情
例如要显示模块 `API` 的详情，可运行命令：
 - `webpart info API`
 
 ***输出示例：***
 
``` js
micty@MacBook-Pro web % webpart info API  
---- File Info ----
  file: htdocs/lib/API.js
  dir: htdocs/lib/
  name: API.js
  ext: .js
  size: 513
  lines: 29
  isUTF8: true

---- Module Info ----
  id: API
  parent: (null)
  method: define
  factory:
    type: function
    lines: 24
micty@MacBook-Pro web % 
``` 

### 4.4 显示模块的依赖情况

例如要显示模块 `API` 的依赖情况，即该公共模块被哪些模块依赖了，可运行命令：
 - `webpart require API`
 
 ***输出示例：***
 
``` js
micty@MacBook-Pro web % webpart require API
API:
├── /DocAdd/Data/API
├── /FileList/API
├── /Home/FileList/API
├── /Home/JsModule/API
├── /Home/Project/API
├── /Home/Server/API
├── /HtmlTree/API
├── /HtmlTree/Main/JsLink/Compile/API
├── /Log/API
├── /Markdoc/API
├── /ModuleTree/API
├── /Terminal/Command/FileList
├── /Tool/Main/JS/API
├── /Tool/Main/Less/API
├── /Tool/Main/MD5/API
├── /Tool/Main/QRCode/API
└── File/API
micty@MacBook-Pro web % 
``` 