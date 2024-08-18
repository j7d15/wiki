---
sidebar_position: 16
title: SMS et Email
---

## Email

[PHPmailer](https://github.com/PHPMailer/PHPMailer)

```php title="form.html"
<!DOCTYPE html>
<html>
<head>
    <title>Contact</title>
    <meta charset="UTF-8">
</head>
<body>
    <h1>Contact</h1>
    
    <form method="post" action="send-email.php">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" required>
        
        <label for="email">email</label>
        <input type="email" name="email" id="email" required>
        
        <label for="subject">Subject</label>
        <input type="text" name="subject" id="subject" required>
        
        <label for="message">Message</label>
        <textarea name="message" id="message" required></textarea>
        
        <br>
        
        <button>Send</button>
    </form>
    
</body>
</html>
```

```php title="send-email.php"
<?php

$name = $_POST["name"];
$email = $_POST["email"];
$subject = $_POST["subject"];
$message = $_POST["message"];

require "vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

$mail = new PHPMailer(true);

// $mail->SMTPDebug = SMTP::DEBUG_SERVER;

$mail->isSMTP();
$mail->SMTPAuth = true;

$mail->Host = "smtp.example.com";
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->Username = "you@example.com";
$mail->Password = "password";

$mail->setFrom($email, $name);
$mail->addAddress("dave@example.com", "Dave");

$mail->Subject = $subject;
$mail->Body = $message;

$mail->send();

header("Location: sent.html");
```

```php title="sent.html"
<!DOCTYPE html>
<html>
<head>
    <title>Contact</title>
    <meta charset="UTF-8">
</head>
<body>
    <h1>Contact</h1>
    
    <p>Thank you for your message.</p>
    
</body>
</html>
```

## SMS

Envoyer un message textuelle à un téléphone en passant par les fournisseurs de passerelles SMS concurrents que sont [Twilio]( https://www.twilio.com/) et [infobip](https://www.infobip.com/).

* [Twilio php package](https://github.com/twilio/twilio-php)
* [infobip php package](https://github.com/infobip/infobip-api-php-client)

```php title="form.php"
<!DOCTYPE html>
<html>
<head>
    <title>PHP SMS</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css" />
</head>
<body>

    <h1>PHP SMS</h1>
    <form method="post" action="send.php">
        <label for="number">Number</label>
        <input type="text" name="number" id="number" />
        <label for="message">Message</label>
        <textarea name="message" id="message"></textarea>
        <fieldset>
            <legend>Provider</legend>
            <label>
                <input type="radio" name="provider" value="infobip" checked /> Infobip
            </label>
            <br />
            <label>
                <input type="radio" name="provider" value="twilio" /> Twilio
            </label>
        </fieldset>
        <button>Send</button>
    </form>
</body>
</html>
```

```php title="send.php"
<?php

use Infobip\Configuration;
use Infobip\Api\SmsApi;
use Infobip\Model\SmsDestination;
use Infobip\Model\SmsTextualMessage;
use Infobip\Model\SmsAdvancedTextualRequest;
use Twilio\Rest\Client;

require __DIR__ . "/vendor/autoload.php";

$number = $_POST["number"];
$message = $_POST["message"];

if ($_POST["provider"] === "infobip") {

    $base_url = "https://your-base-url.api.infobip.com";
    $api_key = "your API key";

    $configuration = new Configuration(host: $base_url, apiKey: $api_key);

    $api = new SmsApi(config: $configuration);

    $destination = new SmsDestination(to: $number);

    $message = new SmsTextualMessage(
        destinations: [$destination],
        text: $message,
        from: "daveh"
    );

    $request = new SmsAdvancedTextualRequest(messages: [$message]);

    $response = $api->sendSmsMessage($request);

} else {   // Twilio

    $account_id = "your account SID";
    $auth_token = "your auth token";

    $client = new Client($account_id, $auth_token);

    $twilio_number = "+ your outgoing Twilio phone number";

    $client->messages->create(
        $number,
        [
            "from" => $twilio_number,
            "body" => $message
        ]
    );

}

echo "Message sent.";
```