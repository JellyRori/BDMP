<?php
include $_SERVER['DOCUMENT_ROOT'].'/BDM/php/conexion.php';
/*error_reporting(0);
session_start(); BORRARLO*/

// Esto es la conexión hacia base de datos----------------------------------------------------------------
$db = new BaseDeDatos();
$connection = $db->Conectando();

$userName = $_POST['username'];
$passWord = $_POST['password'];

// Procedure del Login
//$sql = "call sp_Login($userName, $passWord)";
$sql = "CALL sp_Login(".$userName."," .$passWord.");";

$result = mysqli_query($connection, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
     $info = mysqli_fetch_array($result);
     $_SESSION["IdUsuario"] = $info["idUsuario"];
     $_SESSION["elRol"] = $info["Rol"];
     

 }else{
 	echo ($userName);
 	echo ($passWord);
 	echo ($result);

    /*echo'<script type="text/javascript">
        alert(" El usuario y/o lacontraseña no coinciden con alguno de los registrados");
        window.location.href="../Login.php";
        </script>';*/
 } 
    
   mysqli_close($connection);//se cierra la conexion-------------------------------------------------------------


/*

<?php 
session_start();
$idUsuario = "";
if (isset($_SESSION['IdUsuario']))
{
    echo 'Se ha iniciado sesión  ';
    $idUsuario = is_null($_SESSION['IdUsuario']) ? "" : $_SESSION['IdUsuario'];
    echo '    id: ' .$idUsuario;
}
?>

*/
    
?>