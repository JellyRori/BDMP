<?php
require_once "conection.php";
session_start();

class Mensajes extends conexion{

    public function mandarMensaje($json){
        $datos = json_decode($json,true);
        //son los datos del json
        //idHabloCon,comentario
        $idEnvia = $_SESSION["idUser"];
        $idRecibe = $datos["idHabloCon"];
        $mensaje = $datos["mensaje"];
        $query = "Call sp_escribirMensaje($idEnvia,$idRecibe,'$mensaje');";
        
        $verificacion = parent::rowsAfectados($query);
        
        if($verificacion == 1){
            $query2 = "Call sp_verMensajes($idEnvia,$idRecibe);";
            $mensajes = parent::obtenerDatos($query2);
            
            if(isset($mensajes[0]["idUser"])){           
               return json_encode($mensajes);
            }else{
                $success="NoHayMensajes";
                return $success;
            }
           
        }else{
            $success="mensajeNoEnviado";
            return  parent::Error();
        }
    }


    public function mensajearAProfes(){
        header('Content-Type: application/json');
        $enviarMensaje = $_SESSION["idUser"];
        //son los datos del json
        $query = "call sp_MensajearAMaestro($enviarMensaje);";
        
        $profes = parent::obtenerDatos($query);
    
        if(isset($profes[0]["ClaveProfesor"])){           
            return json_encode($profes);
        }
        else{
            $success="NoHayMaestros";
            return $success;
        }
    }

    public function profesDeCurso($json){
        header('Content-Type: application/json');
        $datos = json_decode($json,true);
        //son los datos del json
        $id=$datos["idHabloCon"];
        //son los datos del json
        $query = "call sp_profeDeCurso($id);";
        
        $profe = parent::obtenerDatos($query);
      
        if(isset($profe[0]["idUser"])){
            //id_usuario, nombre, apellidos
            $profeId = $profe[0]["idUser"];
            $nameP = $profe[0]["nombre"];
            $apellidos = $profe[0]["apellidos"];
           
            $json = [
                "profeId" => $profeId,
                "nameP" => $nameP,
                "apellidos"=> $apellidos
            ];    
            return $json;
        }
        else{
            $success="NivelNoEncontrado";
            return parent::Error();
        }
    }

    public function mensajearAAlumnos(){
        header('Content-Type: application/json');
        $enviarMensaje = $_SESSION["idUser"];
        //son los datos del json
        $query = "call sp_MensajearAAlumno($enviarMensaje);";
        
        $profes = parent::obtenerDatos($query);
    
        if(isset($profes[0]["ClaveAlumno"])){           
            return json_encode($profes);
        }
        else{
            $success="NoHayAlumnos";
            return $success;
        }
    }

    public function verTodosLosMensajes($json){
        $datos = json_decode($json,true);
        //son los datos del json
        //idHabloCon,comentario
        $idEnvia = $_SESSION["idUser"];
        $idRecibe = $datos["idHabloCon"];
        
        
        $query = "Call sp_verMensajes($idEnvia,$idRecibe);";
        $mensajes = parent::obtenerDatos($query);
            
        if(isset($mensajes[0]["idUser"])){           
            return json_encode($mensajes);
        }else{
            $success="NoHayMensajes";
            return $success;
        } 
        
    }


}

?>