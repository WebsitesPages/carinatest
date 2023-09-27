<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'connect.php';
require 'phpmailer/includes/Exception.php';
require 'phpmailer/includes/PHPMailer.php';
require 'phpmailer/includes/SMTP.php';


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;



if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $phone = $_POST["phone"];
  $date = $_POST["date"];
  $time = $_POST["time"];

  // Daten in der Datenbank speichern
  $sql = "INSERT INTO termine (Name, Email, Telefonnummer, Datum, Uhrzeit) VALUES (?, ?, ?, ?, ?)";
  $stmt = $conn->prepare($sql);
  
  if ($stmt) {
      $stmt->bind_param("sssss", $name, $email, $phone, $date, $time);
      $stmt->execute();
      $stmt->close();

// PHPMailer-Code hier einfügen (siehe oben)
$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
try {
  // E-Mail-Einstellungen
  $mail->SMTPDebug = 0; // Debug-Modus deaktivieren
  $mail->isSMTP();
  $mail->Host = 'smtp.zoho.eu';
  $mail->SMTPAuth = true;
  $mail->Username = 'info@missionfeelgood.de';
  $mail->Password = 'saqdov-8jiHmu-hikvec';
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;

  // Absender und Empfänger
  $mail->setFrom('info@missionfeelgood.de', 'Missionfeelgood Hypnose');
  $mail->addReplyTo($email, $name); // Fügt den Kunden zur Reply-To-Liste hinzu
  $mail->addAddress('info@missionfeelgood.de');
  // Fügt die gewünschte Weiterleitungsadresse hinzu

  // E-Mail-Inhalt
  $mail->isHTML(true);
  $mail->Subject = "Terminbuchung von $name, am $date um $time Uhr";
  $mail->Body = "Name: $name<br>Email: $email<br>Telefonnummer: $phone<br>Datum: $date<br>Uhrzeit: $time Uhr";

  // E-Mail senden
  $mail->send();
} catch (Exception $e) {
  echo "Die E-Mail konnte nicht gesendet werden. Fehler: {$mail->ErrorInfo}";
  exit();
}
  } else {
      echo "Fehler: " . $sql . "<br>" . $conn->error;
      exit();
  }

// Bestätigungs-E-Mail an den Kunden senden
$customerMail = new PHPMailer(true);
$customerMail->CharSet = 'UTF-8';
try {
  // E-Mail-Einstellungen
  $customerMail->SMTPDebug = 0; // Debug-Modus deaktivieren
  $customerMail->isSMTP();
  $customerMail->Host = 'smtp.zoho.eu';
  $customerMail->SMTPAuth = true;
  $customerMail->Username = 'info@missionfeelgood.de';
  $customerMail->Password = 'saqdov-8jiHmu-hikvec';
  $customerMail->SMTPSecure = 'ssl';
  $customerMail->Port = 465;

  // Absender und Empfänger
  $customerMail->setFrom('info@missionfeelgood.de', 'Missionrauchfrei Hypnose');
  $customerMail->addAddress($email, $name);

  // E-Mail-Inhalt
  $customerMail->isHTML(true);
  $customerMail->Subject = "Anfrage erhalten";
  $customerMail->Body = "Hallo $name,<br><br>vielen Dank für Ihre Buchung bei Missionfeelgood Hypnose. Ich habe Ihre Buchung erhalten und werde mich so schnell wie möglich mit Ihnen in Verbindung setzen.<br><br>
  Ich schätze Ihr Interesse und freue mich darauf, Ihnen behilflich zu sein.<br><br>
  Mit freundlichen Grüßen,<br>
  <br>Carina Ruß,<br>Missionfeelgood Hypnose";

  // E-Mail senden
  $customerMail->send();
} catch (Exception $e) {
  echo "Die Bestätigungs-E-Mail konnte nicht gesendet werden. Fehler: {$customerMail->ErrorInfo}";
  exit();
}

  // Datenbankverbindung schließen
  $conn->close();

  // Weiterleitung zur Bestätigungsseite oder einer anderen Seite
  header("Location: thankyou.html");
  exit();
}

?>
