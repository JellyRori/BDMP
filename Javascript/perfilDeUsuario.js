$(document).ready(function () {
    mostrarDatosPerfil();
    function mostrarDatosPerfil() {

        var opc = 3;
        let Body = { opc }

        let jsonBody = JSON.stringify(Body)
        fetch('php/usuario.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.text();
            })
            .then(data => {
                var Jason = data;
                var obj = JSON.parse( Jason);
                var nombre = obj['nombre'];
                console.log(obj['nombre']);
                
                document.getElementById("nombre").innerHTML = obj['nombre'];
                document.getElementById("apellido").innerHTML = obj['apellidos'];
                document.getElementById("email").innerHTML = obj['email'];
                document.getElementById("rol").innerHTML = obj['rol'];
              
                document.getElementById("avatar").src = "php/laFotoDePerfil.php";
                if(obj['rol']==true){
                    
                    document.getElementById("btnHistorial").style.display = 'none';

                    document.getElementById("imgAvatar").style.display = 'inline';
                    document.getElementById("logOut").style.display = 'inline';
                    document.getElementById("histUser").style.display = 'none';
                    document.getElementById("imgAvatar").src = "php/laFotoDePerfil.php";
                }else{
                    if(obj['rol']==false)
                        document.getElementById("btnVentas").style.display = 'none';

                        document.getElementById("imgAvatar").style.display = 'inline';
                        document.getElementById("logOut").style.display = 'inline';
                        document.getElementById("ventUser").style.display = 'none';
                        //document.getElementById("nuevaCat").style.display = 'none';
                        document.getElementById("imgAvatar").src = "php/laFotoDePerfil.php";
                   }
            })
    }
});