<?php

// Verbindung zur Datenbank herstellen
$conn = new mysqli("sql204.infinityfree.com", "if0_34667389_XXX","rJ0Aler0r4LC ", "if0_34667389_Termine");
$conn->set_charset("utf8mb4");
// Verbindung überprüfen
if ($conn->connect_error) {
    die("Verbindungsfehler: " . $conn->connect_error);
}
?>