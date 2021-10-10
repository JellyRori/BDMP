<?php
/*
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
*/



class BaseDeDatos{
	private $servidor;
	private $usuario;
	private $password;
	private $dbase;
	private $puerto;
	private $connection;

	public function _construct()
	{
		$this->servidor = "localhost";
		$this->usuario = "root";
		$this->password = "";
		$this->dbase = "BDM_Linea";
		$this->puerto = "3306";
	}

	public function Conectando(){
		$connection = new mysqli($this->servidor, $this->usuario, $this->password, $this->dbase, $this->puerto);

		if($connection->connect_errno){
			echo "La conexion ha fallado: (".$connection->connect_errno.") ".$connection->connect_error;
			exit();
		}/*else{
			$connect->query("SET NOMBRES 'utf8'");
		}*/

		return $connection;
	}
}


    /*public function Error(){
         
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

*/
/*

$sql = "INSERT INTO tabla1 (firstname, lastname, email)
VALUES (' " . $_POST['fname'] . " ', 'Perez', 'juanito@perez.com')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}


*/

?>