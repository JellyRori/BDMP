
<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" type="text/css" href="LoginC.css">
 <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
 <script src="Javascript/jquery-2.1.4.min.js"></script>
 <script src="Javascript/iniSesion.js"></script>
<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>

<script async src="//jsfiddle.net/StartBootstrap/1nu8g6e5embed/">

</script>
	
<!------ Include the above in your HEAD tag ---------->




	<meta charset="utf-8">
	<title></title>
</head>


<body>

<div class="logo"></div>

<div class="login-block">
    <h1>Login</h1>
 
    
    <!--<form action="php/elLogin.php" method="POST">-->
    <div class="containLogin">
        <input type="text" value="" placeholder="Email" id="username" name="Email" required/>
        <input type="password" value="" placeholder="Password" id="password" name="password" required/>
        <input type="submit" name="login" value="Ingresar" id="Ing" onclick="iniciaSesion();"/>

        <br> <br>
           <div class="rol">
            <a href="Registro.php">Si no tienes cuenta, registrate</a>
            </div>
    </div>
   
   <!-- </form>-->

</div>
</body>
</html>


