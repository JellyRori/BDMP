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

//Visualizar un curso-----------------------------------------------------------------------------------------------------------------
public function datosDelCurso($json){
    
    header('Content-Type: application/json');
    $datos = json_decode($json,true);
    //son los datos del json
    $id=$datos["_postID"];
    $query = "Call sp_DatosCurso('$id');";
    
    $post = parent::obtenerDatos($query);
    if(isset($post[0]["idCurso"])){
        $idCurso =$post[0]["idCurso"];
        $name = $post[0]["nomCurso"];
        $descripcion = $post[0]["descCurso"];
        $cantNvls = $post[0]["cantNivel"];
        $trailerCur = $post[0]["videoMuestra"];
        $categorias = $post[0]["Categorias"];
        $costo = $post[0]["costo"];
        $NombreProfesor = $post[0]["Profesor"];
        $Media = $post[0]["Media"];
      
        $json = [
            "idCurso" => $idCurso,
            "nombre" => $name,
            "descripcion"=> $descripcion,
            "cantidadNiveles"=> $cantNvls,
            "trailerCurso"=> $trailerCur,
            "categorias"=> $categorias,
            "costo"=> $costo,
            "profesor"=> $NombreProfesor,
            "Media" => $Media
        ];
             
        return $json;
    }
    else{
        $success="CursoNoEncontrado";
        return parent::Error();
    }
}
//Traer los cursos creados por un profesor--------------------------------------------------------------------------------------------
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

//Inscribirse a un curso--------------------------------------------------------------------------------------------------------------
public function pagarCurso($json){
    $datos = json_decode($json,true);
    //son los datos del json
    $idUserAlumno = $_SESSION["idUser"];
    $idCurso = $datos["idCurso"];
    $query = "Call sp_compraCurso($idUserAlumno,$idCurso);";

    $verificacion = parent::rowsAfectados($query);
    if($verificacion == 1){
        $success="success";
        return $success;    
    }else{
        $success="fail";
        return parent::Error(); 
    }

}

public function cursoComprado($json){
    $datos = json_decode($json,true);
    //son los datos del json
    $idAl = $_SESSION["idUser"];
    $idCurso = $datos["idCurso"];
    $query = "Call sp_alumnoInscrito($idAl,$idCurso);";

    $post = parent::obtenerDatos($query);
    if(isset($post[0]["terminado"])){
        $terminado = $post[0]["terminado"];
        $json = [
            "terminado"=> $terminado
        ];
        return $json;
    }
    else{
        $success="CursoNoReg";
        return $success;
    }

}

//para el diploma---------------------------------------------------------------------------------------------------
public function diploCurso($json){
    $datos = json_decode($json,true);           
    $idCurso = $datos["idCurso"];
    $query = "Call sp_diploCurso($idCurso);";            
    $post = parent::obtenerDatos($query);
    if(isset($post[0]["nomCurso"])){
        $NomAl = $_SESSION["nombre"];
        $NomAl .= " ";
        $NomAl .= $_SESSION["apellidos"];
        $name = $post[0]["nomCurso"];
        $NomProf = $post[0]["Profesor"];
        $fechaConclusion = $post[0]["FechaConcluido"];
      
        $json = [
            "nombreAlumno" => $NomAl,
            "nombre" => $name,   
            "nombreProfesor" => $NomProf,
            "fechaConclusiones"=>$fechaConclusion

        ];
             
        return $json;
    }
    else{
        $success="CursoNoEncontrado";
        return parent::Error();
    }
}
//Buscar un curso---------------------------------------------------------------------------------------------------
public function buscarCurso($json){
    $datos = json_decode($json,true);
    //son los datos del json
    $buscado = $datos["buscando"];
   
    $query = "Call sp_buscarCurso('%$buscado%');";
    $cursos = parent::obtenerDatos($query);
    
  //  if(isset($cursos[0]["id_curso"])){
       
        return json_encode($cursos);
        //return $query;
        
   // }else{
      //  $success="No se encontro";
    //return $query;
   //     return json_encode($success);
  //  }
  
}

public function traerTodosLosCursosAlumno(){
    header('Content-Type: application/json');
    $idAlumn=$_SESSION["idUser"];
    
    //son los datos del json
    $query = "Call sp_obtenerCursosAlumno('$idAlumn');";
    
    $cursos = parent::obtenerDatos($query);
    if(isset($cursos[0]["idCurso"])){           
        return json_encode($cursos);
    }
    else{
        $success="NoHayCursos";
        return $success;
    }
}

public function calificarCurso($json){
    $datos = json_decode($json,true);
    //son los datos del json
    $idAl = $_SESSION["idUser"];
    $idCurso = $datos["idCurso"];
    $calCurso = $datos["cal"];

    $query = "Call sp_CalificarCurso($idAl,$idCurso, $calCurso);";

    $verificacion = parent::rowsAfectados($query);
    if($verificacion == 1){
        $success="success";
        return $success;    
    }else{
        $success="fail";
        return parent::Error(); 
    }

}

public function Destacados(){
    header('Content-Type: application/json');
    $query = "Call sp_CursosMejorCalificacion();";            
    $cursos = parent::obtenerDatos($query);
    if(isset($cursos[0]["idCurso"])){           
        return json_encode($cursos);
    }
    else{
        $success="NoHayCursos";
        return $success;
    }

}

public function Vendidos(){
    header('Content-Type: application/json');
    $query = "Call sp_CursosMasVendidos();";            
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