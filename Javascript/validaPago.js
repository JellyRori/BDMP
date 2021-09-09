var formulario = document.getElementById('forma'),
	CursoN = forma.CursoN,
	Dec = forma.Dec,
	avatar = forma.avatar,
	cars = forma.cars,
	EstudianteID = forma.EstudianteID,
	MaestroID = forma.MaestroID,
	video = forma.video,
	Ag = forma.video,
	error = document.getElementById('error');



function validarNombre(e){
    if (CursoN value == '' || CursoN .value == null){
      error.style.display = 'block';
      alert("Por favor completa el nombre del curso"); //escribiendo el error poniendolo en un alert
      e.preventDefault(); //detener la ejecucion (no envia el formulario)
    } else {
      error.style.display = 'none'; //resetear el error (en caso de no haber error)
    }
  }



  function validarForm(e){
    error.innerHTML = ''; //que el error esté en blanco (para que no se acumulen los mensajes al picar el boton)

    validarNombre(e);
  
  }

  formulario.addEventListener('submit', validarForm);