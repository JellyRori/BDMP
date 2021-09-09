var formulario = document.getElementById('forma'),
    username = forma.username, //accediendo al formulario con el id "nombre"
    correo = forma.correo,
    password = forma.password,
    birthday = forma.birthday,
    rol = forma.rol,
    avatar = forma.avatar,
    error = document.getElementById('error');

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
    } else {
      error.style.display = 'none'; //resetear el error (en caso de no haber error)
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

 /* 

  function validarFecha(e){
    if (birthday.HasValue== '' || birthday.HasValue == null){
      error.style.display = 'block';
      alert("Por favor ponga su fecha de nacimiento (y no olvide la hora)");
      e.preventDefault();
    } else {
      error.style.display = 'none';
    }
  }

  function validarAvatar(e){
    if (avatar.value == '' || avatar.value == null){
      error.style.display = 'block';
      alert("Por favor elija su preferencia");
      e.preventDefault();
    } else {
      error.style.display = 'none';
    }
  }

   

*/
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
  }

  formulario.addEventListener('submit', validarForm); //ejecutando la funcion global (que a su vez ejecuta las funciones dentro de ella)
