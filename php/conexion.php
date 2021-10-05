<?php
			$usuario = "root";
   			$password = "";
class conectando{

	public static function conexion(){

		try{

			
   			$conexion = new PDO("mysql:host=localhost;dbname=BDM_Linea", $usuario, $password);
   			$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   			$conexion->exec("SET ChARACTER SET UTF8");

		}catch(Exception $ex){
			die("Error: ". $ex->getMessage());
			echo "Linea de error " . $ex->getLine();
		}
		return $conexion;
	}
}