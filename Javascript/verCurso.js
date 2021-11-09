$(document).ready(function () {
    var costo = 0.0;
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
    $("#nivelesDeCurso").on("click", ".btnVerClase", function () {
        nivelEsp(this.id);
    });
    $("#opciones").on("click", "#btnTarjeta", function () {
        comprarCurso();
    });
    
function ocultarVerCursos(){
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
            if(obj['rol']==true){
                document.getElementById("imgAvatar").style.display = 'inline';
                document.getElementById("logOut").style.display = 'inline';
                document.getElementById("imgAvatar").src = "php/laFotoDePerfil.php";
                //document.getElementById("iniciaSes").style.display = 'none';  
                document.getElementById("histUser").style.display = 'none';
               // document.getElementById("datosForAlumno").style.display = 'none';
                
            }else{
                if(obj['rol']==false){
                    document.getElementById("imgAvatar").style.display = 'inline';
                    document.getElementById("logOut").style.display = 'inline';
                    document.getElementById("imgAvatar").src = "php/laFotoDePerfil.php";
                    document.getElementById("categUser").style.display = 'none';
                    //document.getElementById("iniciaSes").style.display = 'none';  
                    document.getElementById("ventUser").style.display = 'none';
                    document.getElementById("nivelLista").style.display = 'none';
                    document.getElementById("listaNiveles").style.display = 'none';
                     document.getElementById("misCursos").style.display = 'none';
                        document.getElementById("cursoUser").style.display = 'none';
                    //aqui se manda a llamar la confirmacion de si tiene el curso
                   cursoComprado();
                }else{
                  document.getElementById("Compra").style.display = 'inline';
                  document.getElementById("Promedio").style.display = 'none';
                  document.getElementById("nivelesCurso").style.display = 'none';
                  document.getElementById("progresoCur").style.display = 'none';
                }
            }
            mostrarUnCurso();       
        })
}
    ocultarVerCursos();
    function mostrarUnCurso() {
        debugger;
        var _postID = getQueryVariable("id");
        var opc = 2;
        let Body = { opc, _postID}
        console.log(_postID);
        let jsonBody = JSON.stringify(Body)
        fetch('php/cursos.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {
                debugger;
               var obj = data;
               document.getElementById("CursoID").innerHTML = obj['nombre'];
               document.getElementById("nombreC").innerHTML = obj['profesor'];
               document.getElementById("cateC").innerHTML = obj['categorias'];
               document.getElementById("descC").innerHTML = obj['descripcion'];
               document.getElementById("costoC").innerHTML = "Costo del curso: $"+obj['costo']+"<br> Cantidad de niveles: "+obj['cantidadNiveles'];
               document.getElementById("videoTrailer").src = obj['trailerCurso'];
               costo = obj['costo'];
               if(obj['Media'] != null){
                document.getElementById("Media").innerHTML = "Media del curso: " + obj['Media'];
               }
               else{
               document.getElementById("Media").innerHTML = "Este curso no ha sido calificado";
               }

                mostrarNiveles();
            })
    }

    function mostrarNiveles() {
        var idCurso = getQueryVariable("id");
        var opc = 1;
        let Body = { opc, idCurso}
        console.log(idCurso);
        let jsonBody = JSON.stringify(Body)
        fetch('php/niveles.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {
               var Jason = data;
               console.log(Jason);
               //var obj = JSON.parse(Jason);
                for (var i in Jason) {
                    $("#nivelesDeCurso").append("<li><h3 id="+Jason[i]['idNivel']+" >"+" </p><a id="+Jason[i]['idNivel']+" class='btnVerClase'>"+Jason[i]['nomNivel']+"</a> </div></li>");
                }
               //id_niveles, nombreNvl , videoLvl, numeroNivel, otrosArchivo
               
            })
    }

    function comprarCurso(){
        var idCurso = getQueryVariable("id")
        var opc=6;
        let Body = { idCurso,opc }
        let jsonBody = JSON.stringify(Body);
    
        fetch('php/cursos.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
        .then(response => {
             return response.text();
        })
        .then(data => {
            var Jason =data;
            console.log(Jason);
            if(Jason==="success"){
                alert("Curso comprado con éxito");
                document.getElementById("btnCompras").style.display = 'none';
                document.getElementById("listaNiveles").style.display = 'inline';
                //document.getElementById("btnComentar").disabled=false; boton de comentario
            }
            else{
    
                alert(Jason.result)
            }
        })  
    }

    function cursoComprado(){
        var idCurso = getQueryVariable("id")
        var opc=7;
        let Body = { idCurso,opc }
        let jsonBody = JSON.stringify(Body);
    
        fetch('php/cursos.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
        .then(response => {
             return response.json();
        })
        .then(data => {
            var Jason =data;
            console.log(Jason);
            
            if(Jason=="CursoNoReg"){
                document.getElementById("Compra").style.display = 'inline';
                document.getElementById("listaNiveles").style.display = 'none';
                //document.getElementById("califCurso").style.display = 'none';
                document.getElementById("progresoCur").style.display = 'none';
                document.getElementById("abrir").style.display = 'none';
                
            }else{
                if(Jason['terminado']!=""){
                    document.getElementById("Compra").style.display = 'none';
                    document.getElementById("listaNiveles").style.display = 'inline';
                    document.getElementById("abrir").style.display = 'none';
                    document.getElementById("btn").disabled=false;
                    if(Jason['terminado']==true){
                        document.getElementById("califCurso").style.display = 'inline';
                        document.getElementById("abrir").style.display = 'inline';
                    }else{
                        if(Jason['terminado']==false){
                            //document.getElementById("btnDiploma").style.display = 'none';
                            //document.getElementById("califCurso").style.display = 'none';
                        }
                    }
                }
            }
        })
    }

    function nivelEsp(idNivel) {
        window.location.href = "Nivel.html?id="+idNivel;
    }
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