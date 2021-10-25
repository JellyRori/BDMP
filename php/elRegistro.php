<?php

session_start();

session_unset();

include $_SERVER['DOCUMENT_ROOT'].'/BDM2/php/conexion.php';

//aqui estamos tomando las variables de los inputs--------------------------------------------------------------------------------------
$lastName = $_POST['lastname'];
$userName = $_POST['username'];
$passWord = $_POST['password'];
$email = $_POST['email'];
$birthDay = $_POST['birthday'];
//$avatarText = $_POST['elAvatar'];

if(getimagesize($_FILES['avatar']['elAvatar'])==false){
	echo "Error, la imagen no es compatible";
} else{

	$imagen = addslashes(file_get_contents($_FILES['avatar']['elAvatar']));
}

//Conexion con la base de datos---------------------------------------------------------------------------------------------------------
$db = new conexion();
$connection = $db->Conectando();

//mandando a llamar el procedure--------------------------------------------------------------------------------------------------------
$sql = "call sp_RegistroUsAlumno('".$userName."','".$lastName."','".$birthDay."','".$passWord."','".$email."','".$imagen."');";

//ejecutando el sql-----------------------------------------------------------------------
$query=mysqli_query($connection, $sql);

//echo mysqli_error($connection);
//$result = mysqli_store_result($connection);
//$nr = mysqli_num_rows($connection,$query);

//verificando si la ejecucion funciona-------------------------------------------------------------------------
if(!$query){
	echo("Error en la ejecucion: ".mysqli_error($connection));
	//header("Location: ../registro.php");
}else{

	$last_id = mysql_insert_id($connection);
	$_SECCION['IdUsuario'] = $last_id;

	if(isset($_SESSION['IdUsuario'])){
		$estado = true;
		header("Location: ../Login.php");
	}

}

?>