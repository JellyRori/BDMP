<?php
    session_start();
    $variableDeFoto=  $_SESSION["foto"];
    header("content_type: image/jpeg");
    echo  $variableDeFoto;
    ?>