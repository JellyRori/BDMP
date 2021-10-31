<?php
require_once "conection.php";
    session_start();

    class Cursos extends conexion{
        //Funcion para crear curso--------------------------------------------------------------------------------------------------
        public function CrearCurso($json,$json2,$foto){
            $datos = json_decode($json,true);
            $datos2 = json_decode($json2,true);
            //tomando los datos del Json--------------------------------------------------------------------------------------------
            $nombreCurso = $datos["nombreCurso"];
            $descripcion= $datos["descripcionCurso"];
            $videoPromo= $datos["videoPromo"];
            $costoCurso= $datos["costoCurso"];
            $cantNivel= $datos["numNiveles"];
            $categoria1= $datos["categoria1"];
            $categoria2= $datos["categoria2"];
            $idMaestro=  $_SESSION["idUser"];
            //mandando a llamar el stored procedure-------------------------------------------------------------------------------
            $query = "Call sp_subirrCurso('$nombreCurso','$descripcion','$foto',
            '$videoPromo',$costoCurso,$cantNivel,$idMaestro,$categoria1,
            $categoria2);";

            $verificacion = parent::rowsAfectados($query);
            $verificacion2 = false;

            $contador=0;
            $contador2=1;

            while(isset($datos2[$contador])){
                $nombreNivel=$datos2[$contador];
                $contador++;
                $videoNivel=$datos2[$contador];
                $contador++;
                $ContenidoNivel=$datos2[$contador];
                $contador++;
                $query ="call sp_registroNivelAlCurso('$nombreNivel','$videoNivel','$ContenidoNivel',
                $contador2,'$nombreCurso','$descripcion',$cantNivel,$idMaestro);";
                $contador2++;
                $cantidad = parent::rowsAfectados($query);
                if($cantidad!=1){
                    $verificacion2 = true;
                }
            }

            
            if($verificacion == 1 && $verificacion2 == false){
                $success="success";
                return $success;
            }else{
                $success="fail";
                return parent::Error();
            }
           //;
        }

        public function traerTodosLosCursos1Prof(){
            header('Content-Type: application/json');
            $usuarioEscuela=$_SESSION["idUser"];
            
            //son los datos del json
            $query = "Call sp_cursosDeMaestros('$usuarioEscuela');";
            
            $cursos = parent::obtenerDatos($query);
            if(isset($cursos[0]["idCurso"])){           
                return json_encode($cursos);
            }
            else{
                $success="NoHayCursos";
                return $success;
            }
        }



    }


?>