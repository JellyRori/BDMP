<?php

include $_SERVER['DOCUMENT_ROOT'].'/BDM2/php/conexion.php';
/*include("conexion.php")
 BORRARLO*/
 session_start();

// Esto es la conexión hacia base de datos----------------------------------------------------------------
$db = new conexion();
$connection = $db->Conectando();

$userName = $_POST['username'];
$passWord = $_POST['password'];


// Procedure del Login
//$sql = "call sp_Login('".$userName."','".$passWord."');";
//$sql = 'call sp_Login('.$_POST['username'].', '.$_POST['password'].');';

$query=mysqli_query($connection,  "call sp_Login('".$userName."','".$passWord."');");
//echo mysqli_error($connection);
//$result = mysqli_store_result($connection);
$nr = mysqli_num_rows($query);



if($nr > 0) {
    // output data of each row
   $info = mysqli_fetch_array($query);
   $_SESSION["IdUsuario"] = $info["idUsuario"];
   $_SESSION["elRol"] = $info["nomRol"];
        echo'<script type="text/javascript">
        alert(" Bienvenido a Art & Learn");
        window.location.href="../index.html";
        </script>';
        
 }else{
 echo"<div> ".$userName." </div>";
 echo"<div> ".$passWord." </div>";

    echo'<script type="text/javascript">
        alert(" El usuario y/o lacontraseña no coinciden con alguno de los registrados");
        window.location.href="../Login.php";
        </script>';
 } 
    mysqli_close($connection);//se cierra la conexion-------------------------------------------------------------
   
    
?>
