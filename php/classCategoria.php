<?php
    require_once "conection.php";
    session_start();
    class categoria extends conexion{
        public function crearCategoria($json){
            $datos = json_decode($json,true);
            //son los datos del json
            $nomCateg = $datos["nombre"];
            $descCateg = $datos["descripcion"];
            $usuario = $_SESSION["idUser"];
            
            $query = "Call sp_crearCategoria('$nomCateg','$descCateg ',$usuario);";
            $verificacion = parent::rowsAfectados($query);
            
            if($verificacion == 1){
                $success="success";
                return $success;
               
            }else{
                $success="fail";
                return  parent::Error();
            }
        }

        public function getAllCategorias(){
            header('Content-Type: application/json');
            
            //son los datos del json
            $query = "call sp_obtenCategoria();";
            
            $categorias = parent::obtenerDatos($query);
        
            if(isset($categorias[0]["nomCateg"])){           
                return json_encode($categorias);
            }
            else{
                $success="NoHayCategorias";
                return $success;
            }
        }

    }


?>