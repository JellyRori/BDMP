<?php

require_once 'classHistorial.php';
$_Historial = new Historial;
//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);
    
    if($datos["opc"]==1){
        header('Content-Type: application/json');
        $jala = $_Historial->ActHistorial($postbody);
        header('Content-Type: application/json');//le dices que devuelve un json
        echo $jala;
        json_encode($jala);
    }
    if($datos["opc"]==2){
        header('Content-Type: application/json');
        $jala = $_Historial->VerificacionNivFinal($postbody);
        header('Content-Type: application/json');//le dices que devuelve un json
        echo $jala;
        json_encode($jala);
    }
    if($datos["opc"]==3){
        header('Content-Type: application/json');
        $jala = $_Historial->verHistorialDeCursos($postbody);
        header('Content-Type: application/json');//le dices que devuelve un json
        echo $jala;
        json_encode($jala); 
    }
    if($datos["opc"]==4){
        header('Content-Type: application/json');
        $jala = $_Historial->verVentasUsuario($postbody);
        header('Content-Type: application/json');//le dices que devuelve un json
        echo $jala;
        json_encode($jala); 
    }
    if($datos["opc"]==5){
        header('Content-Type: application/json');
        $jala = $_Historial->verTotalUsuario($postbody);
        header('Content-Type: application/json');//le dices que devuelve un json
        echo $jala;
        json_encode($jala); 
    }
    if($datos["opc"]==6){
        header('Content-Type: application/json');
        $jala = $_Historial->verDetallesAlumno($postbody);
        header('Content-Type: application/json');//le dices que devuelve un json
        echo $jala;
        json_encode($jala); 
    }

?>