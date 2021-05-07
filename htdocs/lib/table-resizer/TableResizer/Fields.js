

define('TableResizer/Fields', function (require, module) {

    return {
        normalize: function (list) {
            list = list.map(function (field, index) {
                field = Object.assign({}, field); //��ȫ����������ʵ���л���Ӱ�졣

                let visible = ('visible' in field) ? field.visible : true;  //�����ָ����Ĭ��Ϊ true��
                let width = visible ? field.width || 0 : 0;

                field.visible = !!visible;
                field.dragable = field.dragable === false ? false : true; //ֻ����ʽָ����Ϊ false �Ž��á�

                field.width = field.width || 0;

                return field;

            });

            return list;
        },

        sum: function (list) {
            let sum = 0;

            list = list.map(function (field, index) {
                if (!field.visible) {
                    return;
                }

                sum += field.width;
            });

            return sum;
        },

    };

});

