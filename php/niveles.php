<?php
require_once 'classNiveles.php';
$_nivel = new Nivel;
//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);
    
    if($datos["opc"]==1){
        header('Content-Type: application/json');
        $jala = $_nivel->listaNivelesCurso($datos);
        echo $jala;
    }
    /*if($datos["opc"]==2){
        header('Content-Type: application/json');
        $jala = $_nivel->getNivel($postbody);
        echo json_encode($jala);
    }*/
    
    
    //echo $jala;
    //json_encode($jala);
?>