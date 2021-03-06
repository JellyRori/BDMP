<?php

require_once "conection.php";
session_start();
class Historial extends conexion{

    public function ActHistorial($json){
        $datos = json_decode($json,true);
        $idAl = $_SESSION["idUser"];
        $idNivel = $datos["idNivel"];
        $query = "Call sp_actualizaElHistorial($idAl,$idNivel);";

        $verificacion = parent::rowsAfectados($query);
        if($verificacion == 1){
            $success="success";
            return $success;    
        }else{
            $success="fail";
            return parent::Error(); 
        }
    }

    public function VerificacionNivFinal($json){
        $datos = json_decode($json,true);
        $idAl = $_SESSION["idUser"];
        $idNivel = $datos["idNivel"];
        $query = "Call sp_RevisarCursoFinal($idAl,$idNivel);";

        $verificacion = parent::rowsAfectados($query);
        if($verificacion == 1){
            $success="success";
            return $success;    
        }else{
            $success="fail";
            return parent::Error(); 
        }
    }

    public function verHistorialDeCursos(){
        header('Content-Type: application/json');
        $alumnoHistorial=$_SESSION["idUser"];
        //son los datos del json
        $query = "Call sp_MostrarHistorialAlumno('$alumnoHistorial');";
        
        $cursos = parent::obtenerDatos($query);
        if(isset($cursos[0]["idCurso"])){           
            return json_encode($cursos);
        }
        else{
            $success="NoHayCursos";
            return $success;
        }
    }

    public function verVentasUsuario(){
        header('Content-Type: application/json');
        $ventaMaestro=$_SESSION["idUser"];
        //son los datos del json
        $query = "Call sp_VentasMaestro('$ventaMaestro');";
        
        $cursos = parent::obtenerDatos($query);
        if(isset($cursos[0]["idCurso"])){           
            return json_encode($cursos);
        }
        else{
            $success="NoHayCursos";
            return $success;
        }
    }

    public function verTotalUsuario(){
        header('Content-Type: application/json');
        $ventaTotal=$_SESSION["idUser"];
        //son los datos del json
        $query = "Call sp_elIngresoTotalDeTodo('$ventaTotal');";
        
        $cursos = parent::obtenerDatos($query);
        if(isset($cursos[0]["sumaTotal"])){           
            return json_encode($cursos);
        }
        else{
            $success="NoHayCursos";
            return $success;
        }
    }

    public function verDetallesAlumno($json){
        $datos = json_decode($json,true);
        header('Content-Type: application/json');
        $verTotal=$_SESSION["idUser"];
        $idCurso = $datos["idCurso"];
        //son los datos del json
        $query = "Call sp_LosAlumnosInscritos('$idCurso');";
        
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