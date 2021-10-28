

    function editarDatos() {
        var nombre = document.getElementById("nombre").value;
        var apellidos = document.getElementById("apellidos").value;
        var correo = document.getElementById("email").value;
        var contra = document.getElementById("contra").value;
        var foto = "not yet";
        var opc = 4;
    
        let Body = { nombre, apellidos,correo,contra,foto, opc }
        let jsonBody = JSON.stringify(Body)
        fetch('php/usuario.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {
                var Jason = data;
                console.log(Jason);
                if (Jason == "CambiosHechos") {
                    alert("Los datos se modificaron correctamente");
                    window.location.href = "Perfil.html";
                }
                else
                    alert(Jason.result)
            })
    }


