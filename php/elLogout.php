<?php
session_start();

session_unset();
// Terminar la sesión:
session_destroy();


header("Location: ../index.html");
?>