
# @definejs 前端开发框架

> @definejs 是一个轻量级的、综合性的 JavaScript 应用框架。它借鉴了 Node.js、Sea.js、Require.js、Backbone.js、Ext.js、jQuery.js 等框架的优秀设计理念，在 CMD 模块化的基础上，对模块增加了树型结构的约束关系，形成了特有的 TMD(树型模块定义) 的模块系统；模块之间采用事件驱动的方式进行通信；并提供了通用的 UI 模块定义、灵活的模板填充等，可以非常高效地用于 PC 端和移动端的 Web 页面前端开发。

## 1 特点

 - **高效、易用、灵活、一致**

    @definejs 框架更多关注的是为团队提供一种高效、易用、灵活、一致的**开发模式**，而非仅关注 UI 层和视图层。

 - **强约束规范**

    @definejs 通过一系列的措施和约束，确保前端团队的开发人员能写出风格和结构基本一致的代码，提高项目的可维护性，提高开发人员的可替换性，降低项目风险。
 
 - **满足大多数 Web 开发场景**
 
    @definejs 提供一系列的常用的、基础的模块、类和 UI 组件等，满足大多数常用的 Web 开发场景。
    
 - **适用于 PC 端和移动端**
 
     @definejs 内部提供的模块既可以用于 PC 端，也可以用于移动端，差异化部分采用了配置的方式进行解决。
 
 - **支持 IE (9+)**
 
    通过引入 `babel` 版本和 `polyfill` 垫片库，可以支持到 `IE9` 或以上。
 
 - **模块化和片段化开发**

   配合 Web 自动化开发工具 `webpart`，采用 html 片段化和模块化的开发方式，动态自动批量引入 css 文件和 js 文件，自动监控文件变化和编译页面，非常适合团队成员分工协作、共同开发单页应用。

 - **支持单页应用（SPA）**
 
   @definejs 专为单页应用设计的s，提供了视图路由导航、视图状态保持等功能，支持浏览器传统的前进、后退、刷新功能，支持移动端的视图跳转过渡、滑动返回、下拉刷新、上拉加载更多等接近原生 App 的体验。
   
 - **简单、灵活的配置系统**
   
   @definejs 通过框架层和业务层的配置选项，控制模块的默认行为逻辑，用户在简便性方面几乎可以零配置使用模块，在灵活性上可以自由指定默认配置。
   
 - **业务层程序结构清晰，定位快速、直观**
 
    通过树型结构的模块化管理、规范的文件和目录命名、DOM 元素模块化等手段，可以在团队成员之间非常方便的分工协作、交叉协作，定位代码非常直观和快速。
 
   
   
 - **面向各个层次的开发者**

   @definejs 面向的是各个层次和水平的前端开发者。
      - 对于新人，可以在指定的模板模块中通过 **“填充”** 代码的方式快速实现功能。
      - 对于高级开发人员，通过模块化系统的分而治之原则，可以快速实现任何想要的复杂功能。
 
 - **纯原生前端开发，符合 W3C 标准**
    - 纯原生的 html、css、js 开发，无任何自创的、不符合 W3C 标准的规则、语法和标记等。
    - 学习曲线非常平缓。作为一名前端者，只要你懂 W3C 标准，，只需要很小的学习成本即可上手使用。
    - 对前端人员更友好，前后端完全分离，前端人员更专注在原生的、传统的和标准的页面开发。
    - 避免学习新的文件类型、语法和标签，如 `.vue`、`.jsx` 等非标准文件，`v-bind`、`v-for` 等非 W3C 标准的语法。
    - html、js 代码互相分离，避免 js 里掺杂 html 内容。
    
## 2 框架架构

