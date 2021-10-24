<?php
require_once 'classUsuario.php';
$_usuario = new Usuario;

//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);

    if($_POST['opc']==1){
       $name= $_POST['nombre'];
        $apellido= $_POST['apellido'];
        $fechaNac = $_POST["fechaNac"];
        $email= $_POST['correo'];
        $contra= $_POST['contra'];
        $rol= $_POST['esProfe'];
        
        $file_tmpi = $_FILES['foto']['tmp_name'];
        $file = file_get_contents( $file_tmpi);
        $blob =mysqli_real_escape_string($_usuario->conexion,$file);

        $json = [
            "nombre" => $name,
            "apellidos"=> $apellido,
            "fechaNac"=> $fechaNac,
            "email"=> $email,
            "contra"=> $contra,
            "rol"=> $rol
        ];

        $coso = json_encode($json);
        $funciona = $_usuario->CrearUsuario($coso,$blob);
    }

    
    /*if($_POST['opc']==2)
        $funciona = $_usuario->iniciarSesion($postbody);
    if($_POST['opc']==3)
        $funciona = $_usuario->getPerfilUsuario();
    if($_POST['opc']==4)
        $funciona = $_usuario->modificarUsuario($postbody);*/
   
    echo $funciona;
?>