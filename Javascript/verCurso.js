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
    $("#btnDiploma").on("click", "#btnDip", function () {
        var idCurso = getQueryVariable("id");
        CursoTerm(idCurso);
    });
    $("#btnComentario").on("click", "#btn", function () {
        debugger;
        escribirComentario();
    });

    $("#califCurso").on("click", ".C", function () {
        calificarCurso(1);
    });
    $("#califCurso").on("click", ".C1", function () {
        calificarCurso(2);
    });
    $("#califCurso").on("click", ".C2", function () {
        calificarCurso(3);
    });
    $("#califCurso").on("click", ".C3", function () {
        calificarCurso(4);
    });
    $("#califCurso").on("click", ".C4", function () {
        calificarCurso(5);
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
               document.getElementById("Compra").style.display = 'none';
               document.getElementById("btnDiploma").style.display = 'none';
               document.getElementById("dip").style.display = 'none';
               document.getElementById("califCurso").disabled=true;
                
            }else{
                if(obj['rol']==false){
                    document.getElementById("imgAvatar").style.display = 'inline';
                    document.getElementById("logOut").style.display = 'inline';
                    document.getElementById("imgAvatar").src = "php/laFotoDePerfil.php";
                    document.getElementById("categUser").style.display = 'none';  
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
             //  if(obj['Media'] != null){
             //   document.getElementById("Media").innerHTML = "Media del curso: " + obj['Media'];
             //  }
             //  else{
             //  document.getElementById("Media").innerHTML = "Este curso no ha sido calificado";
             //  }

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
               /* document.getElementById("califCurso").style.display = 'none';*/
                //document.getElementById("progresoCur").style.display = 'none';
                document.getElementById("btnDiploma").style.display = 'none';
                document.getElementById("dip").style.display = 'none';
                document.getElementById("califCurso").disabled=true;
                document.getElementById("califCurso").style.display = 'none';
                
            }else{
                if(Jason['terminado']!=""){
                    document.getElementById("Compra").style.display = 'none';
                    document.getElementById("listaNiveles").style.display = 'inline';
                    document.getElementById("abrir").style.display = 'none';
                    document.getElementById("btn").disabled=false;
                    document.getElementById("btnDiploma").style.display = 'none';
                    document.getElementById("dip").style.display = 'none';
                    document.getElementById("califCurso").disabled=true;
                    
                    if(Jason['terminado']==true){
                       // document.getElementById("califCurso").style.display = 'inline';
                        document.getElementById("btnDiploma").style.display = 'inline';
                        
                    }else{
                        if(Jason['terminado']==false){
                            document.getElementById("btnDiploma").style.display = 'none';
                            //document.getElementById("califCurso").style.display = 'none';
                        }
                    }
                }
            }
        })
    }

    verLosComentarios();
    function verLosComentarios(){
        
        var idCurso = getQueryVariable("id");
        var opc=2;
        let Body = { idCurso,opc }
            
        let jsonBody = JSON.stringify(Body);

        fetch('php/elComentario.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
        .then(response => {
            return response.json();
        })
        .then(data => {
            
            var Jason =data;
            console.log(Jason);
            debugger;
            $("#comentariosEchos").empty();
            var comentariosEchos = document.getElementById("comentariosEchos");
            if(data=="NoHayComentarios"){
                alert("no hay comentarios disponibles");
            }else{
                for (var i in Jason){
                    var div1 =document.createElement('div');
                    div1.setAttribute("class","media");
                    var img1 = document.createElement("img");
                    img1.setAttribute("src","Javascript/fotosDeComentarios.php?id="+Jason[i]["idUser"]);
                    img1.setAttribute("class","ImagenPerfil");
                    img1.setAttribute("alt","...");
                    var div2 =document.createElement('div');
                    div2.setAttribute("class","media-body");
                    
                    var h5 = document.createElement("h5");
                    h5.setAttribute("class","Comentario");
                    h5.innerHTML =Jason[i]["nombre"];
    
                    var p1 = document.createElement("p");
                    p1.setAttribute("class","text-com");
                    p1.innerHTML =Jason[i]["contenido"];
    
                    div2.appendChild(h5);
                    div2.appendChild(p1);
                    div1.appendChild(img1);
                    div1.appendChild(div2);
                   
                    comentariosEchos.appendChild(div1);
                }
            }  
 
        })
       
    }

    function escribirComentario(){
        var comentario = document.getElementById("ComentarioID").value;
        var idCurso = getQueryVariable("id");
        var opc=1;
        $('#ComentarioID').val('');

        if(comentario != ""){
            let Body = { comentario,idCurso,opc }
            
            let jsonBody = JSON.stringify(Body);
    
            fetch('php/elComentario.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
            .then(response => {
                return response.json();
            })
            .then(data => {
                
                var Jason =data;
                console.log(Jason);
                debugger;
                    
                $("#comentariosEchos").empty();
                var comentariosEchos = document.getElementById("comentariosEchos");
                if(data=="NoHayComentarios"){
                    alert("no hay comentarios disponibles");
                }else{
                    for (var i in Jason){
                        var div1 =document.createElement('div');
                        div1.setAttribute("class","media");
                        var img1 = document.createElement("img");
                        img1.setAttribute("src","Javascript/fotosDeComentarios.php?id="+Jason[i]["idUser"]);
                        img1.setAttribute("class","ImagenPerfil");
                        img1.setAttribute("alt","...");
                        var div2 =document.createElement('div');
                        div2.setAttribute("class","media-body");
                        
                        var h5 = document.createElement("h5");
                        h5.setAttribute("class","Comentario");
                        h5.innerHTML =Jason[i]["nombre"];
        
                        var p1 = document.createElement("p");
                        p1.setAttribute("class","text-com");
                        p1.innerHTML =Jason[i]["contenido"];
        
                        div2.appendChild(h5);
                        div2.appendChild(p1);
                        div1.appendChild(img1);
                        div1.appendChild(div2);
                       
                        comentariosEchos.appendChild(div1);
                    }
                }  
     
            })
        }
       else{
        window.alert("Escriba algo antes de comentar")
       }

    }

    function nivelEsp(idNivel) {
        window.location.href = "Nivel.html?id="+idNivel;
    }
    function CursoTerm(idNivel) {
        window.location.href = "certificado.html?id="+idNivel;
    }

    function calificarCurso(numero){
        var idCurso = getQueryVariable("id");
        var opc=12;
        var cal = numero;
        let Body = { idCurso,opc,cal }
        let jsonBody = JSON.stringify(Body);
    
        fetch('php/cursos.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
        .then(response => {
             return response.text();
        })
        .then(data => {
            var Jason =data;
            console.log(Jason);
            if(Jason==="success"){
                alert("Curso caliicado con éxito");
                ocultarVerCurso();
            }
            else{
    
                alert(Jason.result)
            }
        })
        
    }
   
    
});