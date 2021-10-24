/* var formulario = document.getElementById('forma'),
    username = forma.username, //accediendo al formulario con el id "nombre"
    correo = forma.correo,
    password = forma.password,
    birthday = forma.birthday,
    rol = forma.rol,
    avatar = forma.avatar,
    error = document.getElementById('error');
    //regex =  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})";


  function validarNombre(e){
    if (username.value == '' || username.value == null){
      error.style.display = 'block';
      alert("Por favor completa el nombre"); //escribiendo el error poniendolo en un alert
      e.preventDefault(); //detener la ejecucion (no envia el formulario)
    } else {
      error.style.display = 'none'; //resetear el error (en caso de no haber error)
    }
  }

  function validarPass(e){
    
    if (password.value == '' || password.value == null){
      error.style.display = 'block';
      alert("Por favor completa la contraseña"); //escribiendo el error poniendolo en un alert
      e.preventDefault(); //detener la ejecucion (no envia el formulario)
    }
    else {
      error.style.display = 'none'; //resetear el error (en caso de no haber error)
    }
  }

function test(){
  var regex = regex =  /^(?=.*\d)(?=-*[!@#$%&*])(?=.*[a-z])(?=.*[A-Z]).{8,64}$/;
    if(regex.test(document.getElementById("password").value)==false)
    {
      error.style.display = 'block';
      alert("La contraseña debe tener minimo 8 caracteres, un numero, una mayuscula y un character eespecial");

    }
    else{
      return false;
      alert("usuario registrado");
    }
  }


//Y solo fui cambiando al función conforme al elemento que solicitaba
  function validarCorreo(e){
    if (correo.value == '' || correo.value == null){
      error.style.display = 'block';
      alert("Por favor completa el correo");
      e.preventDefault();
    } else {
      error.style.display = 'none';
    }
  }
  

 function validarElRol(e){
    if (rol.value == '' || rol.value == null){
      error.style.display = 'block';
      alert("Por favor elija su rol academico");
      e.preventDefault();
    } else {
      error.style.display = 'none';
    }
  }



  //Funcion global para ejecutar todas las funciones de validacion------------------------------------
  function validarForm(e){
    error.innerHTML = ''; //que el error esté en blanco (para que no se acumulen los mensajes al picar el boton)

    validarNombre(e);
    validarPass(e);
    validarCorreo(e);
    validarElRol(e);
    /*validarPass(e);
    validarCumple(e);
    validarAvatar(e);
    validarFecha(e);*/
  //}

  //formulario.addEventListener('submit', validarForm); //ejecutando la funcion global (que a su vez ejecuta las funciones dentro de ella) */