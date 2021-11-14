$(document).ready(function () {
    var nombre;
    var curso;
    var Alumno;
    var Fecha;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    }
    obtenerDatos();
    function obtenerDatos(){
        var idCurso = getQueryVariable("id");
        var opc = 9;
        let Body = { idCurso, opc  }
        let jsonBody = JSON.stringify(Body);
        fetch('php/cursos.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
        .then(response => {
             return response.json();
        })
        .then(data => {
            var Jason =data;
            console.log(Jason);
            document.getElementById("io").innerHTML = Jason["nombreAlumno"];
            nombre = Jason["nombreAlumno"];
            document.getElementById("NomCurso").innerHTML = Jason["nombre"];
            curso = Jason["nombre"];
            document.getElementById("Sensei").innerHTML = Jason["nombreProfesor"];
            Alumno= Jason["nombreProfesor"];
            document.getElementById("iFecha").innerHTML = today;
            Fecha= today;
            document.datos.IDC1.value = Jason["nombreAlumno"];
            document.datos.IDC2.value =  Jason["nombre"];

        })
    }



})
