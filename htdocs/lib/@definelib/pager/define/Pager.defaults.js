
define('Pager.defaults', {
    //组件的 id，会生成到 DOM 元素中。
    //一般情况下不需要指定，组件内部会自动生成一个随机的。
    //如果自行指定，请保证在整个 DOM 树中是唯一的。
    id: '',
    container: '',          //组件的容器。
    template: '#tpl-Pager', //
    class: 'Pager',         //css 类名。
    style: {},              //
    dataset: {},            //

    total: 0,       //总记录数。
    no: 1,          //当前页码，从 1 开始。
    size: 20,       //分页的大小，即每页的记录数。
    minNo: 0,       //总页数小于该值时，分页器会隐藏。 如果不指定或指定为 0，则一直显示。
    sizes: [10, 20, 50, 100, 200,],      //可供选择的分页大小列表。

    //是否公开 meta 对象。
    //如果指定为 true，则外部可以通过 this.meta 来访问。
    //在某些场合需要用到 meta 对象，但要注意不要乱动里面的成员。
    meta: false,

});

