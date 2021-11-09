$(document).ready(function () {
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
    ocultarVerNav();
    function ocultarVerNav(){
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
                    document.getElementById("showCategs").style.display = 'none';
                   // document.getElementById("datosForAlumno").style.display = 'none';
                    
                }else{
                    if(obj['rol']==false){
                            document.getElementById("imgAvatar").style.display = 'inline';
                            document.getElementById("logOut").style.display = 'inline';
                             document.getElementById("imgAvatar").src = "php/laFotoDePerfil.php";
                            document.getElementById("categUser").style.display = 'none';
                        //document.getElementById("iniciaSes").style.display = 'none';  
                            document.getElementById("ventUser").style.display = 'none';
                           // document.getElementById("nivelLista").style.display = 'none';
                             //document.getElementById("nivelListas").style.display = 'none';
                             document.getElementById("misCursos").style.display = 'none';
                            document.getElementById("cursoUser").style.display = 'none';
                            document.getElementById("showCategs").style.display = 'none';
                        
                    }
                }
                      
            })
    }
    mostrarUnNivel();
    function mostrarUnNivel() {
        var idNivel = getQueryVariable("id");
        var opc = 2;
        let Body = { opc, idNivel}
        console.log(idNivel);
        let jsonBody = JSON.stringify(Body)
        fetch('php/niveles.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {
               var obj = data;
               
               document.getElementById("videoNivel").src = obj['trailerNivel'];
              document.getElementById("imgCurso").src ="Javascript/fotosDelCursoP.php?id='"+obj['idCurso']+"'";
               
               $("#nomNivel").append("<div class='num_nivel'>"+obj['nomNivel']+"<div class='vid_nivel'><button id='btnDescargar' class='btnArchivo'>Descargar archivo</button> </div></div>");
 
            })
    }

});