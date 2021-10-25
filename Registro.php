<!DOCTYPE html>
<html>
<head>

	<meta charset="utf-8">
	<title>Registrarse</title>

	<link rel="stylesheet" type="text/css" href="RegistroC.css">
  <script src="Javascript/elRegistro.js"></script>
  <script src="Javascript/jquery-2.1.4.min.js"></script>
    
	<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
</head>
<body>


<div class="login-block">
    <h1>Registro</h1>
   <!-- <form action="php/elRegistro.php" method="POST" class="forma" name="forma" id="forma" enctype="multipart/form-data">-->
   <div class="formR">
      <div class="contenedor-inputs">
        
        
          <input type="text" value="" placeholder="Nombre" id="username" name="username" />

          <input type="text" value="" placeholder="Apellidos" id="lastname" name="lastname" />

          <input type="email" value="" placeholder="Correo" id="email" name="email" /> 

          <input type="password" minlength="8" value="" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Procura que tu contrseña tenga un caracter especial, un numero y una mayuscula" placeholder="Password" id="password" name="password" />

       

         <label for="birthday">Birthday:</label>
        <input type="date" id="birthday" name="birthday" required> <br> <br>

         <!--<label for="birthday">Birthday:</label>
        <input type="time" id="birthday" name="birthday2" required> <br> <br>-->

        <label for="image">Imagen de perfil:</label>
            <input class="controls" class="form-error" type="file" name="image" id="image"
                placeholder="Seleccione una imagen" required>

          <br/>
          <br/>

        <label class="radio-button"> Aqui es donde elige si aprender o enseñar </label>
        <div>
            <br />
            <input type="radio" name="rol" id="Alumno" value="alumno" checked>
            <label class="radio-button" for="Alumno">Alumno</label>
            <input type="radio" name="rol" id="Maestro" value="maestro">
            <label class="radio-button" for="maestro">Maestro</label>
        </div>
      
       <br> <br>
       
       

 
        <br>
        <ul class="error" id="error"></ul>
      </div>
    
      <input type="submit" value="Ingresar" onclick="Registrar()" class="btn"  id="Ing" />
    <!--</form>-->
    </div>


</div>

<script src="Javascript/jquery-2.1.4.min.js"></script>
<script  src="Javascript/validaciones.js"></script>
</body>
</html>