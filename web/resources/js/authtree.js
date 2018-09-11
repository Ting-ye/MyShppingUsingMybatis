/*
* @Author: 94468
* @Date:   2018-03-16 18:24:47
* @Last Modified by:   94468
* @Last Modified time: 2018-03-30 12:24:37
*/
// �ڵ���
layui.define(['jquery', 'form'], function(exports){
	$ = layui.jquery;
	form = layui.form;

	obj = {
		// ��Ⱦ + ���¼�
		/**
		 * ��ȾDOM�����¼�
		 * @param  {[type]} dst       [Ŀ��ID���磺#test1]
		 * @param  {[type]} trees     [���ݣ���ʽ��{}]
		 * @param  {[type]} inputname [�ϴ�����]
		 * @param  {[type]} layfilter [lay-filter��ֵ]
		 * @return {[type]}           [description]
		 */
		render: function(dst, trees, inputname, layfilter){
			var inputname = inputname ? inputname : 'menuids[]';
			var layfilter = layfilter ? layfilter : 'checkauth';
			var layfilter = layfilter ? layfilter : 'checkauth';
			$(dst).html(obj.renderAuth(trees, 0, inputname, layfilter));
			form.render();
			// ��ע�����ʹ��form.on('checkbox()')���ⲿ���޷�ʹ��form.on()����ͬ����Ԫ���ˣ�LAYUI��֧���ظ������ˣ���
			// form.on('checkbox('+layfilter+')', function(data){
			// 	/*��������Ȩ��״̬���棬���ѡ�У�������ȫ��ѡ��*/
			// 	var childs = $(data.elem).parent().next().find('input[type="checkbox"]').prop('checked', data.elem.checked);
			// 	if(data.elem.checked){
			// 		/*����child��ǰ��һ��Ԫ�أ�������ߵ�checkboxѡ��״̬��Ϊtrue��*/
			// 		$(data.elem).parents('.auth-child').prev().find('input[type="checkbox"]').prop('checked', true);
			// 	}
			// 	/*console.log(childs);*/
			// 	form.render('checkbox');
			// });
			$(dst).find('.auth-single:first').unbind('click').on('click', '.layui-form-checkbox', function(){
				var elem = $(this).prev();
				var checked = elem.is(':checked');
				var childs = elem.parent().next().find('input[type="checkbox"]').prop('checked', checked);
				if(checked){
					/*����child��ǰ��һ��Ԫ�أ�������ߵ�checkboxѡ��״̬��Ϊtrue��*/
					elem.parents('.auth-child').prev().find('input[type="checkbox"]').prop('checked', true);
				}
				/*console.log(childs);*/
				form.render('checkbox');
			});

			/*��̬��չ���¼�*/
			$(dst).unbind('click').on('click', '.auth-icon', function(){
				var origin = $(this);
				var child = origin.parent().parent().find('.auth-child:first');
				if(origin.is('.active')){
					/*����*/
					origin.removeClass('active').html('�}');
					child.slideUp('fast');
				} else {
					/*չ��*/
					origin.addClass('active').html('��');
					child.slideDown('fast');
				}
				return false;
			})
		},
		// �ݹ鴴����ʽ
		renderAuth: function(tree, dept, inputname, layfilter){
			var str = '<div class="auth-single">';
			layui.each(tree, function(index, item){
				var hasChild = item.list ? 1 : 0;
				// ע�⣺�ݹ����ʱ��this�Ļ�����ı䣡
				var append = hasChild ? obj.renderAuth(item.list, dept+1, inputname, layfilter) : '';

				// '+new Array(dept * 4).join(' ')+'
				str += '<div><div class="auth-status"> '+(hasChild?'<i class="layui-icon auth-icon" style="cursor:pointer;">�}</i>':'<i class="layui-icon auth-leaf" style="opacity:0;">��</i>')+(dept > 0 ? '<span>���� </span>':'')+'<input type="checkbox" name="'+inputname+'" title="'+item.name+'" value="'+item.value+'" lay-skin="primary" lay-filter="'+layfilter+'" '+(item.checked?'checked="checked"':'')+'> </div> <div class="auth-child" style="display:none;padding-left:40px;"> '+append+'</div></div>'
			});
			str += '</div>';
			return str;
		},
		// ��ȡѡ��Ҷ�ӽ��
		getLeaf: function(dst){
			var leafs = $(dst).find('.auth-leaf').parent().find('input[type="checkbox"]:checked');
			var data = [];
			layui.each(leafs, function(index, item){
				// console.log(item);
				data.push(item.value);
			});
			// console.log(data);
			return data;
		}
	}
	exports('authtree', obj);
});