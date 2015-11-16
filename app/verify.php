<html>
	<body>
		<h1>test</h1>
	</body>
</html>
<?php
echo '<h1>test</h1>';
 require_once('recaptchalib.php');
 $privatekey = "6LfeEBETAAAAAI22_20AwjtKh-wBPA6mm-XeeEH2";
 $resp = recaptcha_check_answer ($privatekey,
                                 $_SERVER["REMOTE_ADDR"],
                                 $_POST["recaptcha_challenge_field"],
                                 $_POST["recaptcha_response_field"]);
 if (!$resp->is_valid) {
   // What happens when the CAPTCHA was entered incorrectly
   die ("The reCAPTCHA wasn't entered correctly. Go back and try it again." .
        "(reCAPTCHA said: " . $resp->error . ")");
 } else {
   // Your code here to handle a successful verification
 	echo 'nice';
 }
 ?>