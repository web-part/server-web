# 问题模块的表现


 1. 模块对应的文件名命名不符合规范。
 2. 模块没有被任何其它模块引用。
     - 公共模块没有被其它公共模块或私有模块引用。
     - 私有模块没有被父模块引用。
 3. 私有模块没有父模块（会同时具有第 2 点）。
 4. 一个文件内定义多个模块。
 5. 同一个模块 id 被多次定义。---- 运行时错误。
 6. 模块内引用了不存在的模块。---- 运行时条件错误，特定条件下会触发。
 
 