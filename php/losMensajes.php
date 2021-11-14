<?php
require_once 'classMensajes.php';
$_mensaje = new mensajes;
$postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);

    if($datos["opc"]==1){
        header('Content-Type: application/json');
        $jala = $_mensaje->mandarMensaje($postbody);
        echo $jala;
    }
    if($datos["opc"]==2){
        header('Content-Type: application/json');
        $jala = $_mensaje->mensajearAProfes();   
        echo $jala;
        json_encode($jala);
    }
    if($datos["opc"]==3){
        header('Content-Type: application/json');
        $jala = $_mensaje->profesDeCurso($postbody);
        echo json_encode($jala);
    }
    if($datos["opc"]==4){
        header('Content-Type: application/json');
        $jala = $_mensaje->mensajearAAlumnos($postbody);
        echo $jala;
    }
    if($datos["opc"]==5){
        header('Content-Type: application/json');
        $jala = $_mensaje->verTodosLosMensajes();   
        echo $jala;
        json_encode($jala);
    }


?>