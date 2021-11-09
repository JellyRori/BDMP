<?php
    require_once "conection.php"; //
    session_start();
    class Usuario extends conexion{
        public function CrearUsuario($json,$foto){
            $datos = json_decode($json,true);
            //estos son los datos del json que se tomarán-------------------------------------------------------------------------------------------------
            $nombre = $datos["nombre"];
            $apellidos = $datos["apellidos"];
            $fechaNac = $datos["fechaNac"];
            $email = $datos["email"];
            $contra = $datos["contra"];
            $rol= $datos["rol"];
            
            //Mandando a llamar el stored procedure--------------------------------------------------------------------------------------------------
            $query = "Call sp_registrarUsuario('$nombre','$apellidos',' $fechaNac',
            '$email','$contra',$rol,'$foto');";
            $verificacion = parent::rowsAfectados($query); //aqui detecta si capturó los datos-------------------------------------------------------
            //condicional para ver si se tomaron los datos---------------------------------------------------------------------------------------
            if($verificacion == 1){
                $success="success";
                return $success;
               
            }else{
                $success="fail";
                return  parent::Error();
            }
           ;
        }
        public function iniciarSesion($json){
            $datos = json_decode($json,true);
            //son los datos del json
            $email = $datos["email"];
            $contra = $datos["contra"];
            $query = "Call sp_iniSesion('$email','$contra');";
            
            $verificacion = parent::ObtenerUsuario($query);
            if($verificacion==1){
               
                $_SESSION["email"]=$email;
               
                $success="sesionEncontrada";
                return $success;
            }
            else{
                $success="sesionNoExiste";
                return $success;
            }
        }

        public function getPerfilUsuario(){
            header('Content-Type: application/json');
            if(isset($_SESSION["nombre"])){
                $idUs=$_SESSION["idUser"];
                $nombre=$_SESSION["nombre"];
                $apellidos=$_SESSION["apellidos"];
                
                $email=$_SESSION["email"];
                $rol=$_SESSION["rol"];
                
           $json = [
                "idUser" => $idUs,
                "nombre" => $nombre,
                "apellidos"=> $apellidos,
                "email"=> $email,
                "rol"=> $rol
            ];
            return $json;
            }else{
                $success="fail";
                return $success;
            }
        }

        public function modificarUsuario($json,$foto){
            $datos = json_decode($json,true);
            //son los datos del json
            $nombre = $datos["nombre"];
            $apellidos = $datos["apellidos"];
            $email = $datos["email"];
            $contra = $datos["contra"];
            //$foto = $datos["foto"];
            $idUser= $_SESSION["idUser"];
            $query = "Call sp_editarUsuario($idUser,'$nombre','$apellidos','$email','$contra','$foto');";
            $verificacion = parent::rowsAfectados($query);
            
            if($verificacion){
                $_SESSION["nombre"]=$nombre;
                $_SESSION["apellidos"]=$apellidos;
                $_SESSION["email"]=$email;
                $_SESSION["contra"]=$contra;
               // $_SESSION["foto"]=$foto;
                $success="CambiosHechos";
                return $success;
                
            }else{
                $success="failCambios";
                return $success;
            }
          
        }
    }
?>
