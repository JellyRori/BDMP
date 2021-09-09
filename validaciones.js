

function validarCorreo(correo){
	 var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/; 
	 var esValido= expReg.test(correo);

	 if(esValido==true){
	 	alert('El correo electronico es valido');

	 }else{
	 	alert('El correo electronico NO es valido');
	 }
}