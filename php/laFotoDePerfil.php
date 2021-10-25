<?php
    session_start();//para iniciar la sesion------------------------------------------------------------------------------
    $variableDeFoto=  $_SESSION["foto"];
    header("content_type: image/jpeg");
    echo  $variableDeFoto;
    ?>