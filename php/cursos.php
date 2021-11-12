<?php
require_once 'classCurso.php';
$_curso = new Cursos;

//recibe el json y lo transforma a un arreglo
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
    if($datos["opc"]==6){
        header('Content-Type: application/json');
        $jala = $_curso->pagarCurso($postbody);
        header('Content-Type: application/json');
        echo $jala;
        json_encode($jala);
    }
    
    if($datos["opc"]==7){
        header('Content-Type: application/json');
        $jala = $_curso->cursoComprado($postbody);
        echo json_encode($jala);
    }

    if($datos["opc"]==8){
        header('Content-Type: application/json');
        $jala = $_curso->buscarCurso($postbody);
 
        echo $jala;
    }
    /*if($datos["opc"]==9){
        header('Content-Type: application/json');
        $jala = $_curso->ObtNomsCurso($postbody); 
        echo json_encode($jala);
    }*/
    if($datos["opc"]==10){
        header('Content-Type: application/json');
        $jala = $_curso->traerTodosLosCursosAlumno();
        echo $jala;
    }
    if($datos["opc"]==12){
        header('Content-Type: application/json');
        $jala = $_curso->calificarCurso($postbody);
        header('Content-Type: application/json');
        echo $jala;
        json_encode($jala);
    }
    if($datos["opc"]==13){
        header('Content-Type: application/json');
        $jala = $_curso->Destacados();
        echo $jala;
    }

?>