
define('TextTree.defaults', {
    //组件的 id，会生成到 DOM 元素中。
    //一般情况下不需要指定，组件内部会自动生成一个随机的。
    //如果自行指定，请保证在整个 DOM 树中是唯一的。
    id: '',

    container: '',              //
    template: '#tpl-TextTree',  //
    class: 'TextTree',          //css 类名。
    style: {},                  //生成在 DOM 节点中的内联样式。
    dataset: {},                //生成在 DOM 节点中的以 `data-` 开头的自定义属性。

    icon: {
        dir: 'fas fa-angle-down',   //目录节点的图标。 如果指定为空串，则不生成图标 html。
        file: 'far fa-circle',      //文件节点的图标。 如果指定为空串，则不生成图标 html。
    },

    //是否公开 meta 对象。
    //如果指定为 true，则外部可以通过 this.meta 来访问。
    //在某些场合需要用到 meta 对象，但要注意不要乱动里面的成员。
    meta: false,

    trimLeft: false,    //是否去除左边的4个字符，以便消除一层多余的层级。
    showValue: false,   //是否显示值的部分。
    showIcon: false,    //是否显示节点图标，以便可以展开或收起子节点。
    showTab: false,     //是否显示缩进对齐线。
    showColor: false,   //是否显示彩色。
    showHover: false,   //是否显示鼠标悬停时的背景色。
});