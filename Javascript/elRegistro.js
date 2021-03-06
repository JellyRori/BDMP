function Registrar(form) {
  
    var nombre = document.getElementById("username").value;
    var apellidos = document.getElementById("lastname").value;
    var laFechas= document.getElementById("birthday").value;
    var correo = document.getElementById("email").value;
    var esProfeProv = $('input:radio[name=rol]:checked').val();
    var contra = document.getElementById("password").value; 
    var imagenComprobacion = document.getElementById("image").value;   

    var num = false;
    var carac = false;
    var arroba = false;
    var com = false;

    if (nombre.length!= 0 && apellidos.length!=0  && correo.length!=0 && imagenComprobacion.length != 0){

        if(correo.length > 5){     

            for (var i = 0; i < correo.length; i++) {
                var ch = correo.charAt(i);

                if(ch == "@"){
                    arroba = true
                }

                if (ch == "."){
                    if ((ch = correo.charAt(i+1)) == "c"){
                        if ((ch = correo.charAt(i+2)) == "o"){
                            if ((ch = correo.charAt(i+3)) == "m"){
                                com = true
                            }
                        }
                    }
                }

            }

            if(arroba == true && com == true){
                if (contra.length >= 8) {

                    for (var i = 0; i < contra.length; i++) {
                        var ch = contra.charAt(i);
                        if (ch >= "0" || ch <= "9")
                            num = true;
                        if (ch == "/" || ch == "*" || ch == "¡" || ch == "”" || ch == "#" || ch == "$" || ch == "%" || ch == "&" || ch == "=" || ch == "’" || ch == "?" || ch == "¡" || ch == "¿" || ch == ":" || ch == ";" || ch == "," || ch == "."
                            || ch == "-" || ch == "_" || ch == "+" || ch == "{" || ch == "]" || ch == "[" || ch == "}"|| ch=="@" || ch=="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$") {
                            carac = true;
                        }
                    }
                    if (num==true&&carac==true) {
                        window.alert("Contraseña guardada");
                        var opc=1;
                        var esProfe;
                        if(esProfeProv=="maestro")
                            esProfe="true";
                        else{
                            if(esProfeProv=="alumno")
                                esProfe="false";
                        }
                        let Body = {nombre,apellidos,laFechas,correo,contra,esProfe,opc}        
        
                        var FoDatos = new FormData();
                        FoDatos.append('nombre',nombre);
                        FoDatos.append('apellido',apellidos);
                        FoDatos.append('fechaNac',laFechas);
                        FoDatos.append('correo',correo);
                        FoDatos.append('contra',contra);
                        FoDatos.append('esProfe',esProfe);
                        FoDatos.append('foto',$("#image")[0].files[0]);
                        FoDatos.append('opc',opc);      
                    
                    fetch('php/perfilUsuarioImagen.php',{method:"POST",body:FoDatos})
                    .then(response => {
                        return response.text();
                    })
                    .then(data => {
                        
                        var Jason =data;
                        console.log(Jason);
                        if(Jason==="success"){
                            alert("Registro exitoso");
                            window.location.href="Login.php";
                        }
                        else
                            alert(Jason.result);
                            window.location.href="Login.php";
                        //"status" => "ok",
                        //"result" => array()
                        })
                    }else {
                        window.alert("La contraseña debe tener al menos un numero y un caracter especial");
                    }
                }
                else{
                    window.alert("La contraseña debe tener 8 caracteres");
                }
            }
            else{
                window.alert("Verifique el correo")
            }    

        }
        else{
            window.alert("Correo no aceptable")
        }    
    }
    else{
        window.alert("Debe llenar todos los campos")
    }
}