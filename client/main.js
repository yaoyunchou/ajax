//http://nsw88.com

const volidata = require('./tools/volidate');

let formData = {}; 
const rules = {
    name:[
        {special:true, message: '不能包含特殊字符', trigger: 'blur' },
        {max:50, message: '长度超过50个字符', trigger: 'blur' }
    ],
    companyname:[
        {special:true, message: '不能包含特殊字符', trigger: 'blur' },
        {max:200, message: '长度超过200个字符', trigger: 'blur' }
    ],
    position:[
        {special:true, message: '不能包含特殊字符', trigger: 'blur' },
        {max:100, message: '长度超过100个字符', trigger: 'blur' }
    ],
    email:[
        {email:true, message: '请填入正确的邮箱!', trigger: 'blur' },
        {max:100, message: '长度超过100个字符', trigger: 'blur' }
        
    ],
    telephone:[
        {num:true, message: '请填入数字!', trigger: 'blur' },
	    {max:50, message: '长度超过50个字符', trigger: 'blur' }
    ],
    content:[{max:1000, message: '长度超过1000个字符', trigger: 'blur' }],
    
    weixin:[
        {special:true, message: '不能包含特殊字符', trigger: 'blur' },
        {max:100, message: '长度超过100个字符', trigger: 'blur' }
    ],
    area:[],
    industry:[
        {special:true, message: '不能包含特殊字符', trigger: 'blur' },
        {max:100, message: '长度超过100个字符', trigger: 'blur' }
    ],
    address:[
	    {max:200, message: '长度超过200个字符', trigger: 'blur' }
    ]
}
$.nswForm = function(){
	$('.mess_success').click(function(event){
		event.stopPropagation();
	});
	$("#area").distpicker({
		autoSelect: false
	});
	$('.mess_su_sub').on('click',function(){
		$('html , body').removeClass('htmlbody');
		$('.mess_success').hide();
	});
	//点击提交提示成功
	
	$('.message_from li').not('.mess_dis').each(function(){
		let self = $(this);
		self.find('input,textarea').blur(function(){
			volidata.checkRow(self,rules[$(this).attr('name')],$(this));
		});
	});
	$('.reset').click(function(){
		$("#nswForm")[0].reset();
	});
	$('.message_from .mess_dis select').change(function(){
		formData.area = ($('#province10')?$('#province10').val():'')+($('#city10')?$('#city10').val():'')+($('#district10')?$('#district10').val():'');
		if($('#area').attr('required')&&!formData.area){
			$('.message_from .mess_dis').append($('<em>地区不能为空！</em>'));
		}else{
			$('.message_from .mess_dis em').remove();
		}
	});
	$('.submit').unbind().click(function(){
		formData.userId = $('#userId').val();
		formData.pageId = $('#pageId').val();
		let flog = true;
		$('.message_from li').not('.mess_dis').each(function(){
			let self = $(this);
			let data = {key:self.find('input,textarea').attr('name'),value:self.find('input,textarea').val()};
			
			flog = flog&&volidata.checkRow(self,rules[data.key],self.find('input,textarea'));
			if(flog){
				formData[data.key] = data.value;
			}
			
		});
		if($('.message_from .mess_dis').length){
			var  area = ($('#province10')?$('#province10').val():'')+($('#city10')?$('#city10').val():'')+($('#district10')?$('#district10').val():'');
			if($('#area').attr('required')&&!formData.area){
				$('.message_from .mess_dis').find('em').remove().end().append($('<em>地区不能为空！</em>'));
				flog = false;
			}else{
				formData.area = area;
			}
		}
		if(flog){
			$.ajax({
				type: "post",
				//        async:false,
				url: $('#nswForm').attr('url'),
				contentType:"application/json",
				dataType :"json",
				crossDomain : true,
				data: JSON.stringify(formData),
				success: function(data){
					$('.mess_su_img img').attr('src','http://ozk6w20id.bkt.clouddn.com/images/success.png');
					$('.mess_su_txt').html(data.data);
					$('html , body').addClass('htmlbody');
					$('.mess_success').show();
					// $(this).addClass("done");
				},
				error:function(err){
					$('.mess_su_img img').attr('src','http://ozk6w20id.bkt.clouddn.com/images/error.png');
					$('.mess_su_txt').html(err.data);
					$('html , body').addClass('htmlbody');
					$('.mess_success').show();
				}
			});
		}
		
	});
}
$(function(){
    $.nswForm();
});