<?php
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$to = "job.ali@game9723.worldhosts.fun";	// Куда идет письмо
		$from = "job.ali@game9723.worldhosts.fun";	// От кого идет письмо
		$height = $_POST['height'];
		$email = $_POST['email-at'];
		$width = $_POST['width'];
		$result = $_POST['result'];
		$subject =	$_POST['subject-at'];
		$return_arr = array();
		$return_arr["frm_check"] = '';
		// Еще раз проверим заполненные поля формы. 
		// Эту проверку можно удалить или удалить проверку на JS
		// if($height=="" || $email=="" || $width=="") {
		// 	$return_arr["frm_check"] = 'error';
		// 	$return_arr["msg"] = "Пожалуйста, заполните все поля!";			
		// } 	
		// Проверка на плохие слова. Если не мучают хулиганы, можно ее удалить.
		$badwords = array('предложение', 'купить', 'раскрутка'); 
		$banstring = ($message != str_ireplace($badwords,"XX",$message))? true: false; if ($banstring) { 
			$return_arr["frm_check"] = 'error';
			$return_arr["msg"] = "Есть запрещенные слова";	
		}
		
		if ($return_arr["frm_check"] != 'error') {			
			$subject = "From my-site.ru: $subject";
$message = "Сообщение от " .$email. "\n
Высота: " .$height. "\n	
Ширина: " .$width.  "\n
Стоимость: " .$result. "руб." ;
			
$headers = "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "From: $from\r\n";
$headers .= "Reply-To: $from\r\n";	
			
			if (!mail($to, $subject, $message, $headers)) {
				$return_arr["frm_check"] = 'error';
				$return_arr["msg"] = "Сообщение не отправлено, ошибка почтового сервера!";	
			}		
		}		
		echo json_encode($return_arr);
	}
?>