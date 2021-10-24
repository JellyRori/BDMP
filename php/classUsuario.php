<?php
    require_once "conection.php";
    session_start();
    class Usuario extends conexion{
        public function CrearUsuario($json,$foto){
            $datos = json_decode($json,true);
            //son los datos del json
            $nombre = $datos["nombre"];
            $apellidos = $datos["apellidos"];
            $fechaNac = $datos["fechaNac"];
            $email = $datos["email"];
            $contra = $datos["contra"];
            $rol= $datos["rol"];
            

            $query = "Call sp_registrarUsuario('$nombre','$apellidos',' $fechaNac',
            '$email','$contra',$rol,'$foto');";
            $verificacion = parent::rowsAfectados($query);
            
            if($verificacion == 1){
                $success="success";
                return $success;
               
            }else{
                $success="fail";
                return  parent::Error();
            }
           ;
        }
        /*public function iniciarSesion($json){
            $datos = json_decode($json,true);
            //son los datos del json
            $correo = $datos["correo"];
            $contrasena = $datos["contrasena"];
            $query = "Call obtenerPerfil('$correo','$contrasena');";
            
            $verificacion = parent::ObtenerUsuario($query);
            if($verificacion==1){
               
                $_SESSION["correo"]=$correo;
               
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
                $idUs=$_SESSION["id"];
                $nombre=$_SESSION["nombre"];
                $apellidos=$_SESSION["apellidos"];
                $nick=$_SESSION["nickname"];
                $correo=$_SESSION["correo"];
                $esProfe=$_SESSION["esMaestro"];
                
           $json = [
                "idUsuario" => $idUs,
                "nombre" => $nombre,
                "apellidos"=> $apellidos,
                "nickname"=> $nick,
                "correo"=> $correo,
                "esMaestro"=> $esProfe
            ];
            return $json;
            }else{
                $success="fail";
                return $success;
            }
        }

        public function modificarUsuario($json){
            $datos = json_decode($json,true);
            //son los datos del json
            $nombre = $datos["nombre"];
            $apellidos = $datos["apellidos"];
            $nickname = $datos["nickname"];
            $correo = $datos["correo"];
            $foto = $datos["foto"];
            $idUs= $_SESSION["id"];
            $query = "Call editarUsuario($idUs,'$nombre','$apellidos',
            '$nickname','$correo',' $foto');";
            $verificacion = parent::rowsAfectados($query);
            
            if($verificacion){
                $_SESSION["nombre"]=$nombre;
                $_SESSION["apellidos"]=$apellidos;
                $_SESSION["correo"]=$correo;
                $_SESSION["nickname"]=$nickname;
                $success="CambiosHechos";
                return $success;
                
            }else{
                $success="failCambios";
                return $success;
            }
          
        }*/
    }
?>
