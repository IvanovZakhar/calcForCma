$(function() {

	let height = document.querySelector('.width'),
		width = document.querySelector('.height'),
		email = document.querySelector('.email'),
		result = document.querySelector('.result'),
		checksSum = [],
		results = null;

		const checkbox = document.querySelectorAll('.sturdy-add__item');

		checkbox.forEach(item => {item.addEventListener('click', (e) => checked (e.target))})

		width.addEventListener('input', () => calculate(width, height))

		height.addEventListener('input', () => calculate(width, height))


		function calculate (width, height) {
			result.innerHTML = `${((width.value * height.value) * 950) + results}`;
		}

		

		function checked (check){
			// Проверяем нажатый чек бокс 
			
			// Если чек бокс установлен в позиции true
			if(check.className = 'sturdy-add__check' && check.checked){
				// Добавляем в массив 'данные ребенка соседа' - дум дерева
				checksSum.push(+check.nextElementSibling.childNodes[1].innerHTML)
				// Суммируем полученные данные помещая их в переменную results
				results = checksSum.reduce((partialSum, a) => partialSum + a, 0);
				// Запускаем данную функцию, что бы обновить полученные данные
				calculate(width, height)
			}
			// Если чек бокс установлен в позиции false
			else if (check.className = 'sturdy-add__check' && check.checked === false){
				// C помощью метода indexOf находим номер индекса по 'данным ребенка соседа' - дум дерева 
				// С помощью метода splice заменяем данные на 0 в найденном индексе
				checksSum.splice(checksSum.indexOf(+check.nextElementSibling.childNodes[1].innerHTML), 1, 0);
				// Запускаем данную функции, что бы обновить полученные данные
				results = checksSum.reduce((partialSum, a) => partialSum + a, 0);
				calculate(width, height)
			}
			
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