![](http://www.definejs.com/data/upload/paste/2021-08-20/101259-7CE0.png)
    
## 3 已发布的包

 - 所有的包都已发布到 npm 上，可以直接安装使用。               
   https://www.npmjs.com/package/@definejs/

 - 所有的包的代码都已开源到 github 上，可以直接查看。  
   https://github.com/definejs/

### 3.1 通用类
 - `@definejs/app-module` 用于业务层的树形结构模块管理器。
 - `@definejs/array` 数组工具。
 - `@definejs/date` 日期时间工具。
 - `@definejs/emitter` 自定义多级事件类。
 - `@definejs/escape` HTML 转码工具。
 - `@definejs/fn` 函数工具。
 - `@definejs/hash` 通用的 url 中的哈希工具，既可用在 node 端，也可以用在浏览器端。
 - `@definejs/id-maker` 随机 id 分组生成器类。
 - `@definejs/json` JSON 工具。
 - `@definejs/math` Math 数学工具。
 - `@definejs/module-manager` 树型结构的 CMD 模块管理器类。
 - `@definejs/object` Object 对象工具。
 - `@definejs/query` url 中的查询字符串工具。
 - `@definejs/string` 字符串工具。
 - `@definejs/style` 样式工具。
 - `@definejs/tasker` 多任务串行或并行处理类。
 - `@definejs/timer` 计时器类。
 - `@definejs/tree` 树形结构的存储类。

### 3.2 浏览器环境类
 - `@definejs/api` 用于请求后台接口 API 类。 
 - `@definejs/app` 用于业务层的应用启动工具。
 - `@definejs/html-parser` 把 HTML 解析成 HTML DOM 的工具。
 - `@definejs/local-storage` 针对应用层可以保持数据类型的本地存储类。
 - `@definejs/navigator` 针对浏览器端基于 hash 的视图导航器类。
 - `@definejs/package` 分布式加载中的包资源加载器工具。
 - `@definejs/proxy` 在浏览器端，前端请求后端接口进行代理拦截的工具。
 - `@definejs/script` js 脚本工具。
 - `@definejs/session-storage` 针对应用层可以保持数据类型的会话存储类。
 - `@definejs/template` 浏览器端页面的模板填充类。
 - `@definejs/url` 当前页面的 url 工具。



### 3.3 UI 类
 - `@definejs/alert` 显示一个模拟的 alert 对话框工具。 
 - `@definejs/confirm` 显示一个模拟的 confirm 对话框工具。 
 - `@definejs/dialog` 通用的简单的对话框组件类。
 - `@definejs/loading` 加载中组件类。
 - `@definejs/masker` 遮罩层组件。
 - `@definejs/panel` 通用的面板组件类。
 - `@definejs/tabs` 通用的页签列表组件类。
 - `@definejs/toast` 简易的信息提示组件类。
 - `@definejs/view` 通用的视图组件类。
 
### 3.3 移动端类
 - `@definejs/iscroll` 第三方的移动端的滚动器底层库。 
 - `@definejs/mobile-alert` 针对移动端的显示一个模拟的 alert 对话框类。
 - `@definejs/mobile-app` 针对移动端的 App 启动类。
 - `@definejs/mobile-confirm` 针对移动端的 confirm 对话框。
 - `@definejs/mobile-dialog` 针对移动端的简单的对话框组件类。
 - `@definejs/mobile-masker` 针对移动端的遮罩层组件类。
 - `@definejs/mobile-tabs` 针对移动端的通用的页签列表组件类。
 - `@definejs/mobile-view` 针对移动端的视图组件类。
 - `@definejs/scroller` 针对移动端的滚动器组件类，具有上拉加载更多和下拉刷新等功能。
 - `@definejs/touch` 针对移动端的 `touch` 事件，用来替换到 PC 端的 `click` 事件。
 - `@definejs/transition-end` 针对各浏览器的动画结束事件。
 - `@definejs/view-slider` 在移动端实现两个视图间跳转的滑动效果和手势滑动返回。
 
### 3.4 Node 环境类
 - `@definejs/directory` node 端的目录读取和操作工具。
 - `@definejs/file` 针对 node 端的文件工具。
 - `@definejs/hint-line` 在 node 端使用的高亮特定文本行的工具，以用于进行上下文提示（如错误信息）。
 - `@definejs/lines` 在 node 端使用的文本行处理工具。
 - `@definejs/md5` MD5 工具。
 - `@definejs/node-app` 在 node 端使用的基于树形模块管理器的应用。
 - `@definejs/patterns` 在 node 端使用的路径模式工具。

### 3.5 专用工具类
 - `@definejs/cli` 用于打包 definejs 的命令行工具。
 - `@definejs/defaults` 此包仅供自动化打包工具 `@definejs/packer` 使用。  
 - `@definejs/packer` 把 npm 上的 `@definejs/` 域内的其它模块打包成适用于浏览器端的模块或单一的库。



