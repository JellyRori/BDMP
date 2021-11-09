<?php
require_once 'classUsuario.php';
$_usuario = new Usuario;
//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);
    
    if($datos["opc"]==2){
        $funciona = $_usuario->iniciarSesion($postbody);
        echo $funciona;
    }
    if($datos["opc"]==3){
        header('Content-Type: application/json');
        $funciona = $_usuario->getPerfilUsuario();
        echo json_encode($funciona);
    }
    //if($datos["opc"]==4){
       /* $name= $_POST['nombre'];
        $apellido= $_POST['apellido'];
        $fechaNac = $_POST["fechaNac"];
        $email= $_POST['correo'];
        $contra= $_POST['contra'];
        
        $file_tmpi = $_FILES['foto']['tmp_name'];
        $file = file_get_contents( $file_tmpi);
        $blob =mysqli_real_escape_string($_usuario->conexion,$file);

        $json = [
            "nombre" => $name,
            "apellidos"=> $apellido,
            "fechaNac"=> $fechaNac,
            "email"=> $email,
            "contra"=> $contra
        ];

        $coso = json_encode($json);
        $funciona = $_usuario->modificarUsuario($coso,$blob);*/
      //$funciona = $_usuario->modificarUsuario($postbody);
      //echo $funciona;
    //}
    //header('Content-Type: application/json');//le dices que devuelve un json
    
    //echo $funciona;
    //json_encode($funciona);
?>