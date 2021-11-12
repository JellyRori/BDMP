$( document ).ready(function() {
    navUsuario();
    MostrarDestacados();
    buscar();
    $("body").on("click", "#btnBuscar", function () {
        buscar();
    });
    $(".tabla").on("click", ".titCursos", function () {
        cursoEsp(this.id);
        debugger;
    });
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
                        document.getElementById("categUser").style.display = 'none';
                        document.getElementById("misCursos").style.display = 'none';
                        document.getElementById("cursoUser").style.display = 'none';
                        document.getElementById("imgAvatar").src = "php/laFotoDePerfil.php";
                    }
                }
                
            })
    }
    function buscar(){
        var buscando = document.getElementById("buscar").value;
        var opc = 8;

        let Body = { opc ,buscando}
        let jsonBody = JSON.stringify(Body)
        console.log(jsonBody);
        fetch('php/cursos.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {

                var Jason = data;
                console.log(Jason);
        
                   
                      $("#cursosAgregados").empty();
                    var listacompleta = document.getElementById("cursosAgregados");
                  for (var i in Jason) {

                     var th1 =document.createElement('th');
                      th1.setAttribute("id","cursos");
                      var div1 =document.createElement('div');
                      div1.setAttribute("class","cursos");
                      var imgagen = document.createElement("img");
                      imgagen .setAttribute("src","Javascript/fotosDelCursoP.php?id="+Jason[i]['idCurso']);
                      imgagen .setAttribute("alt","fotoCurso");
                      imgagen .setAttribute("class","IMG");
                      var saltoDeLinea = document.createElement("br");
                      var etiqueta = document.createElement("a");
                      etiqueta.setAttribute("class","titCursos");
                      etiqueta.setAttribute("href","Curso.html?id="+Jason[i]['idCurso']);//aqui pones la direccion html donde lo colocas
                      etiqueta.setAttribute("onclick","Curso.html");
                      etiqueta.innerHTML =Jason[i]["nomCurso"];
                      var saltoDeLinea2 = document.createElement("br");
                      var parrafo = document.createElement("p");
                      parrafo.setAttribute("class","niveles");
                      parrafo.innerHTML ="Lvls:"+ Jason[i]["cantNivel"];
                      div1.appendChild(imgagen );
                      div1.appendChild(saltoDeLinea);
                      div1.appendChild(etiqueta);
                      div1.appendChild(saltoDeLinea2);
                      div1.appendChild(parrafo);
                      th1.appendChild(div1);
                      listacompleta.appendChild(th1);
                      
                    }
              
                
            })
    }

    function MostrarDestacados() {
        var opc = 13;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        console.log(jsonBody);
        fetch('php/cursos.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
        .then(response => {
            return response.json();
        })
        .then(data => {
            var Jason = data;
            console.log(data);
            
            if(data=="NoHayCursos"){
                $("#hayCursos").append("<p>No hay cursos destacados</p>");
            }else{
                for (var i in Jason) { 
                    $("#Destacados").append("<th id='cursos'><div class='cursos'><img class='IMG' src='Javascript/fotosDelCursoP.php?id="+Jason[i]['idCurso']+"' alt='fotoCurso'><p id="+Jason[i]['idCurso']+" class='titCursos' >"+Jason[i]['nomCurso']+"</p><p class='niveles'>Lvls: "+Jason[i]['cantNivel']+"</p></div></th>");
 
                }
            }
        })
          
    }
    function cursoEsp(_postID) {
        window.location.href = "Curso.html?id="+_postID;
    }
});