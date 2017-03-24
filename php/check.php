<?php
//ini_set('display_errors', 1);
include('./mailchimp.php');
use \DrewM\MailChimp\MailChimp;

$api_key = "b2af692e1a51fab6a8eeb577812b8567-us15";
$list_id = "f2da769e9b";
/*var_dump($api_key);
var_dump($list_id);*/
$mail = $_POST['email'];
$MailChimp = new Mailchimp( $api_key );
$result = $MailChimp->get('lists');
$result = $MailChimp->post("lists/$list_id/members", [
				'email_address' => $mail,
				'status'        => 'pending',
			]);
if ($MailChimp->success()) {
	print_r($result);	
} else {
	echo $MailChimp->getLastError();
}
//echo($result);
/*
$subscriber = $Mailchimp_Lists->subscribe( $list_id, array( 'email' => htmlentities($_POST['email']) ) );if ( ! empty( $subscriber['leid'] ) ) {
   echo "success";
}
else
{
    echo "fail";
}*/
 
?>