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
    /*if($datos["opc"]==4){
        $funciona = $_usuario->modificarUsuario($postbody);
        echo $funciona;
    }*/
    //header('Content-Type: application/json');//le dices que devuelve un json
    
    //echo $funciona;
    //json_encode($funciona);
?>