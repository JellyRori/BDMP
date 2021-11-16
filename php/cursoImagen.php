<?php
include_once 'classCurso.php';
$_curso = new Cursos();
//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);
    
    if($_POST['opc']==1){
        $nombre = $_POST["nombreCurso"];
        $descripcion= $_POST["descripcionCurso"];
        $costo= $_POST["costoCurso"];
        $cantLvls= $_POST["numNiveles"];
        $categoria1= $_POST["categoria1"];
        $categoria2= $_POST["categoria2"];
        
        $file_tmpi = $_FILES['foto']['tmp_name'];
        $file = file_get_contents( $file_tmpi);
        $blob =mysqli_real_escape_string($_curso->conexion,$file);
 
        $videoTrailer= $_FILES['videoPromo']['tmp_name'];
        $idCreador=$_SESSION["idUser"];
        $nuevoNombreTrailer="../videos/".$nombre.$idCreador.".mp4";
        move_uploaded_file($videoTrailer,$nuevoNombreTrailer);
        $nuevoNombreTrailer="videos/".$nombre.$idCreador.".mp4";

        $json = [
            "nombreCurso" => $nombre,
            "descripcionCurso"=> $descripcion,
            "videoPromo"=> $nuevoNombreTrailer,
            "costoCurso"=> $costo,
            "numNiveles"=> $cantLvls,
            "categoria1"=> $categoria1,
            "categoria2"=> $categoria2
        ];

        $contador=0;
        $contador2=0;
        $json2=array();
        while(isset($_POST["nomNivel".$contador])){
        
            $videoTrailerNvl= $_FILES['videoNvl'.$contador]['tmp_name'];
            $nombreNvl=$_POST["nomNivel".$contador];
            $nuevoNombreTrailerNvl="../videos/".$nombre.$nombreNvl.$contador.".mp4";
            move_uploaded_file($videoTrailerNvl,$nuevoNombreTrailerNvl);
            $nuevoNombreTrailerNvl="videos/".$nombre.$nombreNvl.$contador.".mp4";
            
            $tipo=$_FILES['otroArchNvl'.$contador]['name'];
            $otroArchNvl= $_FILES['otroArchNvl'.$contador]['tmp_name'];
            $nombreNvl=$_POST["nomNivel".$contador];
            $nuevoNombreArchNvl="../archivos/".$nombre.$nombreNvl.$contador.$tipo;
            move_uploaded_file($otroArchNvl,$nuevoNombreArchNvl);
            $nuevoNombreArchNvl="archivos/".$nombre.$nombreNvl.$contador.$tipo;

            $json2[$contador2]=$nombreNvl;
            $contador2++;
            $json2[$contador2]=$nuevoNombreTrailerNvl;
            $contador2++;
            $json2[$contador2]=$nuevoNombreArchNvl;
            $contador2++;
            $contador++;
        }
        $coco= json_encode($json2);
        $coso = json_encode($json);

        $jala = $_curso->CrearCurso($coso,$coco,$blob);
     }
    if($_POST['opc']==2)
        $jala = $_curso->getCurso($postbody);
    /*if($_POST['opc']==3)
        $jala = $_curso->modificarCurso($postbody);*/

 echo $jala;
?>