var formulario = document.getElementById('forma'),
    username = forma.username, //accediendo al formulario con el id "nombre"
    correo = forma.correo,
    password = forma.password,
    birthday = forma.birthday,
    rol = forma.rol,
    avatar = forma.avatar,
    error = document.getElementById('error'),
    regex =     /^(?=.*\d)(?=-*[!@#$%&*])(?=.*[a-z])(?=.*[A-Z]).{8,64}$/;
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
    else if(regex.test(password.value)==false)
    {
      error.style.display = 'block';
      alert("La contraseña debe tener minimo 8 caracteres, un numero, una mayuscula y un character eespecial");
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

function Contraseña(password){
    
    var MAYUS = false;
    var minus = false;
    var numero = false;
    var caracter_especial = false;
    
    for(var i = 0;i<password.length;i++){
        if(password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90){
            MAYUS = true;
        }
        else{
            
        }
        if(password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122)
        {
            minus = true;
           
        }
        else{
           
        }
        if(password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57)
        {
            numero = true;
        }
        else
        {
            caracter_especial = true;
        }
    }
    if(MAYUS === true && minus === true && caracter_especial === true && numero === true){
        password.style.display = 'none';
       
        return true;
        
    }
    else{
        password.style.display = 'block';
        
    }

return false;
}

  /*  function test(e){
    if(regex.test(document.getElementById("password").value)==false)
    {
      error.style.display = 'block';
      alert("La contraseña debe tener minimo 8 caracteres, un numero, una mayuscula y un character eespecial");

    }
    else{
      alert("usuario registrado");
    }
  }


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

/´posible ayuda para lo especial de la contraseña----------------------------------------------
  function validarCorreo(correo){
   var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/; 
   var esValido= expReg.test(correo);

   if(esValido==true){
    alert('El correo electronico es valido');

   }else{
    alert('El correo electronico NO es valido');
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
   Contraseña(password);
    /*validarPass(e);
    validarCumple(e);
    validarAvatar(e);
    validarFecha(e);*/
  }

  formulario.addEventListener('submit', validarForm); //ejecutando la funcion global (que a su vez ejecuta las funciones dentro de ella)
