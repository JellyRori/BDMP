<?php

    class conexion{
      private $server;
      private $user;
      private $password;
      private $database;
      private $port;
      public $conexion;
//Funcion para hacer la conexion---------------------------------------------------------------------------------------------------------
      function __construct(){
           $listadatos = $this->datosconexion();
           foreach($listadatos as $key => $value){
               $this->server = $value["server"];
               $this->user = $value["user"];
               $this->password = $value["password"];
               $this->database = $value["database"];
               $this->port = $value["port"];
               }

               $this->conexion = new mysqli($this->server,$this->user,$this->password,$this->database,$this->port);
               if($this->conexion->connect_errno){
                   echo "La conexion no se pudo realizar, algo debe estar mal";
                   die();
               }
      }

  //funcion de conexion con los datos-----------------------------------------------------------------------------------------------------
      private function datosconexion(){
        $direccion = dirname(__FILE__);
        $jsondata = file_get_contents($direccion."/"."config"); //tomando la direccion del archivo "config" (en donde está nuestra base de datos)
        return json_decode($jsondata,true);
       }

      public function rowsAfectados($query){
        $this->conexion->query($query);
        return $this->conexion->affected_rows;
       }

       public function Error(){
       
        return $this->conexion->error;
       }

       public function obtenerDatos($query){
        $results = $this->conexion->query($query);
        $resultarray = array();
    
        foreach($results as $key){
          $resultarray[]= $key;
        }
        return $this->convertirUTF8($resultarray);
       }

//Funcion para obtener los datos del usuario -----------------------------------------------------------------------------------------------------------------------------
       public function ObtenerUsuario($query){
        $resultado = mysqli_query($this->conexion,$query);
        $row = mysqli_fetch_array($resultado); 
        if(isset($row["nombre"]) ){
          //session_start();
          $_SESSION["idUser"]=$row["idUser"];
          $_SESSION["nombre"]=$row["nombre"];
          $_SESSION["apellidos"]=$row["apellidos"];
          $_SESSION["rol"]=$row["rol"];
          $_SESSION["foto"]=$row["foto"];
          return 1;
        }
        else
        {
          return 0;
          }
       }

       private function convertirUTF8($array){
        array_walk_recursive($array,function(&$item,$key){
            if(!mb_detect_encoding($item,'utf-8',true)){
                $item = utf8_encode($item);
            }
        });
        return $array;
    }

    }

   // $_usuario = new conexion;
    //echo $_usuario.$listadatos;
?>