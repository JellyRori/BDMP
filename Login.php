
<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" type="text/css" href="LoginC.css">
 <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>

<script async src="//jsfiddle.net/StartBootstrap/1nu8g6e5embed/">
<?php 
session_start();
$idUsuario = "";
if (isset($_SESSION['IdUsuario']))
{
    echo 'Se ha iniciado sesión  ';
    $idUsuario = is_null($_SESSION['IdUsuario']) ? "" : $_SESSION['IdUsuario'];
    echo '    id: ' .$idUsuario;
}
?>
</script>
	
<!------ Include the above in your HEAD tag ---------->




	<meta charset="utf-8">
	<title></title>
</head>


<body>

<div class="logo"></div>

<div class="login-block">
    <h1>Login</h1>
 
    
    <form action="php/elLogin.php" method="POST">
   <input type="text" value="" placeholder="Username" id="username" name="username" required/>
    <input type="password" value="" placeholder="Password" id="password" name="password" required/>
    <input type="submit" name="login" value="Ingresar" id="Ing"/>
</form>

</div>
</body>
</html>


