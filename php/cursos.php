<?php
require_once 'classCurso.php';
$_curso = new Cursos;

//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);

    if($datos["opc"]==2){
        header('Content-Type: application/json');
        $jala = $_curso->datosDelCurso($postbody);
        echo json_encode($jala);
    }
    if($datos["opc"]==3){
        header('Content-Type: application/json');
        $jala = $_curso->traerTodosLosCursos1Prof();
        echo $jala;
    }
   /* if($datos["opc"]==4){
        header('Content-Type: application/json');
        $jala = $_curso->traerTodosLosCursosInsAl();
        echo $jala;
    }*/


?>