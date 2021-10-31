$(document).ready(function () {
   /* function ocultarVerCurso() {
        var opc = 3;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        fetch('../php/usuario.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.text();
            })
            .then(data => {
                var Jason = data;
                var obj = JSON.parse( Jason);
                  
                if(obj['esMaestro']==true){
                    document.getElementById("imgAvatarUsuario").style.display = 'inline';
                    document.getElementById("cerrarSes").style.display = 'inline';
                    document.getElementById("imgAvatarUsuario").src = "../php/profilePicture.php";
                    document.getElementById("iniciaSes").style.display = 'none';  
                    document.getElementById("navHistorial").style.display = 'none';
                    document.getElementById("datosForAlumno").style.display = 'none';
                    
                }else{
                    if(obj['esMaestro']==false){
                        document.getElementById("imgAvatarUsuario").style.display = 'inline';
                        document.getElementById("cerrarSes").style.display = 'inline';
                        document.getElementById("imgAvatarUsuario").src = "../php/profilePicture.php";
                        document.getElementById("iniciaSes").style.display = 'none';  
                        document.getElementById("navVentas").style.display = 'none';
                        //aqui se manda a llamar la confirmacion de si tiene el curso
                        cursoComprado();
                    }else{
                        document.getElementById("comprarCurso").style.display = 'inline';
                        document.getElementById("califCurso").style.display = 'none';
                        document.getElementById("nivelesCurso").style.display = 'none';
                        document.getElementById("progresoCur").style.display = 'none';
                    }
                }
                mostrarUnCurso();       
            })
    }
    ocultarVerCurso();
    function mostrarUnCurso() {
        debugger;
        var _postID = getQueryVariable("id");
        var opc = 2;
        let Body = { opc, _postID}
        console.log(_postID);
        let jsonBody = JSON.stringify(Body)
        fetch('../php/cursos.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {
                debugger;
               var obj = data;
               document.getElementById("titulo").innerHTML = obj['nombre'];
               document.getElementById("titulo2").innerHTML = obj['profeCurso'];
               document.getElementById("titulo3").innerHTML = obj['categorias'];
               document.getElementById("verdaderaDescripcion").innerHTML = obj['descripcion'];
               document.getElementById("costoCantlvls").innerHTML = "Costo del curso: $"+obj['costo']+"<br> Cantidad de niveles: "+obj['cantidadNiveles'];
               document.getElementById("videoCursoAct").src = obj['trailerCurso'];
               costo = obj['costo'];
               if(obj['Media'] != null){
                document.getElementById("Media").innerHTML = "Media del curso: " + obj['Media'];
               }
               else{
               document.getElementById("Media").innerHTML = "Este curso no ha sido calificado";
               }

                mostrarNiveles();
            })
    }*/

    
});