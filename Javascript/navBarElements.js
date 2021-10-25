$( document ).ready(function() {
    navUsuario();
    function navUsuario() {
        var opc = 3;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        console.log(jsonBody);
        fetch('php/usuario.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.text();
            })
            .then(data => {
                var Jason = data;
                var obj = JSON.parse( Jason);
                console.log(data);
                //Condicional que identifica si el usuario es maestro o alumno-----------------------------------------------------------------
                if(obj['rol']==true){
                    document.getElementById("imgAvatar").style.display = 'inline';
                    document.getElementById("logOut").style.display = 'inline';
                    document.getElementById("histUser").style.display = 'none';
                    document.getElementById("imgAvatar").src = "php/laFotoDePerfil.php";
                }else{
                    if(obj['rol']==false){
                        document.getElementById("imgAvatar").style.display = 'inline';
                        document.getElementById("logOut").style.display = 'inline';
                        document.getElementById("ventUser").style.display = 'none';
                        document.getElementById("cursoUser").style.display = 'none';
                        document.getElementById("imgAvatar").src = "php/laFotoDePerfil.php";
                    }
                }
                
            })
    }
});