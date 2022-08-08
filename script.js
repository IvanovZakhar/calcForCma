$(function() {

	let height = document.querySelector('.width'),
		width = document.querySelector('.height'),
		email = document.querySelector('.email'),
		result = document.querySelector('.result'),
		checkSpreading = document.querySelector('.spreading__check'),
		spreadingPrice = {
			price: +`${document.querySelector('.spreading__price').innerHTML}`,
			noneCheck: 0,
			result: null
		}


		width.addEventListener('input', () => {
			calculate(width, height, checked())
		})

		height.addEventListener('input', () => {
			calculate(width, height, checked())

		})

		checkSpreading.addEventListener('click', () => calculate(width, height, checked()))

		function calculate (width, height, checked) {
			result.innerHTML = `${((width.value * height.value) * 950) + checked }`;
			
		}

		function checked (){
			if(checkSpreading.checked){
				spreadingPrice.result = spreadingPrice.price
			}else{
				spreadingPrice.result = spreadingPrice.noneCheck
			}
			return spreadingPrice.result;
		}

		
		

	$('.forma').each(function() {	
		var $frm = $(this);
		var input = $(this).find('.validate-input-at .input-at');
		var butsend = $(this).find('.form-at-btn');
		butsend.on('click',function(){
			var check = true;
			for(var i=0; i<input.length; i++) {
				if(validate(input[i]) == false){
					showValidate(input[i]);
					check=false;
				}
			}
			// Отправка формы		
			if (check == true) {
				$.post("./send.php", `height=${height.value}&width=${width.value}&email-at=${email.value}&result=${result.innerHTML}`,
					function(data){
						if(data.frm_check == 'error'){ 
							$frm.find(".result-at").html("<div class='error-at'>Ошибка: " + data.msg + "</div>");					
							} else {
							$frm.find(".result-at").html("<div class='success-at'>Ваше сообщение отправлено!</div>"); 
							$frm.find(".form-at").fadeOut(500);
							// $frm.find(".input-at").val("");
		
						}
					}, "json");
					return false;
			}
		});
		$('.form-at .input-at').each(function(){
			$(this).focus(function(){
				hideValidate(this);
			});
		});
		
	});	
	// function validate(input) {
	// 	/* Если нужно проверять валидность почты, раскомментируйте строчки ниже */
	// 	/*
	// 		if($(input).attr('type') == 'email' || $(input).attr('name') == 'email-at') {
	// 		if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
	// 		return false;
	// 		}
	// 		}
	// 	*/
	// 	if($(input).val().trim() == ''){
	// 		return false;
	// 	}
	// }
	// function showValidate(input) {
	// 	var thisAlert = $(input).parent();
	// 	$(thisAlert).addClass('alert-validate');
	// }
	// function hideValidate(input) {
	// 	var thisAlert = $(input).parent();
	// 	$(thisAlert).removeClass('alert-validate');
	// }
});