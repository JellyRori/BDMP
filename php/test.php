<?php
session_start();
echo  $_SESSION["idUser"];
echo  $_SESSION["nombre"];
echo  $_SESSION["apellidos"];
echo $_SESSION["FechaNac"];
echo  $_SESSION["rol"];
echo  $_SESSION["foto"];

?